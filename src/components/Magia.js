import React, { Component } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';


class Magia extends Component{

  constructor(props) {
    super(props);
    if(props.location.prod==undefined){
      this.state = {
        funsionaPorfa:false,
        precio:'',
        lugar:'',
        categoria:'',
        mostrar:''
      }
    }
    else{
      this.state = {
        funsionaPorfa:true,
        precio:props.location.prod.precioMagia,
        lugar:props.location.prod.lugarMagia,
        categoria:props.location.prod.categoriaMagia,
        mostrar:props.location.prod.mostrarMagia,
      }
    }
  }

  render() {
    if(this.state.funsionaPorfa){
      return <Redirect push to={{pathname: `/`,
                                prod:{precioMagia:this.state.precio,
                                      lugarMagia:this.state.lugar,
                                      categoriaMagia:this.state.categoria,
                                      mostrarMagia:this.state.mostrar}}} />;
    }
    else{
      return <Redirect push to="/" />;
    }
    return (
      <h5>dioss</h5>
    );
  }
}

export default Magia;
