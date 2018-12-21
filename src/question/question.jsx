import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Answer from 'answer/answer';

const styles = () => ({
  question: {
    maxWidth: 900,
    margin: '50px auto'
  },
  questionCard: {
    padding: 50
  },
  caption: {
    marginBottom: 15
  }
});

class Question extends PureComponent {
  static propTypes = {
    questionData: PropTypes.object.isRequired,
    checkAnswer: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    isCheckingAnswer: PropTypes.object.isRequired
  };

  checkHandler = (answer) => {
    const { checkAnswer } = this.props;
    checkAnswer(answer);
  };

  render() {
    const { questionData, classes, isCheckingAnswer } = this.props;
    return (
      <div className={classes.question}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h6" className={classes.caption}>Выберите правильный вариант перевода:</Typography>
            <Paper className={classes.questionCard}>
              <Typography variant="h3" align="center">{ questionData.de }</Typography>
            </Paper>
          </Grid>
          <Grid item container xs={12} spacing={24}>
            { questionData.answers.map(answer => (
              <Answer
                key={answer}
                answer={answer}
                checkHandler={this.checkHandler}
                isLoading={isCheckingAnswer}
              />
            )) }
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Question);
