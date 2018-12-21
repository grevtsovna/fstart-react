import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  button: {
    width: '100%'
  },
  progressColorPrimary: {
    color: '#ffffff'
  },
  progress: {
    marginLeft: 15
  }
});

class Answer extends PureComponent {
  static propTypes = {
    answer: PropTypes.string.isRequired,
    checkHandler: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    isLoading: PropTypes.object.isRequired
  };

  clickHandler = () => {
    const { checkHandler, answer } = this.props;
    checkHandler(answer);
  };

  render() {
    const { answer, classes, isLoading } = this.props;
    return (
      <Grid item xs={6}>
        <Button
          className={classes.button}
          size="large"
          color="primary"
          variant="contained"
          disabled={isLoading.status}
          onClick={this.clickHandler}
        >
          { answer }
          { isLoading.status
            && isLoading.answer === answer
            && (
              <CircularProgress
                className={classes.progress}
                classes={{ colorPrimary: classes.progressColorPrimary }}
                size={15}
              />
            )
          }
        </Button>
      </Grid>
    );
  }
}

export default withStyles(styles)(Answer);
