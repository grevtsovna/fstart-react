import React from 'react';
import PropTypes from 'prop-types';

function Task({ task, toggleTask }) {
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

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool
  }).isRequired,
  toggleTask: PropTypes.func.isRequired
};

export default Task;
