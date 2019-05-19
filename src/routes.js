// Dependencies
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './App';
import NavLog from './components/NavLog';
import NavLogReg from './components/NavLogReg';
import Registro from './components/Registro';
import Perfil from './components/Perfil';
import EditarPerfil from './components/EditarPerfil';
import SubirProducto from './components/SubirProducto';
import EditarProducto from './components/EditarProducto';
import Favoritos from './components/Favoritos';


const AppRoutes = () =>
  <div>
    <Switch>
      <Route exact path="/registro" component={Registro} />
      <Route exact path="/subirProducto" component={SubirProducto} />
      <Route exact path="/EditarProducto" component={EditarProducto} />
      <Route exact path="/perfil" component={Perfil} />
      <Route exact path="/editarPerfil" component={EditarPerfil} />
      <Route exact path="/favoritos" component={Favoritos} />
      <Route exact path="/" component={App} />
    </Switch>
  </div>;

export default AppRoutes;
