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
import { crearFavorito, eliminarFavorito, getFotos } from '../GestionPublicaciones';

import Form from 'react-bootstrap/Form';

import {Redirect } from 'react-router-dom';
import * as firebase from 'firebase'


class Producto extends Component {

  constructor(args) {
    super(args)
    this.state = {
        modalShow: false,
        id: '',
        datos: [],
        fot: [],
        usuario: ''
    };

}

  componentDidMount () {
    console.log(window.location.href)
    this.setState({
        id: this.getParameterByName('id', window.location.href)
    })
    //this.infoPublicacion(this.getParameterByName('id', window.location.href))
  }

  getParameterByName(name, url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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

    let fotosMostrar=[[this.props.fotoP]]
    if(this.state.primeraVez){
      getFotos(this.props.id).then(data => {
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
                                    Bichardo
                                </h1>
                                <Carousel className="row mt-4">
                            {fotosMostrar.map((foto, index) => (
                            <Carousel.Item>
                            <img className="d-block w-100" src={bichardo} width="150"/>
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
                                            <label>Precio:</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>klk</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Vendedor:</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Kshiti Ghelani</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Categoría</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>123 456 7890</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Descripción</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Web Developer and Designer</p>
                                        </div>
                                    </div>
                                    <br/>
                                    <ButtonGroup toggle>
                                    {contenido}

                
                                    <Button className="mr-sm-4" variant="dark"  onClick={() => this.getlink(this.props.id)}>
                                    Copiar URL
                                    </Button>

                                    <Button className="mr-sm-4" variant="success" onClick={() => this.abrirChat()}>
                                    Abrir chat vendedor
                                    </Button>

                                    <Button className="mr-sm-4" variant="secondary"> {/*onClick=() => aqui redirigir al chat*/}
                                    Hacer oferta
                                    </Button>
                                    </ButtonGroup>
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
export default Producto
