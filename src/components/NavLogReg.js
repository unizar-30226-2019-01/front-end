import React, { Component } from 'react';
import logo from '../images/logo.png';
import icono from '../images/icono.png'
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Registro from './Registro';
import ReactDOM from 'react-dom';
import { Route, Switch, Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

class NavLogReg extends Component {

  constructor() {
    super()
    this.state = {
      login: '',
      nombre: '',
      apellidos: '',
      email: ''
    }
  }
/*
  componentDidMount () {
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
      console.log("no existe")
    }
    else{
      console.log("existe")
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      console.log(decoded.identity.login)
      this.setState({
        login: decoded.identity.login
      })
    }
  }
*/
  render() {
    return (
      <div className="Navbar">
      <Navbar collapseOnSelect expand="md" bg="light" variant="light" fixed="top">
          <Navbar.Brand href="/">
           <h2>
            <img
              alt=""
              src={logo}
              width="50"
              height="40"
              className="d-inline-block align-top"
            />
            Baitu
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Navbar.Collapse className="justify-content-end">
              <br />
              <br />
            <br />
            <Button className=" mr-md-4" href="/subirProducto" variant="success">Subir producto</Button>
            <Link to="/perfil">
               <img src={icono} width="70" height="70"></img>
               
            </Link>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
      <br /> <br /> <br />
      </div>
    );
  }
}

export default NavLogReg
