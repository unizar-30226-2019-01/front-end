import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import bichardo from '../images/bichardo.jpg';
import bixorobar from '../images/bixorobar.jpg';
import bixopolilla from '../images/bixopolilla.jpg';
import { crearFavorito, eliminarFavorito, getFotos } from '../GestionPublicaciones';
import jwt_decode from 'jwt-decode'

import { Route, Switch, Redirect, Link } from 'react-router-dom';

class VistaProductoPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esVenta: true,
      rating: 4,
      fav: this.props.fav,
      id: this.props.id,
      fot: [],
      primeraVez: true
    }; //Para conseguir la valoracion del vendedor

    this.changeRating = this.changeRating.bind(this);
  }

  componentWillReceiveProps(){
    this.setState({primeraVez:true})
  }

  //Esto no vendria aqui pero es un ejemplo de como realizar una valoracion
  changeRating( newRating, name ) {
    this.setState({
      rating: newRating
    });
  }

  getlink() {
    var aux = document.createElement('input');
    aux.setAttribute('value', window.location.href.split('?')[0].split('#')[0]);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    var aviso = document.createElement('div');
    aviso.setAttribute('id', 'aviso');
    aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: gold;border-radius: 8px;font-family: sans-serif;';
    aviso.innerHTML = 'URL copiada';
    document.body.appendChild(aviso);
    document.load = setTimeout('document.body.removeChild(aviso)', 2000);
    document.body.removeChild(aux);
  }

  marcarFavorito(usu,publicacion){
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
        window.alert("Regístrese o inicie sesión si ya posee una cuenta por favor")
    }
    else{
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)

      const fav = {
        usuario: decoded.identity.login
      }
      console.log(usu)
      crearFavorito(fav,publicacion)
      var aviso = document.createElement('div');
      aviso.setAttribute('id', 'aviso');
      aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: gold;border-radius: 8px;font-family: sans-serif;';
      aviso.innerHTML = 'Añadido a FAVORITOS';
      document.body.appendChild(aviso);
      document.load = setTimeout('document.body.removeChild(aviso)', 2000);
    }
  }

  render() {

    console.log("entro")
    if(this.state.primeraVez){
      getFotos(this.props.id).then(data => {
        console.log("HOLA3")
        this.setState({
            fot: [...data],
            primeraVez: false
        },
            () => {
                console.log(this.state.term)
            })
      })
    }

    let contenido
    if (!this.props.fav) {
      contenido = <Button className="mr-sm-4" variant="outline-warning" onClick={() => this.marcarFavorito(this.props.usuario,this.props.id)}>
         FAVORITO
        </Button>
    } else {
      contenido = <Button className="mr-sm-4" variant="outline-warning" onClick={() =>this.props.callback(this.props.indice)}>
          Eliminar
        de FAVORITOS
        </Button>
    }

    let precio
    let horaYFechaSubasta
    if(this.props.fechaLimite==""){
      precio = <h3>Precio: {this.props.precio}</h3>
    }
    else{
      precio = <h3>Precio actual de subasta: {this.props.precio}</h3>
      horaYFechaSubasta = <h3>Fecha y hora límite: {this.props.fechaLimite} a las {this.props.horaLimite}</h3>
    }

    let editarProdOSubs
    if(this.props.fechaLimite==""){
      console.log(this.props.categoria)
      editarProdOSubs = <Link
                          to={{pathname: `/EditarProducto`,
                              prod:{id: this.props.id,
                                    nombre: this.props.nombre,
                                    descripcion: this.props.descripcion,
                                    categoria: this.props.categoria,
                                    precio: this.props.precio}}} >
                      <Button className="mr-sm-4" variant="info" >
                        Editar
                      </Button>
                      </Link>
    }
    else{
      editarProdOSubs = <Link
                          to={{pathname: `/EditarSubasta`,
                              prod:{id: this.props.id,
                                    nombre: this.props.nombre,
                                    descripcion: this.props.descripcion,
                                    categoria: this.props.categoria,
                                    precio: this.props.precio}}} >
                      <Button className="mr-sm-4" variant="info" >
                        Editar
                      </Button>
                      </Link>
    }

    let editarONo
    if(this.props.editable){
      editarONo= <div className="col-md-9 text-right">
                  <ButtonGroup toggle>

                    {contenido}

                    <Button className="mr-sm-4" variant="dark"  onClick={() => this.getlink()}>
                      Copiar URL
                    </Button>

                    <Button className="mr-sm-4" variant="success"> {/*onClick=() => aqui redirigir al chat*/}
                      Abrir chat vendedor
                    </Button>

                    <Button className="mr-sm-4" variant="secondary"> {/*onClick=() => aqui redirigir al chat*/}
                      Hacer oferta
                    </Button>

                    {editarProdOSubs}

                    <Button variant="danger"  onClick={() => this.props.callback(this.props.indice, this.props.fechaLimite)}>
                      Eliminar
                    </Button>
                  </ButtonGroup>
                </div>
    }

    return (
      <Modal
        {...this.props /*si quitas esto no se muestra el producto
        para obtener los parametros que pasa el padre es necesario*/}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title bsPrefix="modal-title w-100 text-center" id="contained-modal-title-vcenter">
           {this.props.nombre /*con el props funciona*/}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Row className="show-grid">
              <Col xs={6}>
                <Button variant="outline-dark"> {/*onClick=() => aqui redirigir al vendedor*/}
                  VENDEDOR: {this.props.vendedor}
                </Button>
              </Col>
              <Col xs={3}>
                  <h6 className="w-100 text-right" id="exampleModalLabel">Valoracion vendedor:</h6>
              </Col>
              <Col xs={3}>
                <div className="w-100 text-left">
                  <StarRatings rating={this.state.rating} changeRating={this.changeRating}
                    starRatedColor="yellow" numberOfStars={5} name='rating'
                    starDimension="20px" starSpacing="5px"
                  />
                </div>
              </Col>
            </Row>
          </Container>

          <Carousel className="row mt-4">
            {this.state.fot.map((foto, index) => (
            <Carousel.Item>
              <img className="d-block w-100" src={foto[0]} width="300" height="500"/>
            </Carousel.Item>
            ))}
          </Carousel>

          <div className="row mt-4">
            <div className="col-md-3">
              {precio}
            </div>
            {editarONo}
          </div>

          <h4>Descripción:</h4>
          <p>
            {this.props.descripcion}
          </p>

          {horaYFechaSubasta}

        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide /* usas la variable onHide q te manda el padre (closeModal)*/} >Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default VistaProductoPerfil
