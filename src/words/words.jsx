import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddWord from 'add-word/add-word';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import StartIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = () => ({
  root: {
    maxWidth: 900,
    margin: '50px auto 0'
  },
  card: {
    position: 'relative',
    margin: '0 0 24px'
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
  icon: {
    position: 'absolute',
    right: 10,
    top: 10
  }
});

class Words extends PureComponent {
  state = {
    isLoading: true,
    words: [],
    addingWordStatus: false,
    anchorEl: null
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

  moreBtnClickHandler = (evt) => {
    this.setState({ anchorEl: evt.currentTarget });
  };

  closeHandler = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      isLoading,
      words,
      addingWordStatus,
      anchorEl
    } = this.state;
    const { classes, match } = this.props;
    const open = Boolean(anchorEl);
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
              <Grid item xs={4}>
                <Card className={classes.card}>
                  <IconButton
                    onClick={this.moreBtnClickHandler}
                    className={classes.icon}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.closeHandler}
                  >
                    <MenuItem onClick={this.handleClose}>Удалить</MenuItem>
                  </Menu>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      { word.de }
                    </Typography>
                    <Typography component="p" className={classes.translation}>
                      { word.ru }
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )) }
            <Grid item xs={12}>
              {!isLoading && <AddWord addWord={this.addWord} isLoading={addingWordStatus} />}
            </Grid>
          </Grid>
          { !isLoading && (
            <Grid item xs={3}>
              <Paper className={classes.aside}>
                <Button variant="contained" component={Link} color="primary" to={`${match.url}/test`}>
                  <StartIcon className={classes.startIcon} />
                  Тестирование
                </Button>
              </Paper>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Words);
