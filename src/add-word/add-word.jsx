import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class AddWord extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;
    return (
      <form className="add-word">
        <TextField
          className={classes.textField}
          label="RU"
          required
        />
        <TextField
          className={classes.textField}
          label="DE"
          required
        />
        <Button type="submit">Добавить</Button>
      </form>
    );
  }
}

export default withStyles(styles)(AddWord);
