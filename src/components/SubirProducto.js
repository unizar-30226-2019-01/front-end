import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { anadirProducto } from '../GestionPublicaciones';
import { anadirSubasta } from '../GestionPublicaciones';
import { Route, Switch, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import NavLogReg from './NavLogReg';
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBXsmEEHvGiRwxeMbAO4AejNexD0iCHn_s",
    authDomain: "proyectosoftware-2397d.firebaseapp.com",
    databaseURL: "https://proyectosoftware-2397d.firebaseio.com",
    projectId: "proyectosoftware-2397d",
    storageBucket: "proyectosoftware-2397d.appspot.com",
    messagingSenderId: "382506671393",
    appId: "1:382506671393:web:af9c6a6744e52da2"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


class SubirProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venta: true,
      nombre: '',
      fecha: '',
			lugar: '',
			categoria: '',
      descripcion: '',
      vendedor: '',
      precio: '',
      fechaLimite: '',
      horaLimite: '',
      foto: '',
      uploadValue: 0,
      picture: '',
      foto1: '',
      foto2: '',
      foto3: ''
    }
    this.state = { validated: false };
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {

    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
      console.log("no existe")
      this.setState({registrar: true});
    }
    else{
      console.log("existe")
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      this.setState({
        vendedor: decoded.identity.login,
      })
      console.log(this.state.vendedor)
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else{
      var day = new Date();
      var dd = day.getDate();
      var mm = day.getMonth();
      var yy = day.getFullYear();

      var fecha = dd+'/'+mm+'/'+yy

      if(this.state.venta){
        const newProducto = {
          nombre: this.state.nombre,
          fecha: fecha,
          categoria: this.state.categoria,
          descripcion: this.state.descripcion,
          vendedor: this.state.vendedor,
          precio: this.state.precio,
          foto: this.state.foto,
          foto1: this.state.foto1,
          foto2: this.state.foto2,
          foto3: this.state.foto3
        }
        anadirProducto(newProducto).then(res => {
          console.log(res.error)
          if (!res.error) {
            //this.props.history.push(`/profile`)
          }
        })
      }
      else{
        let nombreAux = this.state.nombre+" (SUBASTA)"
        const newProductoSubasta = {
          nombre: nombreAux,
          fecha: fecha,
          categoria: this.state.categoria,
          descripcion: this.state.descripcion,
          vendedor: this.state.vendedor,
          precio: this.state.precio,
          foto: this.state.foto,
          fechaLimite: this.state.fechaLimite,
          horaLimite: this.state.horaLimite
        }
        anadirSubasta(newProductoSubasta).then(res => {
          console.log(res.error)
          if (!res.error) {
            //this.props.history.push(`/profile`)
          }
        })
      }
    }
    this.setState({ validated: true });
  }

  changeVentSubst (valor) {
    this.setState((prevState, props) => {
      return {venta: valor}
    })
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
          this.setState({picture: url, foto: url});
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

    const { validated } = this.state;

    if (this.state.registrar){
      return <Redirect push to="/registro" />;
    }
    if (this.state.redirect){
      //window.confirm("Subido correctamente");
      //return <Redirect push to="/" />;
      /*if(true){
        window.alert("Subido correctamente")
        /*return <Redirect to={{
                    pathname: "/",
                    state: {subidoCorrecto: true}
                }}/>;*/
      /*}
      else{
        window.alert("El producto no se ha subido correctamente")
      }*/
    }
    let contenido
    if (this.state.venta) {
      contenido = <Form.Group controlId="productPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control placeholder="Introduzca precio"
                    required
                    name="precio"
                    type="number"
										value={this.state.precio}
										onChange={this.onChange} />
                  </Form.Group>
    } else {
      contenido = <Form>
                  <Form.Group controlId="productPriceSub">
                    <Form.Label>Precio de salida</Form.Label>
                    <Form.Control placeholder="Introduzca precio"
                    required
                    name="precio"
                    type="number"
										value={this.state.precio}
										onChange={this.onChange}  />
                  </Form.Group>
                  <Form.Group controlId="fechaLimite">
                      <Form.Label>Fecha límite</Form.Label>
                      <Form.Control type="Date"
                      required
                      name="fechaLimite"
                      value={this.state.fechaLimite}
                      onChange={this.onChange}/>
                  </Form.Group>
                  <Form.Group controlId="horaLimite">
                      <Form.Label>Hora límite</Form.Label>
                      <Form.Control type="Time"
                      required
                      name="horaLimite"
                      value={this.state.horaLimite}
                      onChange={this.onChange} />
                  </Form.Group>
                  </Form>
    }

    return(
      <div>
        <NavLogReg/>
        <Container>
        <br />
          <Row>
            <div class="w-100 text-center">
              <h1>Subir Producto</h1>
            </div>
          </Row>
          <Row className="show-grid">
            <Col xs={3} />
            <Col xs={6}>
              <Form noValidate validated={validated}
                    onSubmit={e => this.handleSubmit(e)}>
                <Form.Group controlId="productName">
                  <Form.Control
                  placeholder="Nombre"
                  required
                  name="nombre"
										value={this.state.nombre}
										onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="productDescription">
                  <Form.Control as="textarea" rows="5" placeholder="Descripcion"
                  required
                  name="descripcion"
                  value={this.state.descripcion}
                  onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="categoryProduct">
                  <Form.Label>Categoría</Form.Label>
                  <Form.Control as="select"
                  required
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
                  <progress value={this.state.uploadValue} max='100'></progress>
                  <br />
                  <input type='file' required onChange={this.handleOnChangeP.bind(this)}/>
                  <br />
                </div>
                <div>
                <br/>
                  <label>Fotos de tarjeta</label>
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
