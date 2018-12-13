import React, { PureComponent, createRef } from 'react';
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
    classes: PropTypes.object.isRequired,
    addWord: PropTypes.func.isRequired
  };

  ru = createRef();

  de = createRef();

  submitHandle = (evt) => {
    const { addWord } = this.props;
    evt.preventDefault();
    addWord({ ru: this.ru.current.value, de: this.de.current.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className="add-word" onSubmit={this.submitHandle}>
        <TextField
          className={classes.textField}
          label="RU"
          required
          inputRef={this.ru}
        />
        <TextField
          className={classes.textField}
          label="DE"
          required
          inputRef={this.de}
        />
        <Button type="submit">Добавить</Button>
      </form>
    );
  }
}

export default withStyles(styles)(AddWord);
