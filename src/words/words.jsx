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

const styles = () => ({
  root: {
    maxWidth: 600,
    margin: '50px auto 0'
  },
  card: {
    margin: '0 0 24px'
  },
  translation: {
    margin: '15px 0 0'
  },
  preloader: {
    margin: '50px auto 0'
  }
});

class Words extends PureComponent {
  state = {
    isLoading: true,
    words: []
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { match } = this.props;
    axios.get(`/api/v1/collections/${match.params.id}`)
      .then((response) => {
        console.log(response);
        this.setState({ isLoading: false, words: response.data.data.words });
      });
  }

  addWord = (word) => {
    const { match } = this.props;
    axios.post('/api/v1/words', word)
      .then(response => axios.patch(`/api/v1/collections/${match.params.id}/words`, {
        word: response.data.data.id
      }))
      .then((response) => {
        this.setState({ words: response.data.data });
      });
  };

  render() {
    const { isLoading, words } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          { isLoading && <CircularProgress className={classes.preloader} /> }
          { console.log(this.state) }
          { words.map((word) => {
            return (
              <Grid item xs={4}>
                <Card className={classes.card}>
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
            );
          }) }
        </Grid>
        {!isLoading && <AddWord addWord={this.addWord} />}
      </div>
    );
  }
}

export default withStyles(styles)(Words);
