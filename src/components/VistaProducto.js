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

import { Route, Switch, Redirect } from 'react-router-dom';

class VistaProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 4,
      producto: this.props.producto
    }; //Para conseguir la valoracion del vendedor

    this.changeRating = this.changeRating.bind(this);
  }

  //Esto no vendria aqui pero es un ejemplo de como realizar una valoracion
  changeRating( newRating, name ) {
    this.setState({
      rating: newRating
    });
  }

  render() {
    return (

      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title bsPrefix="modal-title w-100 text-center" id="contained-modal-title-vcenter">
           {this.state.producto[0]}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Row className="show-grid">
              <Col xs={6}>
                <Button variant="outline-dark"> {/*onClick=() => aqui redirigir al vendedor*/}
                  VENDEDOR: {this.state.producto[3]}
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
            <Carousel.Item>
              <img className="d-block w-100" src={bichardo}/>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={bixorobar} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100" src={bixopolilla} />
            </Carousel.Item>
          </Carousel>

          <div className="row mt-4">
            <div className="col-md-3">
              <h3>Precio: {this.state.producto[4]}</h3>
            </div>
            <div className="col-md-9 text-right">
              <ButtonGroup toggle>
                <Button className="mr-sm-4" variant="outline-warning"> {/*onClick=() => aqui marcar favorito*/}
                  FAVORITO
                </Button>

                <Button className="mr-sm-4" variant="success"> {/*onClick=() => aqui redirigir al chat*/}
                  Abrir chat vendedor
                </Button>

                <Button className="mr-sm-4" variant="info" href="/EditarProducto" producto={this.state.producto} > {/*onClick=() => aqui redirigir al chat*/}
                  Editar
                </Button>

                <Button variant="danger"  onClick={this.props.callback(this.state.producto[1])}>
                  Eliminar
                </Button>
              </ButtonGroup>
            </div>
          </div>

          <h4>Descripción:</h4>
          <p>
            {this.state.producto[2]}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide /* usas la variable onHide q te manda el padre (closeModal)*/}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default VistaProducto
