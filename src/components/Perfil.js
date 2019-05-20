import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import { Route, Switch, Link } from 'react-router-dom';
//import EditarPerfil from './EditarPerfil';
import '../css/perfil.css';
import bichardo from '../images/bichardo.jpg';
import { deleteUser, infoUsuario } from '../GestionUsuarios';
import { getEnVentaUsuario, getVentasAcabadas, getSubastasEnCurso, getSubastasAcabadas } from '../GestionPublicaciones';
import Button from 'react-bootstrap/Button';
import VistaProductoPerfil from './VistaProductoPerfil';
import NavLogReg from './NavLogReg';

import { eliminarProducto } from '../GestionPublicaciones';
import { eliminarSubasta } from '../GestionPublicaciones';

import {Redirect } from 'react-router-dom';
import * as firebase from 'firebase'

class Perfil extends Component {
  constructor() {
    super()
    this.state = {
      login: '',
      datos: [],
      EnVenta: [],
      subastas: [],
      vendidos: [],
      subastados: [],
      foto: '',
      picture: '',
      modalShow: false,
      cargar: false,
      id: '',
      idMostrar: 0,
      indiceMostrar:'',
      nombreMostrar:'',
      vendedorMostrar:'',
      precioMostrar:0,
      descripcionMostrar:'',
      precio:0,
      fechaLimite: "",
      horaLimite: "",
      sePuedeEditar: true,
      categoriaMostrar: ''
    }
  }

