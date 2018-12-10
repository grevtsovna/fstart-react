import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Tasks from 'tasks/tasks';
import About from 'about/about';
import Appbar from 'header/header';

function Root() {
  return (
    <BrowserRouter>
      <div>
        <Appbar />
        <Route exact path="/" component={Tasks} />
        <Route path="/about" component={About} />
      </div>
    </BrowserRouter>
  );
}

export default Root;
