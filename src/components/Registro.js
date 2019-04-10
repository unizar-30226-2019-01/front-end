import React, { Component } from 'react';
import NavLog from './NavLog';
import Register from './Register';

class Registro extends Component {

  render() {
    return (
      <div className="App">
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
