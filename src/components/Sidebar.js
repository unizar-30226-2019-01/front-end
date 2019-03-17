import React, { Component } from 'react';
import logo from './logo.png';
import './sidebar.css';

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
      <div className="w3-sidebar w3-light-grey w3-bar-block" >
        <h3 className="w3-bar-item">Filtros</h3>

        <a>Buscar por categoría</a>
        <div class="btn-group dropright">
          <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Categorias
          </button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
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
