import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';
import bichardo from '../images/bichardo.jpg';
import bixobasket from '../images/bixobasket.jpg';
import jwt_decode from 'jwt-decode';

import VistaProducto from './VistaProducto';
import { getProductos } from '../GestionPublicaciones';
import { getProductosMayorMenor } from '../GestionPublicaciones';
import { getProductosMenorMayor } from '../GestionPublicaciones';

import { eliminarProducto } from '../GestionPublicaciones';

import {Input} from "mdbreact"; //npm install mdbreact
import Form from 'react-bootstrap/Form';


class Productos extends Component {

  constructor(args) {
    super(args)
    this.state = {
        modalShow: false,
        id: '',
        usuario: '',
        productos: [],
        idMostrar: 0,
        indiceMostrar:'',
        nombreMostrar:'',
        vendedorMostrar:'',
        precioMostrar:0,
        descripcionMostrar:'',
        search:"",
        precio:0,
        categoria:""

    };
    this.renderProductos = this.renderProductos.bind(this);
}

  componentDidMount () {
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
      console.log("no existe")
      console.log(this.state.usuario)
    }
    else{
      console.log("existe")
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      this.setState({
        usuario: decoded.identity.login
      })
    }
    this.getAll()
  }

  componentWillReceiveProps (){
      this.getAll()
      this.setState({precio:this.props.precio});
      this.setState({categoria:this.props.categoria})
  }

  eliminarProductoPadre(index){
    eliminarProducto(this.state.id)
    this.setState({
      modalShow: false,
      productos: this.state.productos.filter((elemento, i)=>{
          return  i!==index
          /*esto lo q hace es recorrer el vector productos,
            y lo modifica eliminando todo aquel que NO cumpla
            la condicion. en este caso, cuando encuentre la posicion
            del elemento index, lo eliminara*/
      })
    });
  }

  onChange = e => {
    this.setState({ search: e.target.value });
  };

  renderProductos = (productos,index) => {
    const { search } = this.state;

    //si el producto actual no contiene la subcadena buscada no se muestra
    if( search !== "" && productos[0].toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
        return null
    }
    if( this.state.precio !== 0 && productos[4] > this.state.precio){
      return null
    }

    if( this.state.categoria!== "" && productos[5] !==this.state.categoria){
      return null
    }

    //se llega aquí si contiene la subcadena buscada
    return (
      <div className="card-deck" rows="4" columns="4">
        <div className="card ml-md-4 mr-md-4">
          <img className="card-img-top" src={productos[6]} width="100" height="170" />
          <div className="card-body">
            <h5 className="card-title">{productos[0]}</h5>
            <p className="card-text">{productos[4]}€</p>
          </div>
          <div className="card-footer"> {}
            <Button
              variant="outline-primary"
              onClick={() => this.setState({ modalShow: true,
                                             id: productos[1],
                                             indiceMostrar: index,
                                             nombreMostrar: productos[0],
                                             vendedorMostrar: productos[3],
                                             precioMostrar: productos[4],
                                             descripcionMostrar: productos[2]})} >
              Ver producto
            </Button>
          </div> {}
        </div>
        </div>
    );
  };

  getAll = () => {
      if(this.props.mostrar==0){
        getProductos().then(data => {
            console.log("HOLA2")
            this.setState({
                productos: [...data]
            },
                () => {
                    console.log(this.state.term)
                })
        })
      }
      else if(this.props.mostrar==1){
        getProductosMayorMenor().then(data => {
            console.log("HOLA2")
            this.setState({
                productos: [...data]
            },
                () => {
                    console.log(this.state.term)
                })
        })
      }
      else if(this.props.mostrar==2){
        getProductosMenorMayor().then(data => {
            console.log("HOLA2")
            this.setState({
                productos: [...data]
            },
                () => {
                    console.log(this.state.term)
                })
        })
      }
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false }); //Para gestionar vistaProducto (guille)

    return(
      
      <div className="card-deck">
      <Form.Control className="xd"
        placeholder="Buscar producto"
        name="nombre"
        onChange={this.onChange} />

      {this.state.productos.map((productos, index) => {
        return this.renderProductos(productos,index);
      })}

        <VistaProducto
          fav={false}
          show={this.state.modalShow}
          id={this.state.id}
          usuario={this.state.usuario}
          indice={this.state.indiceMostrar}
          nombre={this.state.nombreMostrar}
          vendedor={this.state.vendedorMostrar}
          precio={this.state.precioMostrar}
          descripcion={this.state.descripcionMostrar}
          onHide={modalClose /*modalClose pone a false modalShow*/}
          callback = {this.eliminarProductoPadre.bind(this)}
        />
      </div>
    )
  }
}
export default Productos
