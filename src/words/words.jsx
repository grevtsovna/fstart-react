import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddWord from 'add-word/add-word';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import StartIcon from '@material-ui/icons/PlayCircleOutline';
import Word from 'word/word';
import Typography from '@material-ui/core/es/Typography/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const styles = () => ({
  root: {
    maxWidth: 900,
    margin: '50px auto 0'
  },
  translation: {
    margin: '15px 0 0'
  },
  preloader: {
    margin: '50px auto 0'
  },
  startIcon: {
    marginRight: 10
  },
  aside: {
    padding: 15
  },
  buttons: {
    width: '100%',
    marginBottom: 10
  }
});

class Words extends PureComponent {
  state = {
    isLoading: true,
    words: [],
    addingWordStatus: false
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { match } = this.props;
    axios.get(`/api/v1/collections/${match.params.id}`)
      .then((response) => {
        this.setState({ isLoading: false, words: response.data.data.words });
      });
  }

  addWord = (word) => {
    const { match } = this.props;
    this.setState({ addingWordStatus: true });
    axios.post('/api/v1/words', word)
      .then(response => axios.patch(`/api/v1/collections/${match.params.id}/words`, {
        word: response.data.data.id
      }))
      .then((response) => {
        this.setState({ words: response.data.data, addingWordStatus: false });
      });
  };

  removeWord = (wordId) => {
    const { match } = this.props;
    axios.delete(`/api/v1/words/${wordId}`, { data: { collectionId: match.params.id } })
      .then((response) => {
        this.setState(prevState => ({
          words: [...prevState.words.filter(word => word.id !== response.data.deletedWordId)]
        }));
      });
  };

  render() {
    const {
      isLoading,
      words,
      addingWordStatus
    } = this.state;
    const { classes, match } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          { isLoading && (
            <Grid item container xs={12} alignItems="center">
              <CircularProgress className={classes.preloader} />
            </Grid>
          )}
          <Grid container item spacing={24} xs={9}>
            { words.map(word => (
              <Grid item xs={4} key={word.id}>
                <Word word={word} removeWord={this.removeWord} />
              </Grid>
            )) }
            <Grid item xs={12}>
              {!isLoading && <AddWord addWord={this.addWord} isLoading={addingWordStatus} />}
            </Grid>
          </Grid>
          { !isLoading && (
            <Grid item xs={3}>
              <Paper className={classes.aside}>
                <Tooltip
                  title="Для запуска теста необходимо как минимум 5 слов в словаре"
                  placement="top"
                  disableHoverListener={words.length >= 5}
                >
                  <div>
                    <Button
                      variant="contained"
                      component={Link}
                      color="primary"
                      to={`${match.url}/test`}
                      disabled={words.length < 5}
                      className={classes.buttons}
                    >
                      <StartIcon className={classes.startIcon} />
                      Тестирование
                    </Button>
                  </div>
                </Tooltip>
                <Button
                  variant="contained"
                  component={Link}
                  to="/"
                  className={classes.buttons}
                >
                  Cписок словарей
                </Button>
                <Typography variant="caption">
                  Количество слов в словаре: {words.length}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Words);
