// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './App';
import NavLog from './components/NavLog';
import NavLogReg from './components/NavLogReg';
import Registro from './components/Registro';
import Perfil from './components/Perfil';
import EditarPerfil from './components/EditarPerfil';
import SubirProducto from './components/SubirProducto';

const AppRoutes = () =>
  <div>
    <NavLogReg />
    <Switch>
      <Route exact path="/registro" component={Registro} />
      <Route exact path="/subirProducto" component={SubirProducto} />
      <Route exact path="/perfil" component={Perfil} />
      <Route exact path="/editarPerfil" component={EditarPerfil} />
      <Route exact path="/" component={App} />
    </Switch>
  </div>;

export default AppRoutes;
