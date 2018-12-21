import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Question from 'question/question';
import Results from 'results/results';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    maxWidth: 900,
    margin: '50px auto'
  }
});

class Test extends PureComponent {
  state = {
    isLoading: true,
    testData: [],
    current: 0,
    answers: [],
    showResult: false,
    isCheckingAnswer: {
      status: false,
      answer: null
    }
  };

  static propTypes = {
    match: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
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
    this.setState({ isCheckingAnswer: { status: true, answer } });
    axios.post('/api/v1/tests/check', {
      id, answer
    }).then((response) => {
      this.setState(prevState => ({
        answers: [...prevState.answers, response.data.data],
        isCheckingAnswer: {
          status: false,
          answer: null
        }
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
    const { match, classes } = this.props;
    return (
      <div className="questions">
        { !isLoading
          && !showResult
          && (
            <div className={classes.root}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography variant="caption">Вопрос {current + 1} из {testData.length}</Typography>
                </Grid>
              </Grid>
              <Question
                questionData={testData[current]}
                checkAnswer={this.checkAnswer}
                isCheckingAnswer={isCheckingAnswer}
              />
            </div>
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

export default withStyles(styles)(Test);
