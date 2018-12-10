import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Tasks from 'tasks/tasks';
import About from 'about/about';

function Root() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/">tasks</Link>
        <Link to="/about">about</Link>
        <Route exact path="/" component={Tasks} />
        <Route path="/about" component={About} />
      </div>
    </BrowserRouter>
  );
}

export default Root;
