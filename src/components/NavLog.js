import React, { Component } from 'react';
import logo from '../images/logo.png';
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
                 <Button
                      href="/registro"
                      className=" mr-sm-4" variant="success">Registrarse</Button>
              <br />
              <br />
              <Form inline onSubmit={this.onSubmit}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl className=" mr-sm-2"
                  placeholder="Usuario"
                  name="login"
                  aria-label="Usuario"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">?</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl className=" mr-sm-2"
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  aria-label="Contraseña"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <br />
              <br />
              <Button type="submit" className="mx-auto"> Entrar
              </Button>
            </Form>
            <br />
            <Button className=" ml-sm-4" href="/subirProducto" variant="success">Subir producto</Button>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavLog
