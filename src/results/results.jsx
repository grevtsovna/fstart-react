import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Results extends PureComponent {
  state = {};

  static propTypes = {
    answers: PropTypes.array.isRequired
  };

  render() {
    const { answers } = this.props;
    return (
      <div className="results">
        Вы ответили правильно на
        { answers.filter(answer => answer).length }
        из
        { answers.length }
        вопросов
      </div>
    );
  }
}

export default Results;
