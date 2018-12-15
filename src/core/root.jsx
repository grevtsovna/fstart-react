import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Tasks from 'tasks/tasks';
import About from 'about/about';
import Appbar from 'header/header';
import Collections from 'collections/collections';
import Words from 'words/words';
import Test from 'test/test';

function Root() {
  return (
    <BrowserRouter>
      <div>
        <Appbar />
        <Route exact path="/" component={Tasks} />
        <Route path="/about" component={About} />
        <Route exact path="/collections" component={Collections} />
        <Route exact path="/collections/:id" component={Words} />
        <Route path="/collections/:id/test" component={Test} />
      </div>
    </BrowserRouter>
  );
}

export default Root;
