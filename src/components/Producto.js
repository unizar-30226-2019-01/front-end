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
import { crearFavorito, eliminarFavorito, getFotos, tipoProducto, infoVenta, infoSubasta, realizarOferta, realizarOfertaSubasta, consultarFavorito } from '../GestionPublicaciones';

import Form from 'react-bootstrap/Form';

import {Redirect, Link } from 'react-router-dom';
import * as firebase from 'firebase'


class Producto extends Component {

  constructor(props) {
    super(props)
    if(props.location.datos==undefined){
      this.state = {
          id: this.getParameterByName('id', window.location.href),
          datos1: [],
          fotos: '',
          fot: [],
          primeraVez: true,
          fechaLimite: '',
          fav: "Favorito no existe",
          precioOferta: ''
      };
    }
    else{
      this.state = {
        id: props.location.datos.id,
        datos1: [],
        fotos: '',
        fot: [],
        primeraVez: true,
        fechaLimite: '',
        fav: "Favorito no existe",
        precioOferta: ''
      };
      window.location.href = window.location.href + "?id=" + this.state.id
    }
    this.onChange = this.onChange.bind(this)

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
                  fotos: data[4],
                  fechaLimite: data[8]
                })
            })
        }
    })
}

onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
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

  ofertar(precio) {
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
        window.alert("Regístrese o inicie sesión si ya posee una cuenta por favor")
    }
    else{
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)

      realizarOferta(decoded.identity.login,this.state.datos1[0],precio).then(res => {
				if(res=="Error"){
          var aviso = document.createElement('div');
          aviso.setAttribute('id', 'aviso');
          aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: red;border-radius: 8px;color:white; font-family: sans-serif;';
          aviso.innerHTML = 'Precio inferior al producto';
          document.body.appendChild(aviso);
          document.load = setTimeout('document.body.removeChild(aviso)', 2000);
        }
        else if(res=="Realizada"){
          var aviso = document.createElement('div');
          aviso.setAttribute('id', 'aviso');
          aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: red;border-radius: 8px;color:white; font-family: sans-serif;';
          aviso.innerHTML = 'Ya has realizado una oferta, espere a ser aceptada';
          document.body.appendChild(aviso);
          document.load = setTimeout('document.body.removeChild(aviso)', 2000);
        }
        else{
          var aviso = document.createElement('div');
          aviso.setAttribute('id', 'aviso');
          aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: limegreen;border-radius: 8px;color:white; font-family: sans-serif;';
          aviso.innerHTML = 'Oferta realizada';
          document.body.appendChild(aviso);
          document.load = setTimeout('document.body.removeChild(aviso)', 2000);
        }
			})
      this.setState({
        precioOferta: ''
      });
    }
  }

  ofertarSubasta(precio) {
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
        window.alert("Regístrese o inicie sesión si ya posee una cuenta por favor")
    }
    else{
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)

      //console.log(this.prop.id)
      realizarOfertaSubasta(decoded.identity.login,this.state.datos1[0],precio).then(res=> {
        if(res=="ERROR"){
          var aviso = document.createElement('div');
          aviso.setAttribute('id', 'aviso');
          aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: red;border-radius: 8px;color:white; font-family: sans-serif;';
          aviso.innerHTML = 'La puja debe superar el precio actual';
          document.body.appendChild(aviso);
          document.load = setTimeout('document.body.removeChild(aviso)', 2000);
        }
        else{
          var aviso = document.createElement('div');
          aviso.setAttribute('id', 'aviso');
          aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: limegreen;border-radius: 8px;color:white; font-family: sans-serif;';
          aviso.innerHTML = 'Puja realizada';
          document.body.appendChild(aviso);
          document.load = setTimeout('document.body.removeChild(aviso)', 2000);
        }
      })

      this.setState({
        precioOferta: ''
      });
    }
  }

  registrese(){
  	window.alert("Regístrese o inicie sesión si ya posee una cuenta, por favor.")
  }

    desmarcarFavorito(){
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({fav: "Favorito no existe"});
        const fav = {
            usuario: decoded.identity.login
        }
        eliminarFavorito(fav,this.state.datos1[0])
    }

    esFavorito(usu,publicacion){

        if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
            console.log("AQUIIIII")
            this.setState({fav: "Favorito no existe"});
        }
        else{
            const token = localStorage.usertoken
            const decoded = jwt_decode(token)

            const fav = {
                usuario: decoded.identity.login
            }
            console.log("miro fav")
            consultarFavorito(fav,publicacion).then(data => {
                this.setState({
                    fav: data
                })
            })
        }
}

