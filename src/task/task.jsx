import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Task extends PureComponent {
  render() {
    const { task, toggleTask } = this.props;

    return (
      <div
        className={`task ${task.isCompleted ? 'task__completed' : ''}`}
        onClick={toggleTask}
        data-id={task.id}
      >
        {task.text}
      </div>
    );
  }
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool
  }).isRequired,
  toggleTask: PropTypes.func.isRequired
};

export default Task;
