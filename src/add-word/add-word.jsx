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
  addForm: {
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

class AddWord extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    addWord: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  ru = createRef();

  de = createRef();

  componentDidUpdate() {
    const { isLoading } = this.props;
    if (!isLoading) {
      this.ru.current.value = '';
      this.de.current.value = '';
    }
  }

  submitHandle = (evt) => {
    const { addWord } = this.props;
    evt.preventDefault();
    addWord({ ru: this.ru.current.value, de: this.de.current.value });
  };

  render() {
    const { classes, isLoading } = this.props;
    return (
      <form className={classes.addForm} onSubmit={this.submitHandle}>
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                label="Слово"
                required
                inputRef={this.ru}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                label="Перевод"
                required
                inputRef={this.de}
              />
            </Grid>
            <Grid className={classes.buttonWrapper} item xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isLoading}
              >
                <AddIcon className={classes.leftIcon} />
                Добавить
              </Button>
              { isLoading && <CircularProgress size={20} className={classes.preloader} /> }
            </Grid>
          </Grid>
        </Paper>
      </form>
    );
  }
}

export default withStyles(styles)(AddWord);
