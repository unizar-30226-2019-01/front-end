import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import { crearFavorito, eliminarFavorito, getFotos, realizarOferta, realizarOfertaSubasta, tipoProducto, consultarFavorito } from '../GestionPublicaciones';
import jwt_decode from 'jwt-decode'
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import Report from './Report';

class VistaProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      esVenta: true,
      rating: 4,
      fav: "Favorito no existe",
      id: this.props.id,
      fotos:this.props.fotoP,
      fot: [],
      primeraVez: true,
      precioOferta: ''
    }; //Para conseguir la valoracion del vendedor

    this.onChange = this.onChange.bind(this)
    //this.changeRating = this.changeRating.bind(this);
  }

  componentWillReceiveProps(){
    this.setState({primeraVez:true})
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

/*
  //Esto no vendria aqui pero es un ejemplo de como realizar una valoracion
  changeRating( newRating, name ) {
    this.setState({
      rating: newRating
    });
  }
*/

  getlink(id) {
    var aux = document.createElement('input');
    aux.setAttribute('value', "http://localhost:3000/producto?id=" + id);
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
        window.alert("Regístrese o inicie sesión si ya posee una cuenta, por favor.")
    }
    else{
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)

      const fav = {
        usuario: decoded.identity.login
      }
      console.log(usu)
      crearFavorito(fav,publicacion)
      this.setState({fav: "Favorito existe"});
      var aviso = document.createElement('div');
      aviso.setAttribute('id', 'aviso');
      aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: gold;border-radius: 8px;font-family: sans-serif;';
      aviso.innerHTML = 'Añadido a FAVORITOS';
      document.body.appendChild(aviso);
      document.load = setTimeout('document.body.removeChild(aviso)', 2000);
    }
  }

  desmarcarFavorito(){
      this.setState({fav: "Favorito no existe"});
      this.props.callback(this.props.indice)
  }

  esFavorito(usu,publicacion){
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
        this.setState({fav: "Favorito no existe"});
    }
    else{
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)

      const fav = {
        usuario: decoded.identity.login
      }
      console.log(usu)
      consultarFavorito(fav,publicacion).then(data => {
        this.setState({
            fav: data
        })
      })
    }
  }

  ofertar(precio) {
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
        window.alert("Regístrese o inicie sesión si ya posee una cuenta por favor")
    }
    else{
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)

      realizarOferta(decoded.identity.login,this.props.id,precio).then(res => {
				if(res=="Error"){
          var aviso = document.createElement('div');
          aviso.setAttribute('id', 'aviso');
          aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: red;border-radius: 8px;color:white; font-family: sans-serif;';
          aviso.innerHTML = 'Precio inferior al producto';
          document.body.appendChild(aviso);
          document.load = setTimeout('document.body.removeChild(aviso)', 2000);
        }
        else if(res=="Realizada"){
          var aviso = document.createElement('div');
          aviso.setAttribute('id', 'aviso');
          aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: red;border-radius: 8px;color:white; font-family: sans-serif;';
          aviso.innerHTML = 'Ya has realizado una oferta, espere a ser aceptada';
          document.body.appendChild(aviso);
          document.load = setTimeout('document.body.removeChild(aviso)', 2000);
        }
        else{
          var aviso = document.createElement('div');
          aviso.setAttribute('id', 'aviso');
          aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: limegreen;border-radius: 8px;color:white; font-family: sans-serif;';
          aviso.innerHTML = 'Oferta realizada';
          document.body.appendChild(aviso);
          document.load = setTimeout('document.body.removeChild(aviso)', 2000);
        }
			})
      this.setState({
        precioOferta: ''
      });
    }
  }

  ofertarSubasta(precio) {
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
        window.alert("Regístrese o inicie sesión si ya posee una cuenta por favor")
    }
    else{
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)

      //console.log(this.prop.id)
      realizarOfertaSubasta(decoded.identity.login,this.props.id,precio).then(res=> {
        if(res=="ERROR"){
          var aviso = document.createElement('div');
          aviso.setAttribute('id', 'aviso');
          aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: red;border-radius: 8px;color:white; font-family: sans-serif;';
          aviso.innerHTML = 'La puja debe superar el precio actual';
          document.body.appendChild(aviso);
          document.load = setTimeout('document.body.removeChild(aviso)', 2000);
        }
        else{
          var aviso = document.createElement('div');
          aviso.setAttribute('id', 'aviso');
          aviso.style.cssText = 'position:fixed; z-index: 9999999; top: 50%;left:50%;margin-left: -70px;padding: 20px; background: limegreen;border-radius: 8px;color:white; font-family: sans-serif;';
          aviso.innerHTML = 'Puja realizada';
          document.body.appendChild(aviso);
          document.load = setTimeout('document.body.removeChild(aviso)', 2000);
        }
      })

      this.setState({
        precioOferta: ''
      });
    }
  }

  registrese(){
  	window.alert("Regístrese o inicie sesión si ya posee una cuenta, por favor.")
  }

  render() {
    let fotosMostrar=[[]]
    let contenido
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

        this.esFavorito(this.props.usuario,this.props.id)
      }
      Array.prototype.push.apply(fotosMostrar, this.state.fot);

    }

    if (this.state.fav=="Favorito no existe") {
      contenido = <Button className="mr-sm-4" variant="outline-warning" onClick={() => this.marcarFavorito(this.props.usuario,this.props.id)}>
         FAVORITO
        </Button>
    }
    else if(this.state.fav=="Favorito existe"){
      contenido = <Button className="mr-sm-4" variant="warning" onClick={() => this.desmarcarFavorito()}>
          Eliminar
        de FAVORITOS
        </Button>
    }

    let precio
    let horaYFechaSubasta
    if(this.props.fechaLimite==""){
      precio = <h3>Precio: {this.props.precio}€</h3>
    }
    else{
      precio = <h3>Precio actual: {this.props.precio}€</h3>
      horaYFechaSubasta =
      <div><h3>Fecha límite: {this.props.fechaLimite}</h3>
      <h3>Hora límite:  {this.props.horaLimite}</h3></div>
    }

    let chatYoferta
    let botonReportar
    let botonPerfil
    if (localStorage.getItem('usertoken') !== undefined && localStorage.getItem('usertoken') !== null) {
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      if (this.props.vendedor != decoded.identity.login){   // Si user != vendedor
          if(this.props.fechaLimite==""){   // Si es compra normal
             chatYoferta =
             			<div>
                     <ButtonGroup aria-label="Basic example">
             			<Link to={{
                      	pathname:'/chat',
                      	datos:{
                      		vendedor:this.props.vendedor,
                      		articulo:this.props.nombre
                      	}
                      }}>
      	                <Button className="mr-sm-4" variant="success">
      	                  Chat con vendedor
      	                </Button>
                      </Link>
                      <Form.Group controlId="s">
                        <Form.Control type="number" placeholder="Precio"
                        name="precioOferta" min="1" step="any"
                        value={this.state.precioOferta}
                        onChange={this.onChange} />
                      </Form.Group>

                      <Button className="mr-sm-4" pro variant="secondary" onClick={() => this.ofertar(this.state.precioOferta)}>
                        Hacer oferta
                      </Button>
                      </ButtonGroup>
                      </div>
                    botonPerfil=
                      <div>
                        <Link to={{
                          pathname:'/VerPerfil',
                          datos:{
                            vendedor:this.props.vendedor  
                          }
                        }}>
                        <Button variant="outline-dark">
                          VENDEDOR: {this.props.vendedor}
                        </Button>
                        </Link>
                      </div>

                    botonReportar=
                      <div>
                        <Link to={{
                          pathname:'/Report',
                          datos:{
                            denunciante: decoded.identity.login,
                            passDenunciante:  decoded.identity.password,
                            vendedor:this.props.vendedor,
                            articulo:this.props.nombre
                          }
                        }}>
                          <Button className="ml-sm-4" variant="danger">
                            Reportar vendedor
                          </Button>
                        </Link>
                      </div>
                }
                else{   //Si es subasta
                  chatYoferta =
                       <div>
                          <ButtonGroup aria-label="Basic example">
                       <Link to={{
                             pathname:'/chat',
                             datos:{
                               vendedor:this.props.vendedor,
                               articulo:this.props.nombre
                             }
                           }}>
                             <Button className="mr-sm-4" variant="success">
                               Chat con vendedor
                             </Button>
                           </Link>
                           <Form.Group controlId="s">
                             <Form.Control type="number" placeholder="Precio"
                             name="precioOferta" min="1" step="any"
                             value={this.state.precioOferta}
                             onChange={this.onChange} />
                           </Form.Group>

                           <Button className="mr-sm-4" pro variant="secondary" onClick={() => this.ofertarSubasta(this.state.precioOferta)}>
                             Hacer puja
                           </Button>
                           </ButtonGroup>
                        </div>

                      botonPerfil=
                        <div>
                          <Link to={{
                            pathname:'/VerPerfil',
                            datos:{
                              vendedor:this.props.vendedor  
                            }
                          }}>
                          <Button variant="outline-dark">
                            VENDEDOR: {this.props.vendedor}
                          </Button>
                          </Link>
                        </div>
                  
                    botonReportar=
                        <div>
                          <Link to={{
                            pathname:'/Report',
                            datos:{
                              denunciante: decoded.identity.login,
                              passDenunciante:  decoded.identity.password,
                              vendedor:this.props.vendedor,
                              articulo:this.props.nombre
                            }
                          }}>
                            <Button className="ml-sm-4" variant="danger">
                              Reportar vendedor
                            </Button>
                          </Link>
                        </div>
          }
      }
      else{ //Si estas mirando un producto tuyo: 'ver perfil' redirige a tu pantalla de gestion del perfil
        botonPerfil=
          <div>
            <Link to={{
              pathname:'/Perfil',
              datos:{
                vendedor:this.props.vendedor  
              }
            }}>
            <Button variant="outline-dark">
              VENDEDOR: {this.props.vendedor}
            </Button>
            </Link>
          </div>
      }
    }
    else{
      //No estas logueado
      console.log("no log")
       chatYoferta =
       			<div>
	            <Button className="mr-sm-4" variant="success" onClick={() => this.registrese()}>
	              Chat con vendedor
	            </Button>
                <Button className="mr-sm-4" variant="secondary" onClick={() => this.registrese()}>
                  Hacer oferta
                </Button>
                </div>

              botonPerfil=
                <div>
                  <Link to={{
                    pathname:'/VerPerfil',
                    datos:{
                      vendedor:this.props.vendedor  
                    }
                  }}>
                  <Button variant="outline-dark">
                    VENDEDOR: {this.props.vendedor}
                  </Button>
                  </Link>
                </div>

        botonReportar=
            <div>
              <Button className="mr-sm-4" variant="danger" onClick={() => this.registrese()}>
                Reportar vendedor
              </Button>
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
              <ButtonGroup aria-label="Basic example">

                {botonPerfil}
                {botonReportar}
                
                </ButtonGroup>

              </Col>
              <Col xs={3}>
                  <h6 className="w-100 text-right" id="exampleModalLabel">Valoracion vendedor:</h6>
              </Col>
              <Col xs={3}>
                <div className="w-100 text-left">
                  <StarRatings 
                    //changeRating={this.changeRating}
                    //rating={this.state.rating} 
                    
                    starRatedColor="yellow" 
                    numberOfStars={5}
                    starDimension="20px" 
                    starSpacing="5px"

                    //name='rating'
                    //id='rating'
                    value={this.state.rating}
                    onChange={this.onChange}

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
            <div className="col-md-9 text-right">
              <ButtonGroup toggle>

                {contenido}

                <Button className="mr-sm-4" variant="dark"  onClick={() => this.getlink(this.props.id)}>
                  Copiar URL
                </Button>

                {chatYoferta}

              </ButtonGroup>
            </div>
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

export default VistaProducto
