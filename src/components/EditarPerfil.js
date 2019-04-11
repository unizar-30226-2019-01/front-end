import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import jwt_decode from 'jwt-decode'
import ReactDOM from 'react-dom';
import Perfil from './Perfil';
import Form from 'react-bootstrap/Form';
import { actualizarInfo } from '../GestionUsuarios';
import { Route, Switch, Redirect } from 'react-router-dom';

class EditarPerfil extends Component {
  constructor() {
    super()
    this.state = {
      login: '',
      nombre: '',
      apellidos: '',
      email: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      login: decoded.identity.login,
      nombre: decoded.identity.nombre,
      apellidos: decoded.identity.apellidos,
      email: decoded.identity.email
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const user = {
      login: this.state.login,
      nombre: this.state.nombre,
      apellidos: this.state.apellidos,
      email: this.state.email
    }
    actualizarInfo(user)
    this.setState({redirect: true});
  }

  volverMenu(e) {
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect){
      return <Redirect push to="/" />;
    }
    return (
      <div className="Perfil">
      <div className="row">
      <div className = "col"> </div>
        <div className="col-6">
        <Form noValidate onSubmit={this.onSubmit}>
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">EDITAR PERFIL</h1>
            <br/>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
            <tr>
                <td>Login</td>

                <td> 
                	<Form.Group controlId="login">
				      <Form.Control 
				        name="login"
				        value={this.state.login}
                  		onChange={this.onChange}
				      />
				    </Form.Group>
				</td>
              </tr>
              <tr>
                <td>Nombre</td>
                <td>				    
                	<Form.Group controlId="nombre">
				      <Form.Control 
				      	name="nombre"
				      	value={this.state.nombre}
                	    onChange={this.onChange}
				      />
				    </Form.Group>
				</td>
              </tr>
              <tr>
                <td>Apellidos</td>
                <td>				    
                	<Form.Group controlId="apellidos">
				      <Form.Control 
				        name="apellidos"
				        value={this.state.apellidos}
                  		onChange={this.onChange}
				      />
				    </Form.Group>
				</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>				  
                	<Form.Group controlId="email">
				    <Form.Control 
				    	type="email" 
				    	name="email"
				    	value={this.state.email}
               		    onChange={this.onChange}
				    	 />
				  </Form.Group>
				</td>
        </tr>
            </tbody>
          </table>
          <div className="text-center">
          <Button 
				  	type="submit"
            className="btn btn-primary mr-sm-2 ml-sm-2">
				    Guardar cambios
				  </Button>
          <Button 
            className="btn btn-danger mr-sm-2"
            href="/perfil">
				    Volver
				  </Button>
          </div>
        </div>
        </Form>
        </div>
      <div className = "col"> </div>
      </div>
      </div>
    )
  }
}

export default EditarPerfil