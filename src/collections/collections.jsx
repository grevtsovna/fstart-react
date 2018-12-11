import React, { PureComponent } from 'react';

class Collections extends PureComponent {
  state = {
    collections: []
  };

  render() {
    const { collections } = this.state;
    return (
      <div className="collections">{collections}</div>
    );
  }
}

export default Collections;
