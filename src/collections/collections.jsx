import React, { PureComponent } from 'react';
import Collection from 'collection/collection';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import AddCollection from 'add-collection/add-collection';

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

class Collections extends PureComponent {
  state = {
    isLoading: true,
    collections: [],
    isAddingCollection: false,
    isChangingName: {
      status: false,
      id: null
    }
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

  changeName = id => (evt) => {
    const name = evt.currentTarget.value;
    this.setState({ isChangingName: { status: true, id } });
    axios.patch(`api/v1/collections/${id}/name`, { name })
      .then(() => { this.setState({ isChangingName: { status: false, id: null } }); });
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

  removeCollection = (id) => {
    axios.delete(`/api/v1/collections/${id}`)
      .then((response) => {
        const { data } = response.data;
        this.setState(prevState => ({
          collections: prevState.collections.filter(collection => data.id !== collection.id)
        }));
      });
  };

  render() {
    const { classes } = this.props;
    const {
      collections,
      isLoading,
      isAddingCollection,
      isChangingName
    } = this.state;
    return (
      <div className="collections">
        <div className={classes.root}>
          <Grid container spacing={24}>
            { isLoading && <CircularProgress className="collections__preloader" />}
            {collections.map(collection => (
              <Collection
                key={collection.id}
                collection={collection}
                changeName={this.changeName}
                removeCollection={this.removeCollection}
                isLoading={isChangingName}
              />
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
