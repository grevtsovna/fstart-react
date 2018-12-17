import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  textField: {
    width: '100%'
  },
  paper: {
    padding: 15
  },
  leftIcon: {
    marginRight: 15
  },
  preloader: {
    marginLeft: 10
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center'
  }
});

class AddCollection extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    addCollection: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  name = createRef();

  submitHandle = (evt) => {
    const { addCollection } = this.props;
    evt.preventDefault();
    addCollection(this.name.current.value);
  };

  render() {
    const { classes, isLoading } = this.props;
    return (
      <form onSubmit={this.submitHandle}>
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={9}>
              <TextField
                className={classes.textField}
                label="Название словаря"
                required
                inputRef={this.name}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                <AddIcon className={classes.leftIcon} />
                Добавить
                { isLoading && <CircularProgress size={20} className={classes.preloader} /> }
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    );
  }
}

export default withStyles(styles)(AddCollection);
