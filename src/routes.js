// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './App';
import NavLog from './components/NavLog';
import NavLogReg from './components/NavLogReg';
import Registro from './components/Registro';
import SubirProducto from './components/SubirProducto';

const AppRoutes = () =>
  <div>
    <Switch>
      <Route exact path="/" component={NavLog} />
      <Route exact path="/NavLogReg" component={NavLogReg} />
    </Switch>
    <Switch>
      <Route exact path="/registro" component={Registro} />
      <Route exact path="/subirProducto" component={SubirProducto} />
      <Route exact path="/" component={App} />
    </Switch>
  </div>;

export default AppRoutes;
