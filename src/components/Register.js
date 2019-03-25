import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Register extends Component {


  render(){
    return (
    <div>
      <h1>
      ¡ Regístrate !
      </h1>
      <br />
      <div className="row">
        <div className = "col"> </div>
        <div className="col-8">
        <Form noValidate onSubmit={this.onSubmit}>
          <Row>
            <Col>
            <Form.Group controlId="nombre">
              <Form.Control 
                placeholder="Nombre"
                name="nombre"
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="apellidos">
              <Form.Control 
                placeholder="Apellidos" 
                name="apellidos"
              />
            </Form.Group>
            </Col>
          </Row>
          
          <Form.Group controlId="login">
              <Form.Control 
                placeholder="Usuario" 
                name="login"
              />
            </Form.Group>

          <Form.Group controlId="email">
            <Form.Control 
              type="email" 
              placeholder="Email"
              name="email"
               />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control 
              type="password" 
              placeholder="Contraseña"
              name="password" />
          </Form.Group>

          <Button 
            type="submit"
            className="btn btn-lg btn-primary btn-block">
            Registrarte
          </Button>
        </Form>
        </div>
        <div className = "col"></div>
      </div>
    </div>
    );
  }
}

export default Register;