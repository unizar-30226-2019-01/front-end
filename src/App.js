import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Productos from './components/Productos';
import Prueba from './components/Prueba';
import { Link } from 'react-router-dom';


import PropTypes from 'prop-types';

class App extends Component {
  static propTypes = {
    // children: PropTypes.object.isRequired
  };
  render() {
    // const { children }  = this.props;
    return (
      <div className="App">
        <Navbar/>
        <Sidebar/>
        <div className="App-header">
          <Productos/>
        </div>
      </div>

    );
  }
}

export default App;
