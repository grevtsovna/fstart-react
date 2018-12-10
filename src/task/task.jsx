import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class Task extends PureComponent {
  render() {
    const { task, toggleTask, classes } = this.props;

    return (
      <ListItem
        key={task.id}
        button
        onClick={toggleTask}
        data-id={task.id}
        className={classes.root}
      >
        <Checkbox
          checked={task.isCompleted}
        />
        <ListItemText primary={task.text} />
      </ListItem>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool
  }).isRequired,
  toggleTask: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Task);
