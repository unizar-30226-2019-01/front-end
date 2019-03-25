import React, { Component } from 'react';
import logo from './logo.png';


class Navbar extends Component {

  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <img src={logo}  alt="" width="50" height="60"></img>
        <a className="navbar-brand" href=".">  Baitu</a>

        <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-primary my-2 my-sm-0" id="pepe" type="submit">Search</button>
        </form>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          </ul>

        </div>
        <button className="btn btn-outline-primary mr-sm-2" href="#">Registrarse</button>
        <button className="btn btn-outline-primary" href="#">Iniciar sesión</button>

        
      </nav>
    )
  }
}

export default Navbar
