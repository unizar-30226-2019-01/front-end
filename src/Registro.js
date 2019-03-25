import React, { Component } from 'react';
import NavLog from './components/NavLog';
import Register from './components/Register';

class Registro extends Component {

  render() {
    return (
      <div className="App">
        <NavLog />
        <div className="row">
			<div className="col"> </div>
			<div className="col-8">
				<Register />
			</div>
			<div className="col"> </div>
       </div>
      </div>
    );
  }
}

export default Registro;