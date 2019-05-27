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
import * as firebase from 'firebase'
import Map from './Map';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";


class SubirProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venta: true,
      nombre: '',
      descripcion: '',
      categoria: '',
      foto: '',
      foto1: '',
      foto2: '',
      foto3: '',
      fecha: '',
      precio: '',
      fechaLimite: '',
      horaLimite: '',
			lugar: '',
      provincia:"",
      picture: '',
      vendedor: '',
      uploadValue: 0,
      validated: false
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem('usertoken') === undefined || localStorage.getItem('usertoken') === null) {
      this.setState({registrar: true});
    }
    else{
      const token = localStorage.usertoken
      const decoded = jwt_decode(token)
      this.setState({
        vendedor: decoded.identity.login,
        foto1: "vacio",
        foto2: "vacio",
        foto3: "vacio"
      })
      console.log(this.state.vendedor)
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault() //Con esto se evita recargar la pagina

    const form = e.currentTarget;
    if ((form.checkValidity() === false) || (this.state.categoria == "Elegir...") || (this.state.categoria == undefined)) {
      e.preventDefault();
      e.stopPropagation();
      window.alert("Rellene todo los campos y seleccione categoría válida (foto principal obligatoria)")
    }
    else{
      var day = new Date();
      var dd = day.getDate();
      var mm = day.getMonth()+1;
      var yy = day.getFullYear();
      var fecha = yy+'-'+mm+'-'+dd
      console.log(this.state.foto1)

      if(this.state.venta){
        const newProducto = {
          nombre: this.state.nombre,
          descripcion: this.state.descripcion,
          categoria: this.state.categoria,
          foto: this.state.foto,
          foto1: this.state.foto1,
          foto2: this.state.foto2,
          foto3: this.state.foto3,
          precio: this.state.precio,
          vendedor: this.state.vendedor,
          provincia: this.state.provincia,
          fecha: fecha
        };
        anadirProducto(newProducto).then(data => {
          this.setState({
              respuestaBD: data
            })
          })
        this.setState({redirect: true});
      }
      else{
        if (this.state.fechaLimite==undefined) {
          e.preventDefault();
          e.stopPropagation();
          window.alert("Seleccione una fecha límite correcta por favor")
        }
        else{
          var separador="-",
              fechaHoy=fecha.split(separador),
              fechaL=(this.state.fechaLimite).split(separador);

          var anyoInt = +fechaL[0], //El + de delante es para convertirla a entero
              anyoIntHoy = +fechaHoy[0];

          if((anyoInt)>(anyoIntHoy+2)){ //Si pones de fecha Limite una superior a dos anyos, fail
            e.preventDefault();
            e.stopPropagation();
            window.alert("Seleccione una fecha límite correcta por favor")
          }
          else if(this.state.fechaLimite==""){  //Este es el caso en el q metias un dia mayor q 28 en febrero en anyo no bisiesto, saca "" no se sabe por que
            e.preventDefault();
            e.stopPropagation();
            window.alert("Seleccione una fecha límite correcta por favor")
          }
          else{
            if(fechaHoy[1].length==1){
              fechaHoy[1]= "0"+fechaHoy[1]
            }
            if(fechaHoy[2].length==1){
              fechaHoy[2]= "0"+fechaHoy[2]
            }
            var fechaHoyD=fechaHoy[0]+fechaHoy[1]+fechaHoy[2];
            var fechaLD=fechaL[0]+fechaL[1]+fechaL[2];
            if(fechaLD<fechaHoyD){        // Cambiar para poder meter fecha actual
              this.setState({
                  fechaAnterior: true,
                  redirect: true
              })
            }
            else{
              const newProductoSubasta = {
                nombre: this.state.nombre,
                fecha: fecha,
          			categoria: this.state.categoria,
                descripcion: this.state.descripcion,
                vendedor: this.state.vendedor,
                precio: this.state.precio,
                foto: this.state.foto,
                foto1: this.state.foto1,
                foto2: this.state.foto2,
                foto3: this.state.foto3,
                fechaLimite: this.state.fechaLimite,
                horaLimite: this.state.horaLimite,
                provincia: this.state.provincia
              }
              anadirSubasta(newProductoSubasta).then(data => {
                this.setState({
                    respuestaBDSubasta: data
                })
                if(data=="Exito"){
                  //setTimeout(this.acabarSubasta, 20000);
                  console.log("puesto")
                }
              })
              this.setState({redirect: true});
            }
          }
        }
      }
    }
    this.setState({ validated: true });
  }

  acabarSubasta(){
    console.log("TIMEOUT")
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

cambiarProvincia (prov) {
  this.setState({provincia: prov});
  console.log(this.state.provincia)
}

  render(){
    const { validated } = this.state;

    if (this.state.registrar){
      window.alert("Regístrese o inicie sesión si ya posee una cuenta por favor")
      return <Redirect push to="/registro" />;
    }
    if (this.state.redirect){
      if(this.state.fechaAnterior){
        window.alert("Para una subasta, no puede introducir fechas que ya han pasado, ni una fecha igual al día actual. Pruebe de nuevo")
        return <Redirect push to="/" />;
      }
      else if(this.state.respuestaBD=="Exito"){
        window.alert("Producto subido con éxito")
        return <Redirect push to="/" />;
      }
      else if(this.state.respuestaBD=="Error"){
        window.alert("El producto no se ha podido subir. Intente de nuevo")
        return <Redirect push to="/" />;
      }
      else if(this.state.respuestaBDSubasta=="Exito"){
        window.alert("Subasta subida con éxito")
        return <Redirect push to="/" />;
      }
      else if(this.state.respuestaBDSubasta=="Error"){
        window.alert("La subasta no se ha podido subir. Intente de nuevo")
        return <Redirect push to="/" />;
      }
      else if(this.state.respuestaBD!=undefined){
        var c = this.state.respuestaBD+""; //Para tratarla como un string
        if((c.indexOf("Error")>-1)){
          window.alert("Error en el servidor. Intente de nuevo")
          return <Redirect push to="/" />;
        }
      }
      else if(this.state.respuestaBDSubasta!=undefined){
        var c = this.state.respuestaBDSubasta+""; //Para tratarla como un string
        if((c.indexOf("Error")>-1)){
          window.alert("Error en el servidor. Intente de nuevo")
          return <Redirect push to="/" />;
        }
      }
    }
    let botonSubir
    if(this.state.provincia!==""){
      botonSubir=
      <div className = "text-center">
        <Button className="botonSubir" type="submit">Subir producto</Button>
      </div>
    }

    let contenido //Para cambiar vista entre producto o subasta
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
                    onSubmit={e => this.onSubmit(e)}>
                <Form.Group controlId="productName">
                  <Form.Control
                  placeholder="Nombre"
                  required
                  maxlength="17"
                  name="nombre"
										value={this.state.nombre}
										onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="productDescription">
                  <Form.Control as="textarea" rows="5" placeholder="Descripción"
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
                <br/>
                <Form.Label> ¿Donde se va a vender el producto? </Form.Label>
                <Map
                  google={this.props.google}
                  center={{lat: 41.6517501, lng: -0.9300005}}
                  height='200px'
                  zoom={5}
                  callback={this.cambiarProvincia.bind(this)}
                />
                <br />
                <br />
                {botonSubir}
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
