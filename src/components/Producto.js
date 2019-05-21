import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import logo from '../images/logo.png';
import bichardo from '../images/bichardo.jpg';
import bixobasket from '../images/bixobasket.jpg';
import jwt_decode from 'jwt-decode';
import '../css/App.css';
import NavLog from '../components/NavLog';
import NavLogReg from '../components/NavLogReg';
import Carousel from 'react-bootstrap/Carousel';
import { crearFavorito, eliminarFavorito, getFotos, tipoProducto, infoVenta, infoSubasta } from '../GestionPublicaciones';

import Form from 'react-bootstrap/Form';

import {Redirect, Link } from 'react-router-dom';
import * as firebase from 'firebase'


class Producto extends Component {

  constructor(args) {
    super(args)
    this.state = {
        modalShow: false,
        id: this.getParameterByName('id', window.location.href),
        datos1: [],
        fotos: '',
        fot: [],
        primeraVez: true
    };

}

  componentDidMount () {
    tipoProducto(this.state.id).then(res => {
        console.log(res)
        this.setState({
            tipo: res
        })
        if(res=="Venta"){
            infoVenta(this.state.id).then(data => {
            this.setState({
                    datos1: data,
                    fotos: data[4]
                })
            })
        }
        else{
            infoSubasta(this.state.id).then(data => {
                this.setState({
                  datos1: data,
                  fotos: data[4]
                })
            })
        }
    })

}
    

  getParameterByName(name, url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  getlink(id) {
    var aux = document.createElement('input');
    aux.setAttribute('value', "http://localhost:3000/producto?id=" + id);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    var aviso = document.createElement('div');
    aviso.setAttribute('id', 'aviso');
    aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: gold;border-radius: 8px;font-family: sans-serif;';
    aviso.innerHTML = 'URL copiada';
    document.body.appendChild(aviso);
    document.load = setTimeout('document.body.removeChild(aviso)', 2000);
    document.body.removeChild(aux);
  }

  marcarFavorito(usu,publicacion){
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
        window.alert("Regístrese o inicie sesión si ya posee una cuenta por favor")
    }
    else{
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)

      const fav = {
        usuario: decoded.identity.login
      }
      console.log(usu)
      crearFavorito(fav,publicacion)
      var aviso = document.createElement('div');
      aviso.setAttribute('id', 'aviso');
      aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: gold;border-radius: 8px;font-family: sans-serif;';
      aviso.innerHTML = 'Añadido a FAVORITOS';
      document.body.appendChild(aviso);
      document.load = setTimeout('document.body.removeChild(aviso)', 2000);
    }
  }



  render() {


    let chatYoferta
    if (localStorage.getItem('usertoken') !== undefined && localStorage.getItem('usertoken') !== null) {
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      if (this.props.vendedor != decoded.identity.login){
       chatYoferta =
       			<div>
               <ButtonGroup aria-label="Basic example">
       			<Link to={{
                	pathname:'/chat',
                	datos:{
                		vendedor:this.props.vendedor,
                		articulo:this.props.nombre
                	}
                }}>
	                <Button className="mr-sm-4" variant="success">
	                  Chat con vendedor
	                </Button>
                </Link>
                <Form.Group controlId="s">
                  <Form.Control type="number" placeholder="Precio"
                  name="precioOferta" min="1" step="any"
                  value={this.state.precioOferta}
                  onChange={this.onChange} />
                </Form.Group>
                <Button className="mr-sm-4" pro variant="secondary" onClick={() => this.ofertar(this.state.precioOferta)}>
                  Hacer oferta
                </Button>
                </ButtonGroup>
                </div>
      }
    }
    else{
    	//No estas logueado
       chatYoferta =
       			<div>
	            <Button className="mr-sm-4" variant="success" onClick={() => this.registrese()}>
	              Chat con vendedor
	            </Button>
                <Form.Group controlId="s">
                  <Form.Control type="number" placeholder="Precio"
                  name="precioOferta" min="1" step="any"
                  value={this.state.precioOferta}
                  onChange={this.onChange} />
                </Form.Group>
                <Button className="mr-sm-4" variant="secondary" onClick={() => this.registrese()}>
                  Hacer oferta
                </Button>
                </div>
    }

    let fotosMostrar=[[this.state.fotos]]
    if(this.state.primeraVez){
      getFotos(this.state.id).then(data => {
        console.log("HOLA3")
        this.setState({
            fot: [...data],
            primeraVez: false
        },
            () => {
                console.log(this.state.term)
            })
      })
    }
    Array.prototype.push.apply(fotosMostrar, this.state.fot);

    let contenido
    if (!this.props.fav) {
      contenido = <Button className="mr-sm-4" variant="outline-warning" onClick={() => this.marcarFavorito(this.props.usuario,this.props.id)}>
         FAVORITO
        </Button>
    } else {
      contenido = <Button className="mr-sm-4" variant="outline-warning" onClick={() =>this.props.callback(this.props.indice)}>
          Eliminar
        de FAVORITOS
        </Button>
    }


    if (this.state.redirect){
        return <Redirect push to="/" />;
      }


    if(this.state.tipo=="Venta"){
        return(
            <div className="Perfil">
            <NavLog/>
            <div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-3">
                    
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h1>
                                        {this.state.datos1[1]}
                                    </h1>
                                    <Carousel className="row mt-4">
                                {fotosMostrar.map((foto, index) => (
                                <Carousel.Item>
                                <img className="d-block w-100" src={foto[0]} width="150"/>
                                </Carousel.Item>
                                ))}
                            </Carousel>
                            <br/>
                            <br/>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Información del producto</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2">
                    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Tipo:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.tipo}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Descripción</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.datos1[2]}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Vendedor:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.datos1[5]}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Categoría</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.datos1[3]}</p>
                                            </div>
                                        </div>
                                        <br/>
                                        <br/>

                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Precio:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.datos1[6]}€</p>
                                            </div>
                                        </div>
                                        <br/>
                                        <ButtonGroup toggle>
                                        {contenido}

                                        <Button className="mr-sm-4" variant="dark"  onClick={() => this.getlink(this.props.id)}>
                                        Copiar URL
                                        </Button>

                                        {chatYoferta}
                                        </ButtonGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
        </div>)
    }
    else{
        return(
            <div className="Perfil">
            <NavLog/>
            <div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-3">
                    
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h1>
                                        {this.state.datos1[1]}
                                    </h1>
                                    <Carousel className="row mt-4">
                                {fotosMostrar.map((foto, index) => (
                                <Carousel.Item>
                                <img className="d-block w-100" src={foto[0]} width="150"/>
                                </Carousel.Item>
                                ))}
                            </Carousel>
                            <br/>
                            <br/>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Información del producto</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2">
                    
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Tipo:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.tipo}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Descripción</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.datos1[2]}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Precio inicial:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.datos1[6]}€</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Fecha límite:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.datos1[8]}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Hora límite:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.datos1[9]}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Vendedor:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.datos1[5]}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Categoría</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.datos1[3]}</p>
                                            </div>
                                        </div>
                                        <br/>
                                        <br/>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Precio actual:</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{this.state.datos1[7]}€</p>
                                            </div>
                                        </div>
                                        <br/>
                                        <ButtonGroup toggle>
                                        {contenido}

                                        <Button className="mr-sm-4" variant="dark"  onClick={() => this.getlink(this.props.id)}>
                                        Copiar URL
                                        </Button>

                                        {chatYoferta}
                                        </ButtonGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
        </div>)
    }
      
    
  }
}
export default Producto
