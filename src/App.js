import React, { Component } from 'react';
import './css/App.css';
import NavLog from './components/NavLog';
import NavLogReg from './components/NavLogReg';
import Sidebar from './components/Sidebar';
import Productos from './components/Productos';
import { Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';


import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrar:0,
      precio:0,
      categoria:""
    }
    this.ordenacion = this.ordenacion.bind(this);
    this.maximoPrecio = this.maximoPrecio.bind(this);
    this.categoriaSelec = this.categoriaSelec.bind(this);
  }

  ordenacion(index){
    this.setState({mostrar:index});
  }

  maximoPrecio(numero){
    this.setState({precio:numero});
  }

  categoriaSelec(c){
    this.setState({categoria:c});
  }


  render() {
    return (
      <div className="App">
        <Sidebar callback={this.ordenacion.bind(this)} callback2={this.maximoPrecio.bind(this)} callback3={this.categoriaSelec.bind(this)} />
        <div className="App-header">
          <Productos mostrar={this.state.mostrar} precio={this.state.precio} categoria={this.state.categoria}/>
        </div>
      </div>
    );
  }
}

export default App;
