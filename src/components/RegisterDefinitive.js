import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Route, Switch, Redirect } from 'react-router-dom';
import {infoUsuarioTemporal, register} from '../GestionUsuarios';
import PropTypes from 'prop-types';
import { tokenUrl, instanceLocator, key } from './config'
import Chatkit from '@pusher/chatkit-client'

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
				window.alert("Error en el login, Intente de nuevo")
				this.setState({redirect: false,
					respuestaBD: undefined});
			}
			else if(this.state.respuestaBD != undefined) {
        window.alert("Un correo ha sido envíado a su email. Confirme la cuenta por favor")
				return <Redirect push to="/" />;
			}
    }

    return (
      <Button className="mr-sm-4" variant="outline-warning" onClick={() => this.confirmar()}>
         Pulse para confirmar su cuenta
      </Button>
    );
  }
}

export default RegisterDefinitive;
