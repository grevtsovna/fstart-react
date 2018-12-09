import React from 'react';
import PropTypes from 'prop-types';

function Task({ data }) {
  return (
    <div className={`task ${data.isCompleted ? 'task__completed' : ''}`}>{data.text}</div>
  );
}

Task.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool
  }).isRequired
};

export default Task;
