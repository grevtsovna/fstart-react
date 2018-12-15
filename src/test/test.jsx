import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Question from 'question/question';

class Test extends PureComponent {
  state = {
    isLoading: true,
    testData: [],
    current: 0,
    answers: []
  };

  static propTypes = {
    match: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { match } = this.props;
    axios.get(`/api/v1/tests/${match.params.id}`)
      .then((response) => {
        this.setState({isLoading: false, testData: response.data.data});
      });
  }

  nextQuestion = () => {
    const { current, testData } = this.state;
    if (current < testData.length - 1) {
      this.setState({ current: current + 1 });
    }
  };

  clickNextHandle = (evt) => {
    evt.preventDefault();
    this.nextQuestion();
  };

  changeHandle = (evt) => {
    this.setState({value: evt.target.value});
  };

  render() {
    const { isLoading, testData, current } = this.state;
    return (
      <div className="questions">
        { console.log(current) }
        { !isLoading && <Question questionData={testData[current]} /> }
        <button onClick={this.clickNextHandle}>Next</button>
        <input type="text" onChange={this.changeHandle} value={this.props.value} />
        <div>{this.state.value}</div>
      </div>
    );
  }
}

export default Test;
