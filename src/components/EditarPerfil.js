import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import jwt_decode from 'jwt-decode'
import ReactDOM from 'react-dom';
import Perfil from './Perfil';
import Form from 'react-bootstrap/Form';
import NavLogReg from './NavLogReg';
import { actualizarInfo, infoUsuario } from '../GestionUsuarios';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as firebase from 'firebase'

class EditarPerfil extends Component {
  constructor() {
    super()
    this.state = {
      login: '',
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      datos: [],
      foto: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    infoUsuario(decoded.identity.login).then(data => {
      this.setState({
        datos: data,
        nombre: data[1],
        apellidos: data[2],
        telefono: data[7]
      },
      () => {
          console.log("devuelvo")
      })
    })
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const user = {
      login: this.state.datos[0],
      nombre: this.state.datos[1],
      apellidos: this.state.datos[2],
      email: this.state.datos[3],
      telefono: this.state.datos[7],
      foto: this.state.foto
    }
    actualizarInfo(user)
    this.setState({redirect: true});
  }

  handleOnChange (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`fotos/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
            uploadValue: percentage
        })
      }, (error) => {
        // Si ha ocurrido un error aquí lo tratamos
        console.error(error.message)
    }, () => {
        console.log(task.snapshot.ref.getDownloadURL())
        task.snapshot.ref.getDownloadURL()
        .then((url) => {
          this.setState({foto: url});
        });
      })
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
      <NavLogReg/>
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
                <td>Foto de perfil</td>

                <td> 
                	<Form.Group controlId="foto">
                  <img src={this.state.datos[4]} alt=""/>
                            <div class="file btn btn-lg btn-primary">
                                Cambiar Photo
                                <input type='file' onChange={this.handleOnChange.bind(this)}/>
                            </div>
				    </Form.Group>
				</td>
              </tr>
            <tr>
                <td>Login</td>

                <td> 
                	<Form.Group controlId="login">
				      <Form.Control 
				        name="login"
				        value={this.state.datos[0]}
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
				    	value={this.state.datos[3]}
               		    onChange={this.onChange}
				    	 />
            	</Form.Group>
				</td>
        </tr>   
        <tr>
                <td>Teléfono</td>
                <td>
        <Form.Group controlId="telefono">
            <Form.Control 
				    	type="number" 
				    	name="telefono"
				    	value={this.state.telefono}
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