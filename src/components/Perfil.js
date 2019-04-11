import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import { Route, Switch, Link } from 'react-router-dom';
//import EditarPerfil from './EditarPerfil';
import { deleteUser } from '../GestionUsuarios';

class Perfil extends Component {
  constructor() {
    super()
    this.state = {
      login: '',
      nombre: '',
      apellidos: '',
      email: ''
    }
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

  onDelete = e => {
    e.preventDefault()

    const user = {
      login: this.state.login
    }

   deleteUser(user)
  }

  cerrarSesion = e => {
    e.preventDefault()

  }

  render() {
    return (
      <div className="Perfil">
      <div className="row">
      <div className = "col"> </div>
        <div className="col-6">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PERFIL</h1>
            <br/>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
            <tr>
                <td>Login</td>
                <td>{this.state.login}</td>
              </tr>
              <tr>
                <td>Nombre</td>
                <td>{this.state.nombre}</td>
              </tr>
              <tr>
                <td>Apellidos</td>
                <td>{this.state.apellidos}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
          <div className="text-center">
          <Link to="/editarPerfil">
            <button className="btn btn-primary mr-sm-2 ml-sm-2">
                Editar perfil
            </button>
          </Link>
            <button className="btn btn-danger mr-sm-2"
                onClick={this.cerrarSesion.bind(this)}>
                Cerrar Sesión
            </button>
            <button className="btn btn-danger ml-sm-2"
                onClick={this.onDelete.bind(this)}>
                Eliminar
            </button>
          </div>
        </div>
        </div>
      <div className = "col"> </div>
      </div>
      </div>
    )
  }
}

export default Perfil