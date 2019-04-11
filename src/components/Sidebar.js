import React, { Component } from 'react';
import logo from '../images/logo.png';
import '../css/sidebar.css';
import moto from '../images/moto.jpg'
import coche from '../images/coche.jpg'
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

      <div className="sidebar">
        <br />
        <h2>Filtros</h2>
        <div className="btn-group dropright">
          <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categorias
          </button>

          <div className="dropdown-menu">
            <a className="dropright-item" href="#">&nbsp;&nbsp;Coches&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Motos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Aves&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropdown-item" href="#"></a>
            <a>&nbsp;&nbsp;<img src={moto}></img></a>
            <img src={moto}></img>
            <img src={moto}></img>
            <a className="dropright-item" href="#">&nbsp;&nbsp;Coches&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Motos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropright-item" href="#">Aves&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
            <a className="dropdown-item" href="#"></a>
            <a>&nbsp;&nbsp;<img src={moto}></img></a>
            <img src={moto}></img>
            <img src={moto}></img>
          </div>
        </div>

        <br/><br/>

        <div class="btn-group dropright">
          <button type="button"  class="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown">
            Ordenar <span class="caret"></span>
          </button>

          <ul class="dropdown-menu" role="menu">
            <li><a className="dropright-item" href="#"> Menor a mayor precio</a></li>
            <li><a className="dropright-item" href="#"> Mayor a menor precio</a></li>
          </ul>
        </div>
        
        <br/><br/>
          <label >Precio maximo</label>
          <div className="row">
          <div className="col"> </div>
          <div className="col-8">
          <input type="range" className="custom-range" id="customRange1" onChange={this.precioMaximo}/>
          <input type="text" className="trans-box" id="precioActual" size="1" value="" />
          </div>
          <div className="col"> </div>
          </div>

          <br/><br/>

    </div>
    )
  }
}
export default Sidebar
