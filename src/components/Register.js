import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { register } from '../GestionUsuarios';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as firebase from 'firebase'
import Chatkit from '@pusher/chatkit-client'
import { tokenUrl, instanceLocator, key } from './config'

class Register extends Component {

  constructor() {
    super()
    this.state = {
      login: '',
      password: '',
      nombre: '',
      apellidos: '',
      email: '',
      foto: '',
      telefono: '',

      validated: false //Para la prevencion de errores
    }
    // Se especifica que las funciones de este fichero pertenecen al componente, sino dara error
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.handleSubmit.bind(this)
  }

  onChange(e) {
    //Indica que el campo que se actualiza con el valor obtenido del input
    this.setState({ [e.target.name]: e.target.value }) 
  }
  handleSubmit(event) { //Cada vez que se envie el formulario
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      window.alert("Imagen obligatoria")
      event.preventDefault(); //Evita refrescar la pantalla (si hay entradas no validas)
      event.stopPropagation();
    }
    else{
      event.preventDefault()

      const newUser = {
        login: this.state.login,
        password: this.state.password,
        nombre: this.state.nombre,
        apellidos: this.state.apellidos,
        telefono: this.state.telefono,
        email: this.state.email,
        foto: this.state.foto
      }
      register(newUser).then(res => {
				this.setState({
					respuestaBD: res
				})
        //Si el usuario ha sido registrado correctamente lo añadimos a los usuarios del CHAT
        if (this.state.respuestaBD != "Error"){
        const ChatkitS = require('@pusher/chatkit-server');

        //Servidor
        const chatkit = new ChatkitS.default({
          instanceLocator: instanceLocator,
          key: key,
        })

        //Obtenemos el usuario, si no existe lo crea
        chatkit.getUser({
          id: this.state.login,
        })
          .then(user => console.log('Usuario encontrado: ', user))
          .catch(chatkit.createUser({
              id: this.state.login,
              name: this.state.nombre,
            })
              .then(() => {
                console.log('Usuario creado correctamente');
              }).catch((err) => {
                console.log(err);
              }))
        }
			})
			this.setState({ redirect: true });
    }
    this.setState({ validated: true });
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
          this.setState({picture: url, foto: url});
        });
      })
}


  render(){

    const { validated } = this.state;

    if (this.state.redirect){
			console.log(this.state.respuestaBD)
      if(this.state.respuestaBD=="Error"){
				window.alert("Error en el login, Intente de nuevo")
				this.setState({redirect: false,
					respuestaBD: undefined});
			}
			else if(this.state.respuestaBD != undefined) {
				return <Redirect push to="/" />;
			}
    }

    return (
    <div>
    <br />
      <h1>
      ¡ Regístrate !
      </h1>
      <br />
      <div className="row">
        <div className = "col"> </div>
        <div className="col-8">
        <Form noValidate validated={validated}
                    onSubmit={e => this.handleSubmit(e)}>
          <Row>
            <Col>
            <Form.Group controlId="nombre">
              <Form.Control
                required
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
                required
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
                required
                placeholder="Usuario"
                name="login"
                value={this.state.login}
                onChange={this.onChange}
              />
            </Form.Group>

          <Form.Group controlId="email">
            <Form.Control
              required
              type="email"
              placeholder="Email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
               />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              required
              type="password"
              placeholder="Contraseña"
              name="password"
              value={this.state.password}
              onChange={this.onChange} 
              />
          </Form.Group>
          <Form.Group controlId="telefono">
            <Form.Control
              required
              type="number"
              placeholder="Teléfono"
              name="telefono"
              value={this.state.telefono}
              onChange={this.onChange} 
              />
          </Form.Group>
          <div>
              <progress value={this.state.uploadValue} max='100'></progress>
              <br />
              <input required name="foto" type='file' onChange={this.handleOnChange.bind(this)}/>
              <br />
              <img width='90' src={this.state.picture} />
            </div>

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
