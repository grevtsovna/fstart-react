import React from 'react';
import Task from 'task/task';

const tasks = [
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
];

function Tasks() {
  return (
    <div className="tasks">
      {tasks.map(data => (
        <Task data={data} key={data.id} />
      ))}
    </div>
  );
}

export default Tasks;
