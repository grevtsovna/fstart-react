import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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

class Collection extends PureComponent {
  state = {

  };

  static propTypes = {
    collection: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    changeName: PropTypes.func.isRequired
  };

  render() {
    const { collection, classes, changeName } = this.props;
    return (
      <TextField
        id={collection.id}
        label="Название словаря"
        className={classes.textField}
        value={collection.name}
        onBlur={changeName}
        onClick={(evt) => { evt.preventDefault(); }}
      />
    );
  }
}

export default withStyles(styles)(Collection);
