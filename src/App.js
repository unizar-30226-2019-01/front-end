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
      redirect:false,
      mostrar:0
    }
  }

  ordenacion(index){
    this.setState({mostrar: index});
  }

  render() {
    return (
      <div className="App">
        <Sidebar callback={this.ordenacion.bind(this)}/>
        <div className="App-header">
          <Productos mostrar={this.state.mostrar}/>
        </div>
      </div>
    );
  }
}

export default App;
