import React, { Component } from 'react';
import Task from 'task/task';

class Tasks extends Component {
  state = {
    tasks: [
      {
        id: '1',
        text: 'React',
        isCompleted: false
      },
      {
        id: '2',
        text: 'Инициализация',
        isCompleted: true
      },
      {
        id: '3',
        text: 'Создание компонентов',
        isCompleted: true
      },
      {
        id: '4',
        text: 'Props',
        isCompleted: false
      },
      {
        id: '5',
        text: 'Context',
        isCompleted: true
      },
      {
        id: '6',
        text: 'Lifecycle',
        isCompleted: false
      },
      {
        id: '7',
        text: 'React Router',
        isCompleted: false
      }
    ]
  };

  toggleTask = (evt) => {
    const { id } = evt.currentTarget.dataset;

    this.setState(state => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
      })
    }));
  };

  render() {
    const { tasks } = this.state;

    return (
      <div className="tasks">
        {tasks.map(task => (
          <Task
            task={task}
            toggleTask={this.toggleTask}
            key={task.id}
          />
        ))}
      </div>
    );
  }
}

export default Tasks;