marcarFavorito(usu,publicacion){
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
        window.alert("Regístrese o inicie sesión si ya posee una cuenta, por favor.")
    }
    else{
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)

      const fav = {
        usuario: decoded.identity.login
      }
      console.log(usu)
      crearFavorito(fav,publicacion)
      this.setState({fav: "Favorito existe"});
    }
  }



  render() {

    let chatYoferta
    let botonReportar
    let botonPerfil
    if (localStorage.getItem('usertoken') !== undefined && localStorage.getItem('usertoken') !== null) {
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      if (this.state.datos1[5] != decoded.identity.login){   // Si user != vendedor
          if(this.state.fechaLimite==""){   // Si es compra normal
             chatYoferta =
             			<div>
                     <ButtonGroup aria-label="Basic example">
             			<Link to={{
                      	pathname:'/chat',
                      	datos:{
                      		vendedor:this.state.datos1[5],
                      		articulo:this.state.datos1[1]
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
                    botonPerfil=
                      <div>
                        <Link to={{
                          pathname:'/VerPerfil',
                          datos:{
                            vendedor:this.state.datos1[5]
                          }
                        }}>
                        <Button variant="outline-dark">
                          VENDEDOR: {this.state.datos1[5]}
                        </Button>
                        </Link>
                      </div>

                    botonReportar=
                      <div>
                        <Link to={{
                          pathname:'/Report',
                          datos:{
                            denunciante: decoded.identity.login,
                            passDenunciante:  decoded.identity.password,
                            vendedor:this.state.datos1[5],
                            articulo:this.state.datos1[1]
                          }
                        }}>
                          <Button className="ml-sm-4" variant="danger">
                            Reportar vendedor
                          </Button>
                        </Link>
                      </div>
                }
                else{   //Si es subasta
                  chatYoferta =
                       <div>
                          <ButtonGroup aria-label="Basic example">
                       <Link to={{
                             pathname:'/chat',
                             datos:{
                               vendedor:this.state.datos1[5],
                               articulo:this.state.datos1[1]
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

                           <Button className="mr-sm-4" pro variant="secondary" onClick={() => this.ofertarSubasta(this.state.precioOferta)}>
                             Hacer puja
                           </Button>
                           </ButtonGroup>
                        </div>

                      botonPerfil=
                        <div>
                          <Link to={{
                            pathname:'/VerPerfil',
                            datos:{
                              vendedor:this.state.datos1[5]
                            }
                          }}>
                          <Button variant="outline-dark">
                            VENDEDOR: {this.state.datos1[5]}
                          </Button>
                          </Link>
                        </div>

                    botonReportar=
                        <div>
                          <Link to={{
                            pathname:'/Report',
                            datos:{
                              denunciante: decoded.identity.login,
                              passDenunciante:  decoded.identity.password,
                              vendedor:this.state.datos1[5],
                              articulo:this.state.datos1[1]
                            }
                          }}>
                            <Button className="ml-sm-4" variant="danger">
                              Reportar vendedor
                            </Button>
                          </Link>
                        </div>
          }
      }
      else{ //Si estas mirando un producto tuyo: 'ver perfil' redirige a tu pantalla de gestion del perfil
        botonPerfil=
          <div>
            <Link to={{
              pathname:'/Perfil',
              datos:{
                vendedor:this.state.datos1[5]
              }
            }}>
            <Button variant="outline-dark">
              VENDEDOR: {this.state.datos1[5]}
            </Button>
            </Link>
          </div>
      }
    }
    else{
      //No estas logueado
      console.log("no log")
       chatYoferta =
       			<div>
	            <Button className="mr-sm-4" variant="success" onClick={() => this.registrese()}>
	              Chat con vendedor
	            </Button>
                <Button className="mr-sm-4" variant="secondary" onClick={() => this.registrese()}>
                  Hacer oferta
                </Button>
                </div>

              botonPerfil=
                <div>
                  <Link to={{
                    pathname:'/VerPerfil',
                    datos:{
                      vendedor:this.state.datos1[5]
                    }
                  }}>
                  <Button variant="outline-dark">
                    VENDEDOR: {this.state.datos1[5]}
                  </Button>
                  </Link>
                </div>

        botonReportar=
            <div>
              <Button className="mr-sm-4" variant="danger" onClick={() => this.registrese()}>
                Reportar vendedor
              </Button>
            </div>
    }



    let contenido
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
      if (localStorage.getItem('usertoken') !== undefined && localStorage.getItem('usertoken') !== null){
            this.esFavorito(this.state.datos1[5],this.state.id)
        }
    }

    Array.prototype.push.apply(fotosMostrar, this.state.fot);

    if (this.state.fav=="Favorito no existe") {
        contenido = <Button className="mr-sm-4" variant="outline-warning" onClick={() => this.marcarFavorito(this.state.datos1[5],this.state.datos1[0])}>
           FAVORITO
          </Button>
      }
      else if(this.state.fav=="Favorito existe"){
        contenido = <Button className="mr-sm-4" variant="warning" onClick={() => this.desmarcarFavorito()}>
            Eliminar
          de FAVORITOS
          </Button>
      }

    let barra
    if (localStorage.getItem('usertoken') !== undefined && localStorage.getItem('usertoken') !== null){
        barra = <NavLogReg/>
    }
    else{
        barra = <NavLog/>
    }


    if (this.state.redirect){
        return <Redirect push to="/" />;
    }




    if(this.state.tipo=="Venta"){
        return(
            <div className="Perfil">
            {barra}
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
                            <ButtonGroup aria-label="Basic example">

                {botonPerfil}
                {botonReportar}

                </ButtonGroup>
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

                                        <Button className="mr-sm-4" variant="dark"  onClick={() => this.getlink(this.state.datos1[0])}>
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
            {barra}
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
                            <ButtonGroup aria-label="Basic example">

                {botonPerfil}
                {botonReportar}

                </ButtonGroup>
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

                                        <Button className="mr-sm-4" variant="dark"  onClick={() => this.getlink(this.state.datos1[0])}>
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
