import React, { Component } from 'react';
import './css/App.css';
import NavLog from './components/NavLog';
import NavLogReg from './components/NavLogReg';
import Sidebar from './components/Sidebar';
import Productos from './components/Productos';
import { Link } from 'react-router-dom';


import PropTypes from 'prop-types';

class App extends Component {

  //componentWillUnmount
  //componentDidMount

  componentWillUnmount() {
    localStorage.clear();
  }

  render() {
    return (
      <div className="App">
        <Sidebar/>
        <div className="App-header">
          <Productos/>
        </div>
      </div>

    );
  }
}

export default App;
