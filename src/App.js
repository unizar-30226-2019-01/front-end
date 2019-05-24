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

  //componentWillUnmount
  //componentDidMount

  componentDidMount() {
    //localStorage.clear();
    console.log("ELIMINO TOKENS")
  }

  constructor(props) {
    super(props);
    this.state = {
      mostrar:0,
      precio:0,
      categoria:"",
      lugar:""
    }
    this.ordenacion = this.ordenacion.bind(this);
    this.maximoPrecio = this.maximoPrecio.bind(this);
    this.categoriaSelec = this.categoriaSelec.bind(this);
    this.lugar = this.lugar.bind(this);
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

  lugar(prov){
    this.setState({lugar:prov})
  }

  render() {
    let barra;
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
      console.log("no existe")
      barra = <NavLog/>
    }
    else{
      console.log("existe")
      barra = <NavLogReg/>

    }
    return (
      <div className="App">
        {barra}
        <Sidebar callback={this.ordenacion.bind(this)} callback2={this.maximoPrecio.bind(this)} callback3={this.categoriaSelec.bind(this)} callback4={this.lugar.bind(this)} />
        <div className="App-header">
          <Productos mostrar={this.state.mostrar} precio={this.state.precio} categoria={this.state.categoria} lugar={this.state.lugar}/>
        </div>
      </div>
    );
  }
}

export default App;
