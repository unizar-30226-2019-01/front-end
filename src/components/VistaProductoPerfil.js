import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import { getFotos } from '../GestionPublicaciones';
import jwt_decode from 'jwt-decode'

import { Route, Switch, Redirect, Link } from 'react-router-dom';

class VistaProductoPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esVenta: true,
      rating: 4,
      id: this.props.id,
      fotos:this.props.fotoP,
      fot: [],
      primeraVez: true,
      primeraVezURL: true,
      redirige:false
    };

    //this.changeRating = this.changeRating.bind(this);
  }

  componentWillReceiveProps(){
    this.setState({primeraVez:true})
  }

  /*
  //Esto no vendria aqui pero es un ejemplo de como realizar una valoracion
  changeRating( newRating, name ) {
    this.setState({
      rating: newRating
    });
  }
  */

  comprobacionEliminar(){
    if(window.confirm("¿Estás seguro?")){
      if(this.props.fechaLimite==""){
        this.props.callback(this.props.indice, this.props.fechaLimite, 0, 0)
      }
      else{
        var day = new Date();
        var dd = day.getDate();
        var mm = day.getMonth()+1;
        var yy = day.getFullYear();
        var fecha = yy+'-'+mm+'-'+dd
        var separador="-",
            fechaHoy=fecha.split(separador),
            fechaL=(this.props.fechaLimite).split(separador);
        if(fechaHoy[1].length==1){
          fechaHoy[1]= "0"+fechaHoy[1]
        }
        if(fechaHoy[2].length==1){
          fechaHoy[2]= "0"+fechaHoy[2]
        }
        //var fechaHoyD=fechaHoy[0]+fechaHoy[1]+fechaHoy[2];
        //var fechaLD=fechaL[0]+fechaL[1]+fechaL[2];

        this.props.callback(this.props.indice, this.props.fechaLimite, fechaHoy, fechaL)
      }
    }
  }
  getlink(id) {
    var aux = document.createElement('input');
    aux.setAttribute('value', "http://52.151.88.18:8080/producto?id=" + id);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
    if(this.state.primeraVezURL){
      this.setState({ primeraVezURL: false });
      var aviso = document.createElement('div');
      aviso.setAttribute('id', 'aviso');
      aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: gold;border-radius: 8px;font-family: sans-serif;';
      aviso.innerHTML = 'URL copiada';
      document.body.appendChild(aviso);
      document.load = setTimeout('document.body.removeChild(aviso)', 2000);
      setTimeout(() => {this.setState({ primeraVezURL: true });}, 1980);
    }
  }

  render() {

    if(this.state.redirige){
      return <Redirect push to="/Perfil" />;
    }

    let fotosMostrar=[[]]
    if(this.props.show){
      fotosMostrar=[[this.props.fotoP]]
      if(this.state.primeraVez){
        getFotos(this.props.id).then(data => {
          this.setState({
              fot: [...data],
              primeraVez: false
          },
              () => {
                  console.log(this.state.term)
              })
        })
      }
      Array.prototype.push.apply(fotosMostrar, this.state.fot);
    }

    let precio
    let horaYFechaSubasta
    if(this.props.fechaLimite==""){
      precio = <h3>Precio: {this.props.precio}€</h3>
    }
    else{
      precio = <h3>Puja actual: {this.props.precio}€</h3>
      horaYFechaSubasta =
      <div><h3>Fecha límite: {this.props.fechaLimite}</h3>
      <h3>Hora límite:  {this.props.horaLimite}</h3></div>
    }

    let editarProdOSubs
    if(this.props.fechaLimite==""){
      editarProdOSubs = <Link
                          to={{pathname: `/EditarProducto`,
                              prod:{id: this.props.id,
                                    nombre: this.props.nombre,
                                    descripcion: this.props.descripcion,
                                    categoria: this.props.categoria,
                                    precio: this.props.precio,
                                    fotos: fotosMostrar}}} >
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
                                    fotos: fotosMostrar,
                                    fechaLimite: this.props.fechaLimite}}} >
                      <Button className="mr-sm-4" variant="info" >
                        Editar
                      </Button>
                      </Link>
    }

    let editarONo
    if(this.props.editable){
      if(this.props.fechaLimite==""){
        editarONo= <div className="col-md-9 text-right">
        <ButtonGroup toggle>

          <Button className="mr-sm-4" variant="dark"  onClick={() => this.getlink(this.props.id)}>
            Copiar URL
          </Button>

          <Link
                to={{pathname: `/ofertas`,
                    prod:{id: this.props.id}}} >
            <Button className="mr-sm-4" variant="success" >
              Ver ofertas
            </Button>
            </Link>

          {editarProdOSubs}

          <Button variant="danger"  onClick={() => this.comprobacionEliminar()}>
            Eliminar
          </Button>
        </ButtonGroup>
      </div>
      }
      else{
        editarONo= <div className="col-md-9 text-right">
        <ButtonGroup toggle>

          <Button className="mr-sm-4" variant="dark"  onClick={() => this.getlink(this.props.id)}>
            Copiar URL
          </Button>

          {editarProdOSubs}

          <Button variant="danger"  onClick={() => this.comprobacionEliminar()}>
            Eliminar
          </Button>
        </ButtonGroup>
      </div>
      }

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

                <StarRatings
                  starRatedColor="gold"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="5px"
                  rating={this.props.valoracion}
                />

                </div>
              </Col>
            </Row>
          </Container>

          <Carousel className="row mt-4">
            {fotosMostrar.map((foto, index) => (
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
          <Button onClick={this.props.onHide /* usas la variable onHide q te manda el padre (closeModal)*/} >Cerrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default VistaProductoPerfil
