import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';
import bichardo from '../images/bichardo.jpg';
import bixobasket from '../images/bixobasket.jpg';
import jwt_decode from 'jwt-decode';
import Sidebar from '../components/Sidebar';
import NavLogReg from './NavLogReg';
import Form from 'react-bootstrap/Form';

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
        subastas: [],
        idMostrar: 0,
        indiceMostrar:'',
        nombreMostrar:'',
        vendedorMostrar:'',
        precioMostrar:0,
        descripcionMostrar:'',
        search:"",
        precio:0,
        categoria:"",
        fechaLimite: "",
        horaLimite: "",
        cargar: false
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
                                             descripcionMostrar: productos[2],
                                             fechaLimite: "",
                                             cargar: true,
                                             horaLimite: ""})} >
              Ver producto
            </Button>
          </div> {}
        </div>
        </div>
    );
  };

  renderSubastas = (subastas,index) => {
    const { search } = this.state;

    //si el producto actual no contiene la subcadena buscada no se muestra
    if( search !== "" && subastas[0].toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
        return null
    }
    console.log(this.state.precio)
    if( this.state.precio !== 0 && subastas[4] > this.state.precio){
      return null
    }

    if( this.state.categoria!== "" && subastas[5] !==this.state.categoria){
      return null
    }

    //se llega aquí si contiene la subcadena buscada
    return (
      <div className="card-deck" rows="4" columns="4">
        <div className="card ml-md-4 mr-md-4">
          <img className="card-img-top" src={subastas[8]} />
          <div className="card-body">
            <h5 className="card-title">{subastas[0]}</h5>
            <p className="card-text">{subastas[4]}€</p>
          </div>
          <div className="card-footer"> {}
            <Button
              variant="outline-primary"
              onClick={() => this.setState({ modalShow: true,
                                             id: subastas[1],
                                             indiceMostrar: index,
                                             nombreMostrar: subastas[0],
                                             vendedorMostrar: subastas[3],
                                             precioMostrar: subastas[4],
                                             descripcionMostrar: subastas[2],
                                             fechaLimite: subastas[6],
                                             horaLimite: subastas[7]})} >
              Ver producto
            </Button>
          </div> {}
        </div>
        </div>
    );
  };

  render() {
    let modalClose = () => this.setState({ modalShow: false }); //Para gestionar vistaProducto (guille)

    return(
        <div className="App">
        <NavLogReg/>
        <div className="App-header">
        <div class="container emp-productos">
      
                <div class="row">
                    <div class="col-md-3">
                        <div class="productos-head">
                                    
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Ventas</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Subastas</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">  
                                    <div className="card-deck">
                                      {this.state.productos.map((productos, index) => {
                                          return this.renderProductos(productos,index);
                                      })}
                                      <VistaProducto
                                          fav={true}
                                          show={this.state.modalShow}
                                          id={this.state.id}
                                          cargar={this.state.cargar}
                                          usuario={this.state.usuario}
                                          indice={this.state.indiceMostrar}
                                          nombre={this.state.nombreMostrar}
                                          vendedor={this.state.vendedorMostrar}
                                          precio={this.state.precioMostrar}
                                          descripcion={this.state.descripcionMostrar}
                                          fechaLimite={this.state.fechaLimite}
                                          horaLimite={this.state.horaLimite}
                                          onHide={modalClose /*modalClose pone a false modalShow*/}
                                          callback = {this.eliminarProductoPadre.bind(this)}
                                        />
                                    </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="card-deck">
                                  {this.state.subastas.map((subastas, index) => {
                                    return this.renderSubastas(subastas,index);
                                  })}
                                  <VistaProducto
                                      fav={true}
                                      show={this.state.modalShow}
                                      id={this.state.id}
                                      cargar={this.state.cargar}
                                      usuario={this.state.usuario}
                                      indice={this.state.indiceMostrar}
                                      nombre={this.state.nombreMostrar}
                                      vendedor={this.state.vendedorMostrar}
                                      precio={this.state.precioMostrar}
                                      descripcion={this.state.descripcionMostrar}
                                      fechaLimite={this.state.fechaLimite}
                                      horaLimite={this.state.horaLimite}
                                      onHide={modalClose /*modalClose pone a false modalShow*/}
                                      callback = {this.eliminarProductoPadre.bind(this)}
                                    />
                                   </div>
                            </div>
                        </div>
                    </div>      
        </div>
      </div>
      </div>
    )
  }
}
export default Productos
