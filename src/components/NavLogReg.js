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

class NavLog extends Component {

  render() {
    return (
      <Navbar collapseOnSelect expand="md" bg="light" variant="light" sticky="top" fixed="top">
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
          <Navbar.Collapse className="justify-content-front ">
                <Form inline>
                  <FormControl type="text" placeholder="Buscar" className="mr-sm-2" />
                  <br />
                  <br />
                  <Button variant="primary"className="mx-auto">Buscar</Button>
                </Form>
                <br />
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">

              <br />
              <br />
            <br />
            <Button className=" mr-md-4" variant="success">Subir producto</Button>
            <Link to="/perfil">
               <img src={icono} width="70" height="70"></img>
            </Link>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavLog
