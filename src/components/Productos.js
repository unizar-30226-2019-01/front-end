import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import logo from '../images/logo.png';
import bichardo from '../images/bichardo.jpg';
import bixobasket from '../images/bixobasket.jpg';
import jwt_decode from 'jwt-decode';
import '../css/App.css';

import VistaProducto from './VistaProducto';
import { getProductos } from '../GestionPublicaciones';
import { getProductosMayorMenor } from '../GestionPublicaciones';
import { getProductosMenorMayor } from '../GestionPublicaciones';
import { getSubastas } from '../GestionPublicaciones';
import { getSubastasMayorMenor } from '../GestionPublicaciones';
import { getSubastasMenorMayor } from '../GestionPublicaciones';

import { eliminarFavorito, getFotos } from '../GestionPublicaciones';

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
        subastas: [],
        idMostrar: 0,
        indiceMostrar:'',
        nombreMostrar:'',
        vendedorMostrar:'',
        precioMostrar:0,
        descripcionMostrar:'',
        fotoMostrar:'',
        search:"",
        precio:0,
        categoria:"",
        fechaLimite: "",
        horaLimite: "",
        cargar: false,
        lugar: ""

    };
    this.renderProductos = this.renderProductos.bind(this);
    this.renderSubastas = this.renderSubastas.bind(this);
}

  componentDidMount () {
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
      console.log("no existe")
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
      this.setState({lugar:this.props.lugar})
  }

  eliminarFavoritoPadre(index){
    const fav = {
        usuario: this.state.usuario
    }
    eliminarFavorito(fav,this.state.id)
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
    if(this.state.precio !== 0 && this.state.precio<1000 && productos[4] > this.state.precio){
      return null
    }

    if( this.state.categoria!== "" && productos[5] !==this.state.categoria){
      return null
    }

    if( this.state.lugar!== "" && productos[7] !==this.state.lugar){
      return null
    }

    //se llega aquí si contiene la subcadena buscada
    return (
      <div className="card-deck" rows="4" columns="4">
        <div className="card ml-md-4 mr-md-4">
          <img className="card-img-top" src={productos[6]} width="150" height="170" />
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
    const { search } = this.state;

    //si el producto actual no contiene la subcadena buscada no se muestra
    if( search !== "" && subastas[0].toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
        return null
    }
    if( this.state.precio !== 0 && (subastas[4] > this.state.precio)){
      return null
    }

    if( this.state.categoria!== "" && subastas[5] !==this.state.categoria){
      return null
    }

    if( this.state.lugar!== "" && subastas[9] !==this.state.lugar){
      return null
    }


    //se llega aquí si contiene la subcadena buscada
    return (
      <div className="card-deck" rows="4" columns="4">
        <div className="card ml-md-4 mr-md-4">
          <img className="card-img-top" src={subastas[8]}  width="150" height="170"/>
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

        getSubastas().then(data => {
            this.setState({
                subastas: [...data]
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

        getSubastasMayorMenor().then(data => {
            console.log("HOLA2")
            this.setState({
                subastas: [...data]
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

        getSubastasMenorMayor().then(data => {
            console.log("HOLA2")
            this.setState({
                subastas: [...data]
            },
                () => {
                    console.log(this.state.term)
                })
        })
      }
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false,
                                            cargar: false }); //Para gestionar vistaProducto (guille)

    return(
      <div class="container emp-productos">
        <Form.Control className="xd"
          placeholder="Buscar producto"
          name="nombre"
          onChange={this.onChange} />

            <form method="post">
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
            </form>
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
export default Productos