  componentDidMount() {
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
        console.log("no existe")

    }
    else{
        console.log("existe")
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        const usuario = {
            login: decoded.identity.login
        }
        infoUsuario(decoded.identity.login).then(data => {
        this.setState({
          datos: data
        },
        () => {
            console.log("devuelvo")
        })
      })
        this.getAll(usuario)
    }
  }

  getAll = (usuario) => {
    console.log(usuario.login)
    getEnVentaUsuario(usuario).then(data => {
        this.setState({
            EnVenta: [...data]
        },
            () => {
                console.log(this.state.term)
            })
    })

    getSubastasEnCurso(usuario).then(data => {
        this.setState({
            subastas: [...data]
        },
            () => {
                console.log(this.state.term)
            })
    })

    getVentasAcabadas(usuario).then(data => {
        this.setState({
            vendidos: [...data]
        },
            () => {
                console.log(this.state.term)
            })
    })
    getSubastasAcabadas(usuario).then(data => {
      this.setState({
          subastados: [...data]
      },
          () => {
              console.log(this.state.term)
          })
  })

}

  onDelete = e => {
    e.preventDefault()

    const user = {
      login: this.state.login
    }
   deleteUser(user)
   this.setState({redirect: true});
  }

  cerrarSesion = e => {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.setState({redirect: true});
  }

  eliminarProductoPadre(index, esVenta){   //HAY QUE MANEJAR QUE SI ELIMINAS UNA SUBASTA, NO DEJE EN ALGUNOS CASOS
    if(esVenta==""){ //Si esVenta esta vacio, es pq no hay fecha limite, o sea es un producto y NO una subasta
      eliminarProducto(this.state.id)
      this.setState({
        modalShow: false,
        cargar: false,
        EnVenta: this.state.EnVenta.filter((elemento, i)=>{
            return  i!==index
            /*esto lo q hace es recorrer el vector productos,
              y lo modifica eliminando todo aquel que NO cumpla
              la condicion. en este caso, cuando encuentre la posicion
              del elemento index, lo eliminara*/
        })
      });
    }
    else{
      eliminarSubasta(this.state.id)
      this.setState({
        modalShow: false,
        cargar: false,
        subastas: this.state.subastas.filter((elemento, i)=>{
            return  i!==index
            /*esto lo q hace es recorrer el vector productos,
              y lo modifica eliminando todo aquel que NO cumpla
              la condicion. en este caso, cuando encuentre la posicion
              del elemento index, lo eliminara*/
        })
      });
    }
  }

  

  render() {
    let modalClose = () => this.setState({ modalShow: false, cargar: false }); //Para gestionar VistaProductoPerfil (guille)
    if (this.state.redirect){
      return <Redirect push to="/" />;
    }
    return (
        <div className="Default">
        <div className="Perfil">
        <NavLogReg/>
      <div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src={this.state.datos[4]} alt=""/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h6>
                                        Login:     {this.state.datos[0]}
                                    </h6>
                                    <h5>
                                      {this.state.datos[1]} {this.state.datos[2]}
                                    </h5>
                                    <h5>
                                      {this.state.datos[3]}
                                    </h5>
                                    <h5>
                                      Teléfono:  {this.state.datos[7]}
                                    </h5>
                                    <p class="proile-rating">Valoración : <span>{this.state.datos[6]}/10</span></p>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">En venta</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">En subasta</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="vendidos-tab" data-toggle="tab" href="#vendidos" role="tab" aria-controls="vendidos" aria-selected="false">Vendidos</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="subastados-tab" data-toggle="tab" href="#subastados" role="tab" aria-controls="subastados" aria-selected="false">Subastados</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2">
                    <Link to="/editarPerfil">
                        <button className="btn btn-primary mr-sm-2 ml-sm-2">
                            Editar perfil
                        </button>
                    </Link>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-work">
                            <p>Opciones</p>
                            <Link
                                to={{
                                    pathname: `/favoritos`,
                                    prod:{usuario: this.state.login}}} >
                            <Button className="mr-sm-4" variant="primary" >
                            Favoritos
                            </Button>
                            </Link>
                            <Link to="/chat">
                            <button className="btn btn-primary mr-sm-2 ml-sm-2">
                                Chats
                            </button>
                            </Link>
                            <p>Opciones</p>
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
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="card-deck">
                                {this.state.EnVenta.map((productos, index) => (
                                <div className="card-deck" rows="4" columns="4">
                                <div className="card ml-md-4 mr-md-4">
                                    <img className="card-img-top" src={productos[6]} />
                                    <div className="card-body">
                                    <h5 className="card-title">{productos[0]}</h5>
                                    <p className="card-text">{productos[4]}€</p>
                                    </div>
                                    <div className="card-footer"> {/*Para gestionar VistaProductoPerfil (guille)*/}
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => this.setState({ modalShow: true,
                                                                       id: productos[1],
                                                                       indiceMostrar: index,
                                                                       nombreMostrar: productos[0],
                                                                       vendedorMostrar: productos[3],
                                                                       precioMostrar: productos[4],
                                                                       descripcionMostrar: productos[2],
                                                                       categoriaMostrar: productos[5],
                                                                       fechaLimite: "",
                                                                       horaLimite: "",
                                                                       sePuedeEditar: true,
                                                                       cargar: true})} >
                                        Ver producto
                                    </Button>
                                    </div> {/* Fin para gestionar VistaProductoPerfil (guille)*/}
                                </div>
                                </div>
                                ))}
                            </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="card-deck">
                                {this.state.subastas.map((productos, index) => (
                                <div className="card-deck" rows="4" columns="4">
                                <div className="card ml-md-4 mr-md-4">
                                  <img className="card-img-top" src={productos[8]} />
                                  <div className="card-body">
                                    <h5 className="card-title">{productos[0]}</h5>
                                    <p className="card-text">{productos[4]}€</p>
                                  </div>
                                  <div className="card-footer"> {}
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => this.setState({ modalShow: true,
                                                                       id: productos[1],
                                                                       indiceMostrar: index,
                                                                       nombreMostrar: productos[0],
                                                                       vendedorMostrar: productos[3],
                                                                       precioMostrar: productos[4],
                                                                       descripcionMostrar: productos[2],
                                                                       categoriaMostrar: productos[5],
                                                                       fechaLimite: productos[6],
                                                                       horaLimite: productos[7],
                                                                       sePuedeEditar: true,
                                                                       cargar: true})} >
                                        Ver producto
                                    </Button>
                                    </div> {/* Fin para gestionar VistaProductoPerfil (guille)*/}
                                </div>
                                </div>
                                ))}
                            </div>
                            </div>
                            <div class="tab-pane fade" id="vendidos" role="tabpanel" aria-labelledby="vendidos-tab">
                            <div className="card-deck">
                                {this.state.vendidos.map((productos, index) => (
                                <div className="card-deck" rows="4" columns="4">
                                <div className="card ml-md-4 mr-md-4">
                                    <img className="card-img-top" src={productos[6]} />
                                    <div className="card-body">
                                    <h5 className="card-title">{productos[0]}</h5>
                                    <p className="card-text">{productos[4]}€</p>
                                    </div>
                                    <div className="card-footer"> {/*Para gestionar VistaProductoPerfil (guille)*/}
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => this.setState({ modalShow: true,
                                                                       id: productos[1],
                                                                       indiceMostrar: index,
                                                                       nombreMostrar: productos[0],
                                                                       vendedorMostrar: productos[3],
                                                                       precioMostrar: productos[4],
                                                                       descripcionMostrar: productos[2],
                                                                       categoriaMostrar: productos[5],
                                                                       fechaLimite: "",
                                                                       horaLimite: "",
                                                                       sePuedeEditar: false,
                                                                       cargar: true})} >
                                        Ver producto
                                    </Button>
                                    </div> {/* Fin para gestionar VistaProductoPerfil (guille)*/}
                                </div>
                                </div>
                                ))}
                            </div>
                            </div>
                            <div class="tab-pane fade" id="subastados" role="tabpanel" aria-labelledby="subastados-tab">
                            <div className="card-deck">
                                {this.state.subastados.map((productos, index) => (
                                <div className="card-deck" rows="4" columns="4">
                                <div className="card ml-md-4 mr-md-4">
                                  <img className="card-img-top" src={productos[6]} width="100" height="170" />
                                  <div className="card-body">
                                    <h5 className="card-title">{productos[0]}</h5>
                                    <p className="card-text">{productos[4]}€</p>
                                  </div>
                                  <div className="card-footer"> {}
                                    <Button
                                      variant="outline-primary"
                                      onClick={() => this.setState({ modalShow: true,
                                                                     id: productos[1],
                                                                     indiceMostrar: index,
                                                                     nombreMostrar: productos[0],
                                                                     vendedorMostrar: productos[3],
                                                                     precioMostrar: productos[4],
                                                                     descripcionMostrar: productos[2],
                                                                     categoriaMostrar: productos[5],
                                                                     fechaLimite: productos[6],
                                                                     horaLimite: productos[7],
                                                                     sePuedeEditar: false,
                                                                     cargar: true})} >
                                      Ver producto
                                    </Button>
                                  </div> {}
                                </div>
                                </div>
                                ))}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <VistaProductoPerfil
                fav={false}
                show={this.state.modalShow}
                id={this.state.id}
                cargar={this.state.cargar}
                usuario={this.state.usuario}
                indice={this.state.indiceMostrar}
                nombre={this.state.nombreMostrar}
                vendedor={this.state.vendedorMostrar}
                precio={this.state.precioMostrar}
                descripcion={this.state.descripcionMostrar}
                categoria={this.state.categoriaMostrar}
                fechaLimite={this.state.fechaLimite}
                horaLimite={this.state.horaLimite}
                editable={this.state.sePuedeEditar}
                onHide={modalClose /*modalClose pone a false modalShow*/}
                callback = {this.eliminarProductoPadre.bind(this)}
              />
        </div>
        </div>
        </div>
    )
  }
}

export default Perfil
