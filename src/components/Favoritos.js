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
import { listarVentasFavoritos, listarSubastasFavoritos } from '../GestionPublicaciones';

import { eliminarFavorito } from '../GestionPublicaciones';

class Favoritos extends Component {

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
        fotoMostrar:'',
        precioMostrar:0,
        descripcionMostrar:'',
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

  getAll = (usuario) => {
    listarVentasFavoritos(usuario.login).then(data => {
          this.setState({
              productos: [...data]
          },
              () => {
                  console.log(this.state.term)
              })
      })
      listarSubastasFavoritos(usuario.login).then(data => {
        this.setState({
            subastas: [...data]
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
    this.setState({
      modalShow: false,
      subastas: this.state.subastas.filter((elemento, i)=>{
          return  i!==index
          /*esto lo q hace es recorrer el vector productos,
            y lo modifica eliminando todo aquel que NO cumpla
            la condicion. en este caso, cuando encuentre la posicion
            del elemento index, lo eliminara*/
      })
    });
  }

  renderProductos = (productos,index) => {
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
                                             fotoMostrar: productos[6],
                                             fechaLimite: "",
                                             horaLimite: "",
                                             cargar: true})} >
              Ver producto
            </Button>
          </div> {}
        </div>
        </div>
    );
  };

  renderSubastas = (subastas,index) => {
    return (
      <div className="card-deck" rows="4" columns="4">
        <div className="card ml-md-4 mr-md-4">
          <img className="card-img-top" src={subastas[8]}  width="100" height="170"/>
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
                                             fotoMostrar: subastas[8],
                                             fechaLimite: subastas[6],
                                             horaLimite: subastas[7],
                                             cargar: true})} >
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
                    </div>
                  </div>
                  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div className="card-deck">
                      {this.state.subastas.map((subastas, index) => {
                          return this.renderSubastas(subastas,index);
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <VistaProducto
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
              fotoP={this.state.fotoMostrar}
              onHide={modalClose /*modalClose pone a false modalShow*/}
              callback = {this.eliminarFavoritoPadre.bind(this)}
            />
      </div>
    )
  }
}
export default Favoritos
