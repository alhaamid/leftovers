import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Menu from './components/Menu/Menu';
import PostListing from './components/PostListing/PostListing';
import SearchListing from './components/SearchListing/SearchListing';

import './App.css';

function App() {
  return (
    <div>
      <Menu></Menu>

      <BrowserRouter>
        <Switch>
          <Route
              exact
              path='/'
              component={SearchListing}
          />
          <Route
              exact
              path='/post'
              component={PostListing}
          />
          <Route
              exact
              path='/search'
              component={SearchListing}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
