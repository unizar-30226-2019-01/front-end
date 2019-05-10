import React, { Component } from 'react';
import logo from '../images/logo.png';
import '../css/sidebar.css';
import moto from '../images/moto.jpg'
import coche from '../images/coche.jpg'
import Productos from './Productos';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Input} from "mdbreact"; //npm install mdbreact

class Sidebar extends Component {
  constructor(props) {
   super(props);
   //this.state = {isToggleOn: true};
   this.state = {
       precio:""
   };
   // This binding is necessary to make `this` work in the callback
   this.precioMaximo = this.precioMaximo.bind(this);
    //this.onChange = this.onChange.bind(this);
 }

  /*onChange(e) {
    window.confirm("Sidebar onChange")
    window.confirm(e.target.value)
    this.props.callback2(e.target.value)
  }*/

  precioMaximo(e) {
     //document.getElementById('precioActual').value=e.target.value;
     this.setState({precio:e.target.value});
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
            Ordenar de<span class="caret"></span>
          </button>

          <ul class="dropdown-menu" role="menu">
            <li><a className="dropright-item" href="#" onClick={() => this.props.callback(1)}> Mayor a menor precio</a></li>
            <li><a className="dropright-item" href="#" onClick={() => this.props.callback(2)}> Menor a mayor precio</a></li>
          </ul>

        </div>

        <br/><br/>
          <label >Precio maximo</label>
          <div className="row">
          <div className="col"> </div>
          <div className="col-8">
          <input type="range" className="custom-range" id="customRange1" min="0" max="1000" step="10" onChange={this.precioMaximo}/>
          <input type="text" className="trans-box" id="precioActual" size="1" value={this.state.precio} />
          <Button variant="primary"className="mx-auto" onClick={()=>this.props.callback2(this.state.precio)}> MAX €</Button>
          </div>
          <div className="col"> </div>
          </div>

          <br/><br/>

    </div>
    )
  }
}
export default Sidebar
