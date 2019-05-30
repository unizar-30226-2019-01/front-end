import React, { Component } from 'react';
import logo from '../images/logo.png';
import '../css/App.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Route, Switch, Redirect } from 'react-router-dom';
import {infoUsuarioTemporal, register} from '../GestionUsuarios';
import PropTypes from 'prop-types';
import { tokenUrl, instanceLocator, key } from './config';
import Chatkit from '@pusher/chatkit-client';
import Navbar from 'react-bootstrap/Navbar';

class RegisterDefinitive extends Component{
  constructor(props) {
    super(props);
      this.state = {
        login: this.getParameterByName('login', window.location.href)
      }
  }

  getParameterByName(name, url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  confirmar(){
    infoUsuarioTemporal(this.state.login).then(data => {
      const newUser = {
        login: data[0],
        password: data[5],
        nombre: data[1],
        apellidos: data[2],
        telefono: data[7],
        email: data[3],
        foto: data[4]
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
    })
    this.setState({ redirect: true });
  }

  render() {

    if (this.state.redirect){
			console.log(this.state.respuestaBD)
      if(this.state.respuestaBD=="Error"){
				window.alert("El login o el correo que intenta introducir ya existen. Pruebe con otro")
				this.setState({redirect: false,
					respuestaBD: undefined});
			}
			else if(this.state.respuestaBD != undefined) {
				return <Redirect push to="/" />;
			}
    }

    return (
      <div>
        <div>
          <Navbar collapseOnSelect expand="md"  variant="light" bg="light" fixed="top">
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
          </Navbar>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="text-center">
          <Button variant="primary" size="lg" onClick={() => this.confirmar()}>
            Pulse para confirmar su cuenta
          </Button>
        </div>
      </div>
    );
  }
}

export default RegisterDefinitive;
