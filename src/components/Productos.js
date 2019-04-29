import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';
import bichardo from '../images/bichardo.jpg';
import bixobasket from '../images/bixobasket.jpg';
import jwt_decode from 'jwt-decode';

import VistaProducto from './VistaProducto';
import { getProductos } from '../GestionPublicaciones';

import { eliminarProducto } from '../GestionPublicaciones';

class Productos extends Component {

  constructor(args) {
    super(args)
    this.state = {
        modalShow: false,
        id: '',
        usuario: '',
        productos: []
    };
}

  componentDidMount () {
     console.log("HOLAaaa")
      this.getAll()
  }

  mostrar(){
    this.getAll()
  }

  eliminarProductoPadre(val){
    eliminarProducto(val)
    this.setState({
      modalShow: false
    });
    this.mostrar()
  }


  getAll = () => {
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

  render() {
    let modalClose = () => this.setState({ modalShow: false }); //Para gestionar vistaProducto (guille)

    return(
      <div className="card-deck">
        {this.state.productos.map((productos, index) => (
        <div className="card-deck" rows="4" columns="4">
          <div className="card ml-md-4 mr-md-4">
            <img className="card-img-top" src={bichardo} />
            <div className="card-body">
              <h5 className="card-title">{productos[0]}</h5>
              <p className="card-text">Vendedor: {productos[3]}</p>
            </div>
            <div className="card-footer"> {/*Para gestionar vistaProducto (guille)*/}
              <Button variant="outline-primary" onClick={() => this.setState({ modalShow: true })} >
                Ver producto
              </Button>
              <VistaProducto producto={productos} i={index} show={this.state.modalShow} onHide={modalClose /*modalClose pone a false modalShow*/} callback = {this.eliminarProductoPadre.bind(this)}/>
            </div> {/* Fin para gestionar vistaProducto (guille)*/}
          </div>
          </div>
        ))}
      </div>
    )
  }
}
export default Productos
