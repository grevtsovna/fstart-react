import React, { PureComponent } from 'react';
import Collection from 'collection/collection';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

class Collections extends PureComponent {
  state = {
    isLoading: true,
    collections: []
  };

  componentDidMount() {
    axios.get('/api/v1/collections')
      .then((response) => {
        if (response.status === 200) {
          this.setState({ isLoading: false, collections: response.data.data });
        }
      });
  }

  render() {
    const { collections, isLoading } = this.state;
    return (
      <div className="collections">
        { isLoading && <CircularProgress />}
        {collections.map(collection => (
          <Collection
            key={collection.id}
            collection={collection}
          />
        ))}
      </div>
    );
  }
}

export default Collections;
