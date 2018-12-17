import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Question from 'question/question';
import Results from 'results/results';

class Test extends PureComponent {
  state = {
    isLoading: true,
    testData: [],
    current: 0,
    answers: [],
    showResult: false,
    isCheckingAnswer: false
  };

  static propTypes = {
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { match } = this.props;
    axios.get(`/api/v1/tests/${match.params.id}`)
      .then((response) => {
        this.setState({ isLoading: false, testData: response.data.data });
      });
  }

  nextQuestion = () => {
    const { current, testData } = this.state;
    if (current < testData.length - 1) {
      this.setState({ current: current + 1 });
    } else {
      this.setState({ showResult: true });
    }
  };

  checkAnswer = (answer) => {
    const { testData, current } = this.state;
    const { id } = testData[current];
    this.setState({ isCheckingAnswer: true });
    axios.post('/api/v1/tests/check', {
      id, answer
    }).then((response) => {
      this.setState(prevState => ({
        answers: [...prevState.answers, response.data.data],
        isCheckingAnswer: false
      }));
      this.nextQuestion();
    });
  };

  render() {
    const {
      isLoading,
      testData,
      current,
      showResult,
      answers,
      isCheckingAnswer
    } = this.state;
    const { match } = this.props;
    return (
      <div className="questions">
        { !isLoading
          && !showResult
          && (
            <Question
              questionData={testData[current]}
              checkAnswer={this.checkAnswer}
              isCheckingAnswer={isCheckingAnswer}
            />
          )
        }
        { !isLoading
          && showResult
          && (
            <Results answers={answers} collectionId={match.params.id} />
          )
        }
      </div>
    );
  }
}

export default Test;
