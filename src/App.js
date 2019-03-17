import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Productos from './components/Productos';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Sidebar/>

        <header className="App-header">
  			<Productos/>
        </header>



      </div>
    );
  }
}

export default App;
