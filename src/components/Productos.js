import React, { Component } from 'react';
import logo from './logo.png';
import coche from './coche.jpeg'


class Productos extends Component {

  handleClick() {
    alert("hola que tal");
  }

  render() {
    return(
      <div class="card-deck">
      <div class="card">
        <img class="card-img-top" src={coche} />
        <div class="card-body">
          <h5 class="card-title">BICHO MOTIVADO</h5>
          <p class="card-text">Vendo SEAT Ibiza</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">3 RUPIAS</small>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="..." alt="Card image cap"/>
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated 3 mins ago</small>
        </div>
      </div>
    </div>

    )
  }
}
export default Productos
