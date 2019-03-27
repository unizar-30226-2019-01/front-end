import React, { Component } from 'react';
import logo from './logo.png';
import bichardo from './bichardo.jpg'


class Productos extends Component {

  handleClick() {
    alert("hola que tal");
  }

  render() {
    return(
      <div className="card-deck">
      <div className="card">
        <img className="card-img-top" src={bichardo} />
        <div className="card-body">
          <h5 className="card-title">BICHO MOTIVADO</h5>
          <p className="card-text">Ez un jugador de furgol que lo está petando</p>
        </div>
        <div className="card-footer">
          <small className="text-muted">3 RUPIAS</small>
        </div>
      </div>
      <div className="card">
        <img className="card-img-top" src="..." alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
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
