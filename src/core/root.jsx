import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Collections from 'collections/collections';
import Words from 'words/words';
import Test from 'test/test';

function Root() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Collections} />
        <Route exact path="/collections/:id" component={Words} />
        <Route path="/collections/:id/test" component={Test} />
      </div>
    </BrowserRouter>
  );
}

export default Root;
