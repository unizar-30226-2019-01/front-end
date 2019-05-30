import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import { Route, Switch, Link } from 'react-router-dom';
//import EditarPerfil from './EditarPerfil';
import '../css/perfil.css';
import bichardo from '../images/bichardo.jpg';
import { deleteUser, infoUsuario, tieneSubastas } from '../GestionUsuarios';
import { getEnVentaUsuario, getVentasAcabadas, getSubastasEnCurso, getSubastasAcabadas, getProductosComprados, estaValorado, valorarProducto, deletePublicacionesUser } from '../GestionPublicaciones';
import Button from 'react-bootstrap/Button';
import VistaProductoPerfil from './VistaProductoPerfil';
import NavLogReg from './NavLogReg';

import { eliminarProducto } from '../GestionPublicaciones';
import { eliminarSubasta } from '../GestionPublicaciones';

import {Redirect } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import * as firebase from 'firebase';

import Chatkit from '@pusher/chatkit-client';
import { tokenUrl, instanceLocator, key } from './config';

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
      comprados: [],
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
      fotoMostrar:'',
      precio:0,
      fechaLimite: "",
      horaLimite: "",
      sePuedeEditar: true,
      categoriaMostrar: '',
      rating: 0,
      valoracionMostrar: "",
      userBorrado: ""
    }
    this.changeRating = this.changeRating.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
        console.log("no existe")

    }
    else{
        //console.log("existe")
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
            //console.log("devuelvo")
        })
      })
        this.getAll(usuario)
    }
  }

  changeRating( newRating, newVendedor, name ) {    //OJO con el newVendedor, borrar
    this.setState({
      rating: newRating
    });
  }


  getAll = (usuario) => {
    //console.log(usuario.login)
    getEnVentaUsuario(usuario).then(data => {
        this.setState({
            EnVenta: [...data],
            login: usuario.login
        },
            () => {
                //console.log(this.state.term)
            })
    })

    getSubastasEnCurso(usuario).then(data => {
        this.setState({
            subastas: [...data]
        },
            () => {
                //console.log(this.state.term)
            })
    })

    getVentasAcabadas(usuario).then(data => {
        this.setState({
            vendidos: [...data]
        },
            () => {
                //console.log(this.state.term)
            })
    })
    getSubastasAcabadas(usuario).then(data => {
      this.setState({
          subastados: [...data]
      },
          () => {
              //console.log(this.state.term)
          })
  })

  getProductosComprados(usuario).then(data => {
    this.setState({
        comprados: [...data]
    },
        () => {
            //console.log(this.state.term)
        })
  })

}

