// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './App';

const AppRoutes = () =>
  <App>
    <Switch>
      <Route exact path="/" component={App} />

    </Switch>
  </App>;

export default AppRoutes;
