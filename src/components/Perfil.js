import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import { Route, Switch, Link } from 'react-router-dom';
//import EditarPerfil from './EditarPerfil';
import '../css/perfil.css';
import bichardo from '../images/bichardo.jpg';
import { deleteUser } from '../GestionUsuarios';
import { getEnVentaUsuario, getVentasAcabadas, getSubastasEnCurso, getSubastasAcabadas } from '../GestionPublicaciones';
import Button from 'react-bootstrap/Button';
import VistaProducto from './VistaProducto';
import NavLogReg from './NavLogReg';

import { eliminarProducto } from '../GestionPublicaciones';

import {Redirect } from 'react-router-dom';

class Perfil extends Component {
  constructor() {
    super()
    this.state = {
      login: '',
      nombre: '',
      apellidos: '',
      email: '',
      EnVenta: [],
      subastas: [],
      vendidos: [],
      modalShow: false,
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
        this.setState({
            login: decoded.identity.login,
            nombre: decoded.identity.nombre,
            apellidos: decoded.identity.apellidos,
            email: decoded.identity.email
        })
        const usuario = {
            login: decoded.identity.login
        }
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

  eliminarProductoPadre(index){
    eliminarProducto(this.state.id)
    this.setState({
      modalShow: false,
      productos: this.state.productos.filter((elemento, i)=>{
          return  i!==index
          /*esto lo q hace es recorrer el vector productos,
            y lo modifica eliminando todo aquel que NO cumpla
            la condicion. en este caso, cuando encuentre la posicion
            del elemento index, lo eliminara*/
      })
    });
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false }); //Para gestionar vistaProducto (guille)
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
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                            <div class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h6>
                                        Login:     {this.state.login}
                                    </h6>
                                    <h5>
                                      {this.state.nombre} {this.state.apellidos}
                                    </h5>
                                    <h5>
                                      {this.state.email}
                                    </h5>
                                    <p class="proile-rating">Valoración : <span>8/10</span></p>
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
                            <button className="btn btn-primary mr-sm-2 ml-sm-2">
                                Chats
                            </button>
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
                                    <img className="card-img-top" src={bichardo} />
                                    <div className="card-body">
                                    <h5 className="card-title">{productos[0]}</h5>
                                    <p className="card-text">Vendedor: {productos[3]}</p>
                                    </div>
                                    <div className="card-footer"> {/*Para gestionar vistaProducto (guille)*/}
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => this.setState({ modalShow: true,
                                                                    id: productos[1],
                                                                    indiceMostrar: index,
                                                                    nombreMostrar: productos[0],
                                                                    vendedorMostrar: productos[3],
                                                                    precioMostrar: productos[4],
                                                                    descripcionMostrar: productos[2]})} >
                                        Ver producto
                                    </Button>
                                    </div> {/* Fin para gestionar vistaProducto (guille)*/}
                                </div>
                                </div>
                                ))}
                                <VistaProducto
                                    show={this.state.modalShow}
                                    id={this.state.id}
                                    indice={this.state.indiceMostrar}
                                    nombre={this.state.nombreMostrar}
                                    vendedor={this.state.vendedorMostrar}
                                    precio={this.state.precioMostrar}
                                    descripcion={this.state.descripcionMostrar}
                                    onHide={modalClose /*modalClose pone a false modalShow*/}
                                    callback = {this.eliminarProductoPadre.bind(this)}
                                    />
                            </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div className="card-deck">
                                {this.state.subastas.map((productos, index) => (
                                <div className="card-deck" rows="4" columns="4">
                                <div className="card ml-md-4 mr-md-4">
                                    <img className="card-img-top" src={bichardo} />
                                    <div className="card-body">
                                    <h5 className="card-title">{productos[0]}</h5>
                                    <p className="card-text">Vendedor: {productos[3]}</p>
                                    </div>
                                    <div className="card-footer"> {/*Para gestionar vistaProducto (guille)*/}
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => this.setState({ modalShow: true,
                                                                    id: productos[1],
                                                                    indiceMostrar: index,
                                                                    nombreMostrar: productos[0],
                                                                    vendedorMostrar: productos[3],
                                                                    precioMostrar: productos[4],
                                                                    descripcionMostrar: productos[2]})} >
                                        Ver producto
                                    </Button>
                                    </div> {/* Fin para gestionar vistaProducto (guille)*/}
                                </div>
                                </div>
                                ))}
                                <VistaProducto
                                    show={this.state.modalShow}
                                    id={this.state.id}
                                    indice={this.state.indiceMostrar}
                                    nombre={this.state.nombreMostrar}
                                    vendedor={this.state.vendedorMostrar}
                                    precio={this.state.precioMostrar}
                                    descripcion={this.state.descripcionMostrar}
                                    onHide={modalClose /*modalClose pone a false modalShow*/}
                                    callback = {this.eliminarProductoPadre.bind(this)}
                                    />
                            </div>
                            </div>
                            <div class="tab-pane fade" id="vendidos" role="tabpanel" aria-labelledby="vendidos-tab">
                            <div className="card-deck">
                                {this.state.vendidos.map((productos, index) => (
                                <div className="card-deck" rows="4" columns="4">
                                <div className="card ml-md-4 mr-md-4">
                                    <img className="card-img-top" src={bichardo} />
                                    <div className="card-body">
                                    <h5 className="card-title">{productos[0]}</h5>
                                    <p className="card-text">Vendedor: {productos[3]}</p>
                                    </div>
                                    <div className="card-footer"> {/*Para gestionar vistaProducto (guille)*/}
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => this.setState({ modalShow: true,
                                                                    id: productos[1],
                                                                    indiceMostrar: index,
                                                                    nombreMostrar: productos[0],
                                                                    vendedorMostrar: productos[3],
                                                                    precioMostrar: productos[4],
                                                                    descripcionMostrar: productos[2]})} >
                                        Ver producto
                                    </Button>
                                    </div> {/* Fin para gestionar vistaProducto (guille)*/}
                                </div>
                                </div>
                                ))}
                                <VistaProducto
                                    show={this.state.modalShow}
                                    id={this.state.id}
                                    indice={this.state.indiceMostrar}
                                    nombre={this.state.nombreMostrar}
                                    vendedor={this.state.vendedorMostrar}
                                    precio={this.state.precioMostrar}
                                    descripcion={this.state.descripcionMostrar}
                                    onHide={modalClose /*modalClose pone a false modalShow*/}
                                    callback = {this.eliminarProductoPadre.bind(this)}
                                    />
                            </div>
                            </div>
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