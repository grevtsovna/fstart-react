import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AddWord from 'add-word/add-word';

class Words extends PureComponent {
  state = {
    isLoading: true,
    words: []
  };

  static propTypes = {

  };

  addWord() {

  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    console.log(this.props);
    return (
      <div className="words">
        {!isLoading && <AddWord />}
      </div>
    );
  }
}

export default Words;
