import React, { PureComponent } from 'react';
import Collection from 'collection/collection';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import AddCollection from 'add-collection/add-collection';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

class Collections extends PureComponent {
  state = {
    isLoading: true,
    collections: [],
    isAddingCollection: false
  };

  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    axios.get('/api/v1/collections')
      .then((response) => {
        if (response.status === 200) {
          this.setState({ isLoading: false, collections: response.data.data });
        }
      });
  }

  changeName = (evt) => {
    console.log(evt.currentTarget.value);
  };

  addCollection = (name) => {
    this.setState({ isAddingCollection: true });
    axios.post('/api/v1/collections', { name })
      .then((response) => {
        this.setState(prevState => ({
          collections: [...prevState.collections, response.data.data],
          isAddingCollection: false
        }));
      });
  };

  render() {
    const { classes } = this.props;
    const { collections, isLoading, isAddingCollection } = this.state;
    return (
      <div className="collections">
        <div className={classes.root}>
          <Grid container spacing={24}>
            { isLoading && <CircularProgress className="collections__preloader" />}
            {collections.map(collection => (
              <Grid item xs={12} key={collection.id}>
                <Link to={`/collections/${collection.id}`}>
                  <Paper className={classes.paper}>
                    <Collection
                      collection={collection}
                      changeName={this.changeName}
                    />
                  </Paper>
                </Link>
              </Grid>
            ))}
            <Grid item xs={12}>
              { !isLoading && (
                <AddCollection isLoading={isAddingCollection} addCollection={this.addCollection} />
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Collections);
