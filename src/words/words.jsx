import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AddWord from 'add-word/add-word';
import axios from 'axios';

class Words extends PureComponent {
  state = {
    isLoading: true,
    words: []
  };

  static propTypes = {

  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  addWord = (word) => {
    axios.post('/api/v1/words', word)
      .then((response) => {
        this.setState(prevState => ({
          words: [...prevState.words, response.data.data]
        }));
      });
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="words">
        {!isLoading && <AddWord addWord={this.addWord} />}
      </div>
    );
  }
}

export default Words;