onDelete = e => {
  e.preventDefault()

  const user = {
    login: this.state.login
  }

  tieneSubastas(user).then(res => {
   if(res=="NO"){
     if(window.confirm("¿Estas seguro?")){
      //Eliminamos el usuario de CHATKIT:
      const ChatkitS = require('@pusher/chatkit-server');
      //Servidor
      const chatkit = new ChatkitS.default({
        instanceLocator: instanceLocator,
        key: key,
      })
      //Eliminamos al usuario del CHAT
      chatkit.deleteUser({ userId: this.state.login })
      .then(() => {
        console.log('Uusario eliminado de CHATKIT correctamente');
      }).catch((err) => {
        console.log(err);
      });
      //Eliminamos al usuario de la BD.
       localStorage.removeItem('usertoken')
       deleteUser(user)
       this.setState({redirect: true,
                      userBorrado: user});
     }
   }
   else{
     window.alert("No puede eliminar su cuenta debido a que tiene subastas abiertas")
   }
    })
}

  cerrarSesion = e => {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.setState({redirectCerrarSesion: true});
  }

  valorar (id, valoracion) {
    //e.preventDefault()

    estaValorado(id, valoracion).then(res => {
      console.log(res)
      if(res!="SI"){
        valorarProducto(id, valoracion)
        var aviso = document.createElement('div');
        aviso.setAttribute('id', 'aviso');
        aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: gold;border-radius: 8px;font-family: sans-serif;';
        aviso.innerHTML = 'Producto valorado';
        document.body.appendChild(aviso);
        document.load = setTimeout('document.body.removeChild(aviso)', 2000);
      }
      else{
        var aviso = document.createElement('div');
        aviso.setAttribute('id', 'aviso');
        aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: gold;border-radius: 8px;font-family: sans-serif;';
        aviso.innerHTML = 'Ya has valorado este producto';
        document.body.appendChild(aviso);
        document.load = setTimeout('document.body.removeChild(aviso)', 2000);
      }
    })

    this.setState({
      rating: 0
    });

    //this.setState({redirect: true});
  }


  eliminarProductoPadre(index, esVenta, fechaHoy, fechaL){   //HAY QUE MANEJAR QUE SI ELIMINAS UNA SUBASTA, NO DEJE EN ALGUNOS CASOS
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
      if((+fechaHoy+2)>(+fechaL)){
        window.alert("Su subasta termina en un plazo inferior a dos días. Ya no puede editarla ni eliminarla. Póngase en contacto con el ganador cuando finalice el plazo")
        this.setState({
          modalShow: false,
          cargar: false,
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
  }



  render() {
    let modalClose = () => this.setState({ modalShow: false, cargar: false }); //Para gestionar VistaProductoPerfil (guille)
    if (this.state.redirect){
      console.log("REDIRECT DE ELIMINANDO> USUARIO BORRADO:")
      console.log(this.state.userBorrado)
      return <Redirect push to={{pathname: `/`,
                                 usuario:{userBorrado:this.state.userBorrado}}} />;
    }
    if (this.state.redirectCerrarSesion){
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
                                     <p class="profile-rating">
                                    <h5>Valoración:</h5>
                                      <span>
                                        <StarRatings
                                          starRatedColor="gold"
                                          numberOfStars={5}
                                          starDimension="20px"
                                          starSpacing="5px"
                                          rating={this.state.datos[6]}
                                        />
                                      </span>
                                    </p>


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
                                <li class="nav-item">
                                    <a class="nav-link" id="comprados-tab" data-toggle="tab" href="#comprados" role="tab" aria-controls="comprados" aria-selected="false">Comprados</a>
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
                                    pathname: `/favoritos`}} >
                            <Button className="mr-sm-4" variant="warning" >
                            Favoritos
                            </Button>
                            </Link>
                            <Link to="/chat">
                            <button className="btn btn-primary mr-sm-2 ml-sm-2">
                                Chats
                            </button>
                            </Link>
                            <p>Gestión del perfil</p>
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
                                    <img className="card-img-top" src={productos[6]} width="150" height="170" />
                                    <div className="card-body">
                                    <h5 className="card-title">{productos[0]}</h5>
                                    <p className="card-text">{productos[4]}€</p>
                                    </div>
                                    <div className="card-footer"> {/*Para gestionar VistaProductoPerfil (guille)*/}
                                    <div className="text-center">
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
                                                                       fotoMostrar: productos[6],
                                                                       fechaLimite: "",
                                                                       horaLimite: "",
                                                                       valoracionMostrar: productos[8],
                                                                       sePuedeEditar: true,
                                                                       cargar: true})} >
                                        Ver producto
                                    </Button>
                                    </div>
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
                                  <img className="card-img-top" src={productos[8]} width="150" height="170"/>
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
                                                                       fotoMostrar: productos[8],
                                                                       fechaLimite: productos[6],
                                                                       horaLimite: productos[7],
                                                                       valoracionMostrar: productos[10],
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
                                    <img className="card-img-top" src={productos[6]} width="150" height="170"/>
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
                                                                       fotoMostrar: productos[6],
                                                                       fechaLimite: "",
                                                                       horaLimite: "",
                                                                       valoracionMostrar: productos[8],
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
                                  <img className="card-img-top" src={productos[8]} width="150" height="170" />

                                  {console.log("IMAGEN de la subasta:")}
                                  {console.log(productos[6])}

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
                                                                     fotoMostrar: productos[8],
                                                                     fechaLimite: productos[6],
                                                                     horaLimite: productos[7],
                                                                     valoracionMostrar: productos[10],
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
                            {/* COMPRADOS */}
                            <div class="tab-pane fade" id="comprados" role="tabpanel" aria-labelledby="comprados-tab">
                            <div className="card-deck">
                                {this.state.comprados.map((productos, index) => (
                                <div className="card-deck" rows="4" columns="4">
                                <div className="card ml-md-4 mr-md-4">
                                  <img className="card-img-top" src={productos[5]} width="150" height="170" />
                                  <div className="card-body">
                                    <h5 className="card-title">{productos[0]}</h5>
                                    <StarRatings
                                      starRatedColor="gold"
                                      numberOfStars={5}
                                      starDimension="20px"
                                      starSpacing="5px"
                                      name="rating"
                                      rating={this.state.rating}

                                      changeRating={this.changeRating}
                                    />
                                  </div>
                                  <div className="card-footer">

                                    {console.log("NewRating:")}
                                    {console.log(this.state.rating)}

                                    <Button className="ml-sm-4" variant="danger" onClick={() => this.valorar(productos[1],this.state.rating)}>
                                    Valorar
                                    </Button>

                                  </div>
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
                valoracion={this.state.valoracionMostrar}
                fotoP={this.state.fotoMostrar}
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
