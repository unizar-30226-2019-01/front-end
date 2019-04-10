import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';
import bichardo from '../images/bichardo.jpg';
import bixobasket from '../images/bixobasket.jpg';

import VistaProducto from './VistaProducto';


class Productos extends Component {

  constructor(args) {
    super(args);
    this.state = { modalShow: false }; //Para gestionar vistaProducto (guille)
  }

  handleClick() {
    alert("hola que tal");
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false }); //Para gestionar vistaProducto (guille)

    return(

      <div className="card-deck" rows="4" columns="4">
      <div className="card">
        <img className="card-img-top" src={bichardo} />
        <div className="card-body">
          <h5 className="card-title">BICHO MOTIVADO</h5>
          <p className="card-text">Ez un jugador de furgol que lo está petando</p>
        </div>
        <div className="card-footer"> {/*Para gestionar vistaProducto (guille)*/}
          <Button variant="outline-primary" onClick={() => this.setState({ modalShow: true })} >
            Ver producto
          </Button>
          <VistaProducto show={this.state.modalShow} onHide={modalClose /*modalClose pone a false modalShow*/} />
        </div> {/* Fin para gestionar vistaProducto (guille)*/}
      </div>
      <div className="card">
        <img className="card-img-top" src={bixobasket} alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title"> </h5>
          <p className="card-text">Cristiano Ronaldo Shows Off Basketball Skills at Real Madrid Training</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      <div className="card">
        <img className="card-img-top" src="..." alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      <div className="card">
        <img className="card-img-top" src="..." alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>

    </div>


    )
  }
}
export default Productos
