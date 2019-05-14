import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavLogReg from './NavLogReg';
import { actualizarProducto } from '../GestionPublicaciones';
import { Route, Switch, Redirect } from 'react-router-dom';

class EditarProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venta: true,
      id: props.location.prod.id,
      nombre: props.location.prod.nombre,
      fecha: '',
	    lugar: '',
	    categoria: props.location.prod.categoria,
      descripcion: props.location.prod.descripcion,
      vendedor: '',
      precio: props.location.prod.precio
    }

    console.log(props.location.prod.id)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    var day = new Date();
    var dd = day.getDate();
    var mm = day.getMonth();
    var yy = day.getFullYear();

    var fecha = dd+'/'+mm+'/'+yy

    const producto = {
      nombre: this.state.nombre,
      id: this.state.id,
      fecha: fecha,
      categoria: this.state.categoria,
      descripcion: this.state.descripcion,
      vendedor: this.state.vendedor,
      precio: this.state.precio,
      foto: this.state.foto
    }
    console.log(this.state.id)
    actualizarProducto(producto)
    this.setState({redirect: true});
  }

  changeVentSubst (valor) {
    this.setState((prevState, props) => {
      return {venta: valor}
    })
  }



  render(){
    if (this.state.redirect){
      return <Redirect push to="/" />;
    }
    let contenido
    if (this.state.venta) {
      contenido = <Form.Group controlId="productPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control placeholder="Introduzca precio"
                    name="precio"
										value={this.state.precio}
										onChange={this.onChange} />
                  </Form.Group>
    } else {
      contenido = <Form>
                  <Form.Group controlId="productPriceSub">
                    <Form.Label>Precio de salida</Form.Label>
                    <Form.Control placeholder="Introduzca precio"
                    	value={this.state.precio}
                      onChange={this.onChange} />
                  </Form.Group>
                  <Form.Group controlId="fechaLimite">
                      <Form.Label>Fecha límite</Form.Label>
                      <Form.Control type="Date" />
                  </Form.Group>
                  <Form.Group controlId="horaLimite">
                      <Form.Label>Hora límite</Form.Label>
                      <Form.Control type="Time" />
                  </Form.Group>
                  </Form>
    }

    return(
      <div>
        <NavLogReg/>
        <Container>
        <br />
          <Row>
            <div className="w-100 text-center">
              <h1>Editar Producto</h1>
            </div>
          </Row>
          <Row className="show-grid">
            <Col xs={3} />
            <Col xs={6}>
              <Form noValidate onSubmit={this.onSubmit}>
                <Form.Group controlId="productName">
                  <Form.Control
                  placeholder="Nombre"
                  name="nombre"
										value={this.state.nombre}
										onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="productDescription">
                  <Form.Control as="textarea" rows="5" placeholder="Descripcion"
                  name="descripcion"
                  value={this.state.descripcion}
                  onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="categoryProduct">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control as="select"
                  name="categoria"
                  value={this.state.categoria}
                  onChange={this.onChange}>
                  <option>Elegir...</option>
                  <option>Coches</option>
                  <option>Electrónica</option>
                  <option>Telefonía</option>
                  <option>Deporte</option>
                  <option>Inmobiliaria</option>
                  <option>Motos</option>
                  <option>Bicicletas</option>
                  <option>Videojuegos</option>
                  <option>Hogar</option>
                  <option>Moda</option>
                  <option>Electrodomésticos</option>
                  <option>Libros y Música</option>
                  <option>Niños</option>
                  <option>Empleo</option>
                  <option>Construcción</option>
                  <option>Coleccionismo</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="photoProduct">
                  <Form.Label>Foto</Form.Label>
                  <Form.Control type="file"
                  name="foto"
                  value={this.state.foto}
                  onChange={this.onChange}>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label> Tipo </Form.Label>
                  <Form.Check
                    type="radio"
                    label="Venta"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    onClick={this.changeVentSubst.bind(this, true)}
                  />
                  <Form.Check
                    type="radio"
                    label="Subasta"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    onClick={this.changeVentSubst.bind(this, false)}
                  />
                </Form.Group>
                {contenido}
                <Button type="submit">Editar</Button>
              </Form>
            </Col>
            <Col xs={3} />
          </Row>
        </Container>
      </div>
    )
  }
}
export default EditarProducto
