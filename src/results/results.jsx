import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = () => ({
  root: {
    maxWidth: 900,
    margin: '50px auto 0'
  },
  result: {
    padding: 50
  },
  icon: {
    display: 'block',
    width: 100,
    height: 100,
    color: '#28a745',
    margin: '0 auto',
    border: '5px solid #28a745',
    borderRadius: '50%'
  },
  text: {
    margin: '50px 0 0'
  }
});

class Results extends PureComponent {
  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    classes: PropTypes.object.isRequired,
    collectionId: PropTypes.string.isRequired
  };

  render() {
    const { answers, classes, collectionId } = this.props;
    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.result}>
            <DoneIcon className={classes.icon} />
            <Typography align="center" className={classes.text}>
              Вы ответили правильно на&nbsp;
              { answers.filter(answer => answer).length }
              &nbsp;из&nbsp;
              { answers.length }
              &nbsp;вопросов
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Button component={Link} to={`/collections/${collectionId}`} variant="contained">Назад</Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Results);
