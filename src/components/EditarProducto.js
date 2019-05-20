import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavLogReg from './NavLogReg';
import { actualizarProducto } from '../GestionPublicaciones';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as firebase from 'firebase'

class EditarProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.location.prod.id,
      nombre: props.location.prod.nombre,
      fecha: '',
	    lugar: '',
	    categoria: props.location.prod.categoria,
      categoriaActual: props.location.prod.categoria,
      descripcion: props.location.prod.descripcion,
      fotos: props.location.prod.fotos,
      precio: props.location.prod.precio,
      vendedor: '',
      fotoP: "vacio",
      foto1: "vacio",
      foto2: "vacio",
      foto3: "vacio",
      uploadValue: 0
    }

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

    actualizarProducto(producto).then(data => {
      this.setState({
          respuestaBD: data
      },
          () => {
              console.log(this.state.term)
          })
    })
    this.setState({redirect: true});
  }

  handleOnChangeP (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`fotos/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
            uploadValue: percentage
        })
      }, (error) => {
        // Si ha ocurrido un error aquí lo tratamos
        console.error(error.message)
    }, () => {
        console.log(task.snapshot.ref.getDownloadURL())
        task.snapshot.ref.getDownloadURL()
        .then((url) => {
          this.setState({picture: url, fotoP: url});
        });
      })
  }

  handleOnChange1 (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`fotos/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
            uploadValue: percentage
        })
      }, (error) => {
        // Si ha ocurrido un error aquí lo tratamos
        console.error(error.message)
    }, () => {
        console.log(task.snapshot.ref.getDownloadURL())
        task.snapshot.ref.getDownloadURL()
        .then((url) => {
          this.setState({picture: url, foto1: url});
        });
      })
  }

  handleOnChange2 (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`fotos/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
            uploadValue: percentage
        })
      }, (error) => {
        // Si ha ocurrido un error aquí lo tratamos
        console.error(error.message)
    }, () => {
        console.log(task.snapshot.ref.getDownloadURL())
        task.snapshot.ref.getDownloadURL()
        .then((url) => {
          this.setState({picture: url, foto2: url});
        });
      })
  }

  handleOnChange3 (event) {
    const file = event.target.files[0]
    const storageRef = firebase.storage().ref(`fotos/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed', (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        this.setState({
            uploadValue: percentage
        })
      }, (error) => {
        // Si ha ocurrido un error aquí lo tratamos
        console.error(error.message)
    }, () => {
        console.log(task.snapshot.ref.getDownloadURL())
        task.snapshot.ref.getDownloadURL()
        .then((url) => {
          this.setState({picture: url, foto3: url});
        });
      })
  }

  render(){
    if (this.state.redirect){
      return <Redirect push to="/" />;
    }

    let aux, aux1, aux2, aux3, contenidoImagenes;
    if(this.state.fotos.length==1){
      aux=this.state.fotos[0];
      aux=aux[0]
      aux1="vacio"
      aux2="vacio"
      aux3="vacio"
      contenidoImagenes = <div>
                          <br/>
                            <label>Fotos de tarjeta (opcionales)</label>
                            <br/>
                            <input type='file' onChange={this.handleOnChange1.bind(this)}/>
                            <br />
                            <br/>
                            <input type='file' onChange={this.handleOnChange2.bind(this)}/>
                            <br />
                            <br/>
                            <input type='file' onChange={this.handleOnChange3.bind(this)}/>
                            <br />
                            <br />
                          </div>
    }
    else if(this.state.fotos.length==2){
      aux=this.state.fotos[0];
      aux=aux[0]
      aux1=this.state.fotos[1];
      aux1=aux1[0]
      aux2="vacio"
      aux3="vacio"
      contenidoImagenes = <div>
                          <br/>
                            <label>Fotos de tarjeta (opcionales)</label>
                            <img src={aux1} width="100%" height="100%"/>
                            <br/>
                            <input type='file' onChange={this.handleOnChange1.bind(this)}/>
                            <br />
                            <br/>
                            <input type='file' onChange={this.handleOnChange2.bind(this)}/>
                            <br />
                            <br/>
                            <input type='file' onChange={this.handleOnChange3.bind(this)}/>
                            <br />
                            <br />
                          </div>
    }
    else if(this.state.fotos.length==3){
      aux=this.state.fotos[0];
      aux=aux[0]
      aux1=this.state.fotos[1];
      aux1=aux1[0]
      aux2=this.state.fotos[2];
      aux2=aux2[0]
      aux3="vacio"
      contenidoImagenes = <div>
                          <br/>
                            <label>Fotos de tarjeta (opcionales)</label>
                            <img src={aux1} width="100%" height="100%"/>
                            <br/>
                            <input type='file' onChange={this.handleOnChange1.bind(this)}/>
                            <br />
                            <img src={aux2} width="100%" height="100%"/>
                            <br/>
                            <input type='file' onChange={this.handleOnChange2.bind(this)}/>
                            <br />
                            <br/>
                            <input type='file' onChange={this.handleOnChange3.bind(this)}/>
                            <br />
                            <br />
                          </div>
    }
    else if(this.state.fotos.length==4){
      aux=this.state.fotos[0];
      aux=aux[0]
      aux1=this.state.fotos[1];
      aux1=aux1[0]
      aux2=this.state.fotos[2];
      aux2=aux2[0]
      aux3=this.state.fotos[3];
      aux3=aux3[0]
      contenidoImagenes = <div>
                          <br/>
                            <label>Fotos de tarjeta (opcionales)</label>
                            <img src={aux1} width="100%" height="100%"/>
                            <br/>
                            <input type='file' onChange={this.handleOnChange1.bind(this)}/>
                            <br />
                            <img src={aux2} width="100%" height="100%"/>
                            <br/>
                            <input type='file' onChange={this.handleOnChange2.bind(this)}/>
                            <br />
                            <img src={aux3} width="100%" height="100%"/>
                            <br/>
                            <input type='file' onChange={this.handleOnChange3.bind(this)}/>
                            <br />
                            <br />
                          </div>
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
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                  placeholder="Nombre"
                  name="nombre"
										value={this.state.nombre}
										onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="productDescription">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control as="textarea" rows="5" placeholder="Descripción"
                  name="descripcion"
                  value={this.state.descripcion}
                  onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="categoryProduct">
                  <Form.Label>Categoría actual: {this.state.categoriaActual}</Form.Label>
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
                <div>
                <label>Foto de portada</label>
                <br/>
                  <img src={aux} width="100%" height="100%"/>
                  <progress value={this.state.uploadValue} max='100'></progress>
                  <br />
                  <input type='file' required onChange={this.handleOnChangeP.bind(this)}/>
                  <br />
                </div>
                {contenidoImagenes}
                <Form.Group controlId="productPrice">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control placeholder="Introduzca precio"
                  name="precio"
									value={this.state.precio}
									onChange={this.onChange} />
                </Form.Group>
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
