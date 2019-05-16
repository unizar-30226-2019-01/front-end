import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';
import bichardo from '../images/bichardo.jpg';
import bixobasket from '../images/bixobasket.jpg';
import jwt_decode from 'jwt-decode';
import Sidebar from '../components/Sidebar';
import NavLogReg from './NavLogReg';

import VistaProducto from './VistaProducto';
import { listarVentasFavoritos } from '../GestionPublicaciones';

import { eliminarProducto, eliminarFavorito } from '../GestionPublicaciones';

class Productos extends Component {

  constructor(props) {
    super(props)
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
        descripcionMostrar:''
    };
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
        const usuario = {
            login: decoded.identity.login
        }
        this.getAll(usuario)
    }
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


  getAll = (usuario) => {
    listarVentasFavoritos(usuario.login).then(data => {
          console.log("HOLA2")
          this.setState({
              productos: [...data]
          },
              () => {
                  console.log(this.state.term)
              })
      })
  }

  eliminarFavoritoPadre(index){
    const fav = {
        usuario: this.state.usuario
      }
    eliminarFavorito(fav,this.state.id)
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

  render() {
    let modalClose = () => this.setState({ modalShow: false }); //Para gestionar vistaProducto (guille)

    return(
        <div className="App">
        <NavLogReg/>
        <Sidebar/>
        <div className="App-header">
      <div className="card-deck">
        {this.state.productos.map((productos, index) => (
        <div className="card-deck" rows="4" columns="4">
          <div className="card ml-md-4 mr-md-4">
            <img className="card-img-top" src={productos[6]} />
            <div className="card-body">
              <h5 className="card-title">{productos[0]}</h5>
              <p className="card-text">Vendedor: {productos[3]}</p>
            </div>
            <div className="card-footer"> {/*Para gestionar vistaProducto (guille)*/}
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
            </div> {/* Fin para gestionar vistaProducto (guille)*/}
          </div>
          </div>
        ))}
        <VistaProducto
          show={this.state.modalShow}
          fav={true}
          id={this.state.id}
          usuario={this.state.usuario}
          indice={this.state.indiceMostrar}
          nombre={this.state.nombreMostrar}
          vendedor={this.state.vendedorMostrar}
          precio={this.state.precioMostrar}
          descripcion={this.state.descripcionMostrar}
          onHide={modalClose /*modalClose pone a false modalShow*/}
          callback = {this.eliminarFavoritoPadre.bind(this)}
        />
      </div>
      </div>
      </div>
    )
  }
}
export default Productos
