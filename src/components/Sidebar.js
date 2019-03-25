import React, { Component } from 'react';
import logo from './logo.png';
import './sidebar.css';
import moto from './moto.jpg'
import coche from './coche.jpg'
import Productos from './Productos';

class Sidebar extends Component {
  constructor(props) {
   super(props);
   //this.state = {isToggleOn: true};

   // This binding is necessary to make `this` work in the callback
   this.handleClick = this.handleClick.bind(this);
   this.precioMaximo = this.precioMaximo.bind(this);
 }

  handleClick() {
    alert("hola que tal");
  }
  precioMaximo(e) {
     document.getElementById('precioActual').value=e.target.value;
  }

  render() {

    return(

      <div className="sidebar" >

        <h3>Filtros</h3>

        <a>Buscar por categoría</a>

        <div className="btn-group dropright">
          <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categorias
          </button>
          <div className="dropdown-menu">
            <a className="dropright-item" href="#">&nbsp;&nbsp;Coches&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Motos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Aves&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Motos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Aves&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Coches&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Motos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Aves&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Motos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Aves&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropdown-item" href="#"></a>
            <a>&nbsp;&nbsp;<img src={moto}></img></a>
            <img src={moto}></img>
            <img src={moto}></img>
            <img src={moto}></img>
            <img src={moto}></img>
            <a className="dropright-item" href="#">&nbsp;&nbsp;Coches&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Motos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Aves&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Motos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Aves&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Coches&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Motos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Aves&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Motos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Aves&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropdown-item" href="#"></a>
            <a>&nbsp;&nbsp;<img src={moto}></img></a>
            <img src={moto}></img>
            <img src={moto}></img>
            <img src={moto}></img>
            <img src={moto}></img>
          </div>
        </div>




        <br/><br/>

        <a>Ordenar por precio</a>
        <div role="group" aria-label="Button group with nested dropdown">
          <button type="button" className="btn btn-secondary" >De menor a mayor</button>
          <button type="button" className="btn btn-secondary">De mayor a menor</button>

        </div>
        <br/><br/>
          <label >Precio maximo</label>
          <input type="range" className="custom-range" id="customRange1" onChange={this.precioMaximo}/>
          <input type="text" className="trans-box" id="precioActual" size="1" value="" />
          <br/><br/>

    </div>
    )
  }
}
export default Sidebar
