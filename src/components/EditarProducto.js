import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { actualizarProducto } from '../GestionPublicaciones';
import { Route, Switch, Redirect } from 'react-router-dom';

class EditarProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      producto: this.props.params,
      id: '',
      nombre: '',
      fecha: '',
	    lugar: '',
	    categoria: '',
      descripcion: '',
      vendedor: '',
      precio: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
        nombre: this.state.producto[0],
        id: this.state.producto[1],
        categoria: this.state.producto[5],
        descripcion: this.state.producto[2],
        vendedor: this.state.producto[3],
        precio: this.state.producto[4]
    })
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
      foto: this.state.foto,
    }

    actualizarProducto(this.state.producto[1],producto)
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
                    <Form.Control placeholder="Introduzca precio" />
                  </Form.Group>
    } else {
      contenido = <Form>
                  <Form.Group controlId="productPriceSub">
                    <Form.Label>Precio de salida</Form.Label>
                    <Form.Control placeholder="Introduzca precio" />
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
                    <option>Choose...</option>
                    <option>...</option>
                    <option>...</option>
                    <option>...</option>
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
