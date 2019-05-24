import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import { Route, Switch, Link } from 'react-router-dom';
//import EditarPerfil from './EditarPerfil';
import '../css/perfil.css';
import bichardo from '../images/bichardo.jpg';
import { deleteUser, infoUsuario } from '../GestionUsuarios';
import { getEnVentaUsuario, getVentasAcabadas, getSubastasEnCurso, getSubastasAcabadas } from '../GestionPublicaciones';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import VistaProductoPerfil from './VistaProductoPerfil';
import NavLogReg from './NavLogReg';

import { listarOfertas, infoVenta, aceptarOferta, eliminarOferta, eliminarTodasOferta } from '../GestionPublicaciones';
import { eliminarSubasta } from '../GestionPublicaciones';

import {Redirect } from 'react-router-dom';
import * as firebase from 'firebase'

class Perfil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      ofertas: [],
      datos: [],
      fotos: '',
      id: props.location.prod.id
    }
  }

  componentDidMount() {

    listarOfertas(this.state.id).then(data => {
        this.setState({
            ofertas: data
        },
        () => {
            console.log("devuelvo")
        })
      })
    infoVenta(this.state.id).then(data => {
    this.setState({
            datos: data,
            fotos: data[4]
        })
    })


  }

  aceptarOferta(user){
    aceptarOferta(user,this.state.id,)
    eliminarTodasOferta(this.state.id)
    this.setState({
        ofertas: []
    })
    var aviso = document.createElement('div');
    aviso.setAttribute('id', 'aviso');
    aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: green;border-radius: 8px;font-family: sans-serif;';
    aviso.innerHTML = 'Producto vendido';
    document.body.appendChild(aviso);
    document.load = setTimeout('document.body.removeChild(aviso)', 2000);
  }

  rechazarOferta(index,user){
    eliminarOferta(user,this.state.id)
    this.setState({
        ofertas: this.state.ofertas.filter((elemento, i)=>{
            return  i!==index
            /*esto lo q hace es recorrer el vector productos,
              y lo modifica eliminando todo aquel que NO cumpla
              la condicion. en este caso, cuando encuentre la posicion
              del elemento index, lo eliminara*/
        })
      });
  }




  render() {

    if (this.state.redirect){
      return <Redirect push to="/" />;
    }
    return (
        <div className="Perfil">
        <NavLogReg/>
        <div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src={this.state.fotos} alt=""/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                        <label>Producto: </label>
                                    <h1>
                                        {this.state.datos[1]}
                                    </h1>
                                    <h4>
                                        {this.state.datos[2]}
                                    </h4>
                                    <br/>
                                    <br/>
                                <table border="0" cellspacing="0" cellpadding="0">
                                <thead>
                                    <tr>
                                        <th class="text-left">Ofertas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.ofertas.map((oferta, index) => {
                                    return (
                                <tr>
                            <td class="text-left"><h3>{oferta[1]}</h3>Precio: {oferta[0]}€ </td>
                            <br/><br/>
                            <td><Button variant="primary"  onClick={() => this.aceptarOferta(oferta[1])}>
                                        Aceptar
                                    </Button></td>
                            <td><Button variant="danger"  onClick={() => this.rechazarOferta(index,oferta[1])}>
                                        Cancelar
                                    </Button></td>
                        </tr>
                        )
                             })}
                                </tbody>
                                </table>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>

    )
  }
}

export default Perfil
