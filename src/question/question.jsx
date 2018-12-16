import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Question extends PureComponent {
  static propTypes = {
    questionData: PropTypes.object.isRequired,
    checkAnswer: PropTypes.func.isRequired
  };

  clickHandler = (evt) => {
    const { checkAnswer } = this.props;
    checkAnswer(evt.target.dataset.value);
  };

  render() {
    const { questionData } = this.props;
    return (
      <div className="question">
        <h2>{ questionData.de }</h2>
        { questionData.answers.map((answer, key) => (
          <button key={key} onClick={this.clickHandler} data-value={answer}>{ answer }</button>
        )) }
      </div>
    );
  }
}

export default Question;
