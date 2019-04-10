import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { register } from '../GestionUsuarios';


class Register extends Component {

  constructor() {
    super()
    this.state = {
      login: '',
      password: '',
      nombre: '',
      apellidos: '',
      email: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      login: this.state.login,
      password: this.state.password,
      nombre: this.state.nombre,
      apellidos: this.state.apellidos,
      telefono: this.state.telefono,
      email: this.state.email
    }
    register(newUser).then(res => {
      if (!res.error) {
        console.log("registrado")
        //ReactDOM.render(<Actividades usuario={this.state.login}/>, document.getElementById('root'));
      }
      else{
        //ReactDOM.render(<App />, document.getElementById('root'));
      }
    })
  }



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
                value={this.state.nombre}
                onChange={this.onChange}
              />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="apellidos">
              <Form.Control
                placeholder="Apellidos"
                name="apellidos"
                value={this.state.apellidos}
                onChange={this.onChange}
              />
            </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="login">
              <Form.Control
                placeholder="Usuario"
                name="login"
                value={this.state.login}
                onChange={this.onChange}
              />
            </Form.Group>

          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
               />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
              value={this.state.password}
              onChange={this.onChange} 
              />
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
