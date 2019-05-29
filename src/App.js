import React, { Component } from 'react';
import './css/App.css';
import NavLog from './components/NavLog';
import NavLogReg from './components/NavLogReg';
import Sidebar from './components/Sidebar';
import Productos from './components/Productos';
import { Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';


class App extends Component {

  //componentWillUnmount
  //componentDidMount

  componentDidMount() {
    //localStorage.clear();
    //console.log("ELIMINO TOKENS")
  }

  constructor(props) {
    super(props);
    if(props.location.prod!=undefined){
      console.log("STATE EN APP DE MAGIA")
      this.state = {
        mostrar:props.location.prod.mostrarMagia,
        mostrarAnt:props.location.prod.mostrarMagia,
        precio:props.location.prod.precioMagia,
        precioAnt:props.location.prod.precioMagia,
        categoria:props.location.prod.categoriaMagia,
        categoriaAnt:props.location.prod.categoriaMagia,
        lugar:props.location.prod.lugarMagia,
        lugarAnt:props.location.prod.lugarMagia,
        userBorrado: ""
      }
    }
    else if(props.location.usuario!=undefined){
      console.log("STATE EN APP DE BORRAR USUARIO")
      console.log(props.location.usuario.userBorrado)
      this.state = {
        mostrar:0,
        mostrarAnt:"",
        precio:"",
        precioAnt:"",
        categoria:"",
        categoriaAnt:"",
        lugar:"",
        lugarAnt:"",
        userBorrado: props.location.usuario.userBorrado
      }
    }
    else{
      console.log("STATE EN APP DEFECTO")
      this.state = {
        mostrar:0,
        mostrarAnt:"",
        precio:"",
        precioAnt:"",
        categoria:"",
        categoriaAnt:"",
        lugar:"",
        lugarAnt:"",
        userBorrado: ""
      }
    }
    this.ordenacion = this.ordenacion.bind(this);
    this.maximoPrecio = this.maximoPrecio.bind(this);
    this.categoriaSelec = this.categoriaSelec.bind(this);
    this.lugar = this.lugar.bind(this);
  }

  ordenacion(index){
    this.setState({mostrar:index});
  }

  maximoPrecio(numero){
    this.setState({precio:numero});
  }

  categoriaSelec(c){
    this.setState({categoria:c});
  }

  lugar(prov){
    this.setState({lugar:prov})
  }

  render() {
    if((this.state.precio!=this.state.precioAnt) || (this.state.lugar!=this.state.lugarAnt) || (this.state.categoria!=this.state.categoriaAnt) || (this.state.mostrar!=this.state.mostrarAnt)){
      return <Redirect push to={{pathname: `/Magia`,
                                prod:{precioMagia:this.state.precio,
                                      lugarMagia:this.state.lugar,
                                      categoriaMagia:this.state.categoria,
                                      mostrarMagia:this.state.mostrar}}} />;
    }

    let precioAPasar
    if(this.state.precio==""){
      precioAPasar = 0
    }
    else{
      precioAPasar = this.state.precio
    }

    let barra;
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
      barra = <NavLog/>
    }
    else{
      barra = <NavLogReg/>

    }

    return (
      <div className="App">
        {barra}
        <Sidebar callback={this.ordenacion.bind(this)} callback2={this.maximoPrecio.bind(this)} callback3={this.categoriaSelec.bind(this)} callback4={this.lugar.bind(this)} precioText={this.state.precio} lugarText={this.state.lugar} catText={this.state.categoria} ubiText={this.state.lugar}/>
        <div className="App-header">
          <Productos mostrar={this.state.mostrar} precio={precioAPasar} categoria={this.state.categoria} lugar={this.state.lugar} userB={this.state.userBorrado}/>
        </div>
      </div>
    );
  }
}

export default App;
