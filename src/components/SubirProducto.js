import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class SubirProducto extends Component {
  constructor(args) {
    super(args);
    this.state = {
      venta: true
    };
  }

  changeVentSubst (valor) {
    this.setState((prevState, props) => {
      return {venta: valor}
    })
  }

  render(){
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
          <Row>
            <div class="w-100 text-center">
              <h1>Subir Producto</h1>
            </div>
          </Row>
          <Row className="show-grid">
            <Col xs={3} />
            <Col xs={6}>
              <Form>
                <Form.Group controlId="productName">
                  <Form.Control placeholder="Nombre" />
                </Form.Group>
                <Form.Group controlId="productDescription">
                  <Form.Control as="textarea" rows="5" placeholder="Descripcion" />
                </Form.Group>
                <Form.Group controlId="categoryProduct">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control as="select">
                    <option>Choose...</option>
                    <option>...</option>
                    <option>...</option>
                    <option>...</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="photoProduct">
                  <Form.Label>Foto</Form.Label>
                  <Form.Control type="file">
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
                <Button type="submit">Subir</Button>
              </Form>
            </Col>
            <Col xs={3} />
          </Row>
        </Container>
      </div>
    )
  }
}
export default SubirProducto
