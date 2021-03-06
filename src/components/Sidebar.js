import React, { Component } from 'react';
import logo from '../images/logo.png';
import '../css/sidebar.css';
import moto from '../images/moto.jpg'
import coche from '../images/coche.jpg'
import electronica from '../images/electronica.jpg'
import telefonia from '../images/telefonia.jpg'
import deporte from '../images/deporte.jpg'
import inmobiliaria from '../images/inmobiliaria.jpg'
import todo from '../images/todo.jpg'
import bici from '../images/bici.jpg'
import videojuego from '../images/videojuego.jpg'
import hogar from '../images/hogar.jpg'
import moda from '../images/moda.jpg'
import electrodomestico from '../images/electrodomestico.jpg'
import libro from '../images/libro.jpg'
import niño from '../images/niño.jpg'
import empleo from '../images/empleo.jpg'
import construccion from '../images/construccion.jpg'
import coleccionismo from '../images/coleccionismo.jpg'
import otro from '../images/otro.jpg'
import MapSidebar from './MapSidebar'
import image from'../images/equis.jpg'

import Productos from './Productos';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Input} from "mdbreact"; //npm install mdbreact

class Sidebar extends Component {
  constructor(props) {
   super(props);
   //this.state = {isToggleOn: true};
   this.state = {
       precio:"",
       precio2:"",
       precioAux:this.props.precioText,
       lugarText:this.props.lugarText,
       catText:this.props.catText,
       ubiText:this.props.ubiText
   };
   // This binding is necessary to make `this` work in the callback
   this.precioMaximo = this.precioMaximo.bind(this);
   this.cambiarProvincia = this.cambiarProvincia.bind(this);
    //this.onChange = this.onChange.bind(this);
 }

  /*onChange(e) {
    window.confirm("Sidebar onChange")
    window.confirm(e.target.value)
    this.props.callback2(e.target.value)
  }*/

  precioMaximo(e) {
     //document.getElementById('precioActual').value=e.target.value;
     if(e.target.value==1000){
       this.setState({precio2:"+1000",precio:e.target.value});
     }
     else{
       this.setState({precio2:e.target.value,precio:e.target.value});
     }
     //console.log(this.state.precio)
     //this.props.callback2(this.state.precio)
  }

  cambiarProvincia(prov){
    this.props.callback4(prov);
  }

  render() {
    let money
    if(this.state.precioAux=="" || this.state.precioAux==undefined){
      money = "--"
    }
    else if(this.state.precioAux==1000){
      money = "+1000"
    }
    else{
      money = this.state.precioAux
    }

    let cat
    if(this.state.catText=="" || this.state.catText==undefined){
      cat = "Todas"
    }
    else{
      cat = this.state.catText
    }

    let ubi
    if(this.state.ubiText=="" || this.state.ubiText==undefined){
      ubi = "--"
    }
    else{
      if(this.state.ubiText.length<=27){
        ubi = this.state.ubiText
        console.log(ubi.length)
      }
      else{
        let inicio = 0,
            fin=24;
        ubi = (this.state.ubiText).substring(inicio, fin)
        ubi = ubi + "..."
      }
    }

    return(

      <div className="sidebar">

          <br />
        <div className="sidebarHijo">
        <label>Categoría actual: {cat}</label>
          <div className="btn-group dropright">
            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categorias
            </button>

            <div className="dropdown-menu">
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("")}>&nbsp;&nbsp;Todas&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Coches")}>Coches&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Electrónica")}>Electrónica&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Telefonía")}>Telefonía&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Deporte")}>&nbsp;&nbsp;Deporte&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Inmobiliaria")}>Inmobiliaria&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropdown-item" href="#"></a>
              <a>&nbsp;&nbsp;<img src={todo}></img></a>&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={coche}></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={electronica}></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={telefonia}></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a>&nbsp;&nbsp;<img src={deporte}></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={inmobiliaria}></img>&nbsp;&nbsp;&nbsp;&nbsp;
              <br />
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Motos")}>&nbsp;&nbsp;Motos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Bicicletas")}>Bicicletas&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Videojuegos")}>Videojuegos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Hogar")}>Hogar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Moda")}>&nbsp;&nbsp;Moda&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Electrodomésticos")}>Electrodomésticos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropdown-item" href="#"></a>
              <a>&nbsp;&nbsp;<img src={moto}></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={bici}></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={videojuego}></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={hogar}></img>&nbsp;&nbsp;&nbsp;&nbsp;
              <a>&nbsp;&nbsp;<img src={moda}></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={electrodomestico}></img>&nbsp;
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Libros")}>&nbsp;Libros&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Niños")}>Niños&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Empleo")}>Empleo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Construcción")}>Construcción&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Coleccionismo")}>&nbsp;&nbsp;Coleccionismo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropright-item" href="#" onClick={() => this.props.callback3("Otros")}>Otros&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
              <a className="dropdown-item" href="#"></a>
              <a>&nbsp;&nbsp;<img src={libro}></img></a>&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={niño}></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={empleo}></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={construccion}></img>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a>&nbsp;&nbsp;<img src={coleccionismo}></img></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <img src={otro}></img>&nbsp;
            </div>
          </div>

          <hr
            style={{
                color: "#A3C8F9",
                backgroundColor: "#A3C8F9",
                height: 1
            }}
        />

          <div class="btn-group dropright">
            <button type="button"  class="btn btn-primary dropdown-toggle"
                    data-toggle="dropdown">
              Ordenar de<span class="caret"></span>
            </button>

            <ul class="dropdown-menu" role="menu">
              <li><a className="dropright-item" href="#" onClick={() => this.props.callback(1)}> Mayor a menor precio</a></li>
              <li><a className="dropright-item" href="#" onClick={() => this.props.callback(2)}> Menor a mayor precio</a></li>
            </ul>

          </div>

          <hr
            style={{
                color: "#A3C8F9",
                backgroundColor: "#A3C8F9",
                height: 1
            }}
        />
            <label >Precio máximo: {money}</label>
            <div className="row">
            <div className="col"> </div>
            <div className="col-8">
            <input type="range" className="custom-range" id="customRange1" min="0" max="1000" step="10" onChange={this.precioMaximo}/>
            <input type="text" className="trans-box" id="precioActual" size="1" value={this.state.precio2} />
            <Button variant="primary"className="mx-auto" onClick={()=>this.props.callback2(this.state.precio)}> MAX €</Button>
            </div>
            <div className="col"> </div>
            </div>

            <hr
              style={{
                  color: "#A3C8F9",
                  backgroundColor: "#A3C8F9",
                  height: 1
              }}
          />

            <label>Ubicación actual: {ubi}</label>
            <MapSidebar
              google={this.props.google}
              center={{lat: 41.6517501, lng: -0.9300005}}
              height='0px' //para que no se vea el mapa
              zoom={5}
              lugarText={this.state.lugarText}
              callback={this.cambiarProvincia.bind(this)}
            />
            <hr
              style={{
                  color: "#FF888D",
                  backgroundColor: "#FF888D",
                  height: 1
              }}
          />
            &nbsp;

            <Button href="/" variant="danger" className="mx-auto" > Eliminar Filtros</Button>
          </div>
    </div>
    )
  }
}
export default Sidebar
