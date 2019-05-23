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
    if(props.location.prod==undefined){
      this.state = {
        id: '',
        nombre: '',
        descripcion: '',
        categoria: '',
        categoriaActual: '',
        fotos: '',
        fotoP: "vacio",
        foto1: "vacio",
        foto2: "vacio",
        foto3: "vacio",
        fotoPAntigua: '',
        foto1Antigua: '',
        foto2Antigua: '',
        foto3Antigua: '',
        precio: '',
        fecha: '',
  	    lugar: '',
        vendedor: '',
        mantenerFotoP: false,
        borrarFoto1: false,
        borrarFoto2: false,
        borrarFoto3: false,
        uploadValue: 0,
        validated: false,
        primera: true,
        redirige: true
      }
    }
    else{
      this.state = {
        id: props.location.prod.id,
        nombre: props.location.prod.nombre,
        descripcion: props.location.prod.descripcion,
        categoria: props.location.prod.categoria,
        categoriaActual: props.location.prod.categoria,
        fotos: props.location.prod.fotos,
        fotoP: "vacio",
        foto1: "vacio",
        foto2: "vacio",
        foto3: "vacio",
        fotoPAntigua: '',
        foto1Antigua: '',
        foto2Antigua: '',
        foto3Antigua: '',
        precio: props.location.prod.precio,
        fecha: '',
  	    lugar: '',
        vendedor: '',
        mantenerFotoP: false,
        borrarFoto1: false,
        borrarFoto2: false,
        borrarFoto3: false,
        uploadValue: 0,
        validated: false,
        primera: true,
        redirige: false
      }
    }
    this.onChange = this.onChange.bind(this)
    this.onChangeCheckBox = this.onChangeCheckBox.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onChangeCheckBox(e) {
    this.setState({ [e.target.name]: e.target.checked })
  }

  onSubmit(e) {
    e.preventDefault()

    const form = e.currentTarget;
    if ((form.checkValidity() === false) || (this.state.categoria == "Elegir...") || (this.state.categoria == undefined) || this.state.precio==0) {
      e.preventDefault();
      e.stopPropagation();
      window.alert("Rellene todo los campos y seleccione categoría válida. Compruebe que el precio es superior a 0 Euros")
    }
    else{
      var day = new Date();
      var dd = day.getDate();
      var mm = day.getMonth()+1;
      var yy = day.getFullYear();
      var fecha = yy+'-'+mm+'-'+dd

      let fotoPDefinitiva
      if(this.state.mantenerFotoP){
        fotoPDefinitiva=this.state.fotoPAntigua
      }
      else{
        fotoPDefinitiva=this.state.fotoP
      }

      let foto1Definitiva
      if(this.state.borrarFoto1){
        foto1Definitiva = "vacio"
      }
      else{
        foto1Definitiva = this.state.foto1
      }

      let foto2Definitiva
      if(this.state.borrarFoto2){
        foto2Definitiva = "vacio"
      }
      else{
        foto2Definitiva = this.state.foto2
      }

      let foto3Definitiva
      if(this.state.borrarFoto3){
        foto3Definitiva = "vacio"
      }
      else{
        foto3Definitiva = this.state.foto3
      }

      const productoEditado = {
        id: this.state.id,
        nombre: this.state.nombre,
        descripcion: this.state.descripcion,
        categoria: this.state.categoria,
        fotoP: fotoPDefinitiva,
        foto1: foto1Definitiva,
        foto2: foto2Definitiva,
        foto3: foto3Definitiva,
        fotoPAntigua: this.state.fotoPAntigua,
        foto1Antigua: this.state.foto1Antigua,
        foto2Antigua: this.state.foto2Antigua,
        foto3Antigua: this.state.foto3Antigua,
        precio: this.state.precio,
        fecha: fecha
      };
      actualizarProducto(productoEditado).then(data => {
        this.setState({
            respuestaBD: data
        })
      })
      this.setState({redirect: true});
      this.setState({ validated: true });
    }
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
    const { validated } = this.state;
    if(this.state.redirige){
      return <Redirect push to="/Perfil" />;
    }
    if (this.state.redirect){
      if(this.state.respuestaBD=="Exito"){
        window.alert("Producto actualizado con éxito")
        return <Redirect push to="/Perfil" />;
      }
      else if(this.state.respuestaBD=="Error"){
        window.alert("El producto no se ha podido actualizar. Intente de nuevo")
        return <Redirect push to="/Perfil" />;
      }
      else if(this.state.respuestaBD!=undefined){
        var c = this.state.respuestaBD+""; //Para tratarla como un string
        if((c.indexOf("Error")>-1)){
          window.alert("Error en el servidor. Intente de nuevo")
          return <Redirect push to="/Perfil" />;
        }
      }
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
                            <Form.Group controlId="borrarFoto1Box">
                              <Form.Check type="checkbox" label="Borrar foto (Si ha seleccionado un archivo nuevo, éste no se subirá y además esta foto se borrará)"
                               name="borrarFoto1"
            									 onChange={this.onChangeCheckBox}
                              />
                            </Form.Group>
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
                            <Form.Group controlId="borrarFoto1Box">
                              <Form.Check type="checkbox" label="Borrar foto (Si ha seleccionado un archivo nuevo, éste no se subirá y además esta foto se borrará)"
                               name="borrarFoto1"
            									 onChange={this.onChangeCheckBox}
                              />
                            </Form.Group>
                            <img src={aux2} width="100%" height="100%"/>
                            <br/>
                            <input type='file' onChange={this.handleOnChange2.bind(this)}/>
                            <Form.Group controlId="borrarFoto2Box">
                              <Form.Check type="checkbox" label="Borrar foto (Si ha seleccionado un archivo nuevo, éste no se subirá y además esta foto se borrará)"
                               name="borrarFoto2"
            									 onChange={this.onChangeCheckBox}
                              />
                            </Form.Group>
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
                            <Form.Group controlId="borrarFoto1Box">
                              <Form.Check type="checkbox" label="Borrar foto (Si ha seleccionado un archivo nuevo, éste no se subirá y además esta foto se borrará)"
                               name="borrarFoto1"
            									 onChange={this.onChangeCheckBox}
                              />
                            </Form.Group>
                            <img src={aux2} width="100%" height="100%"/>
                            <br/>
                            <input type='file' onChange={this.handleOnChange2.bind(this)}/>
                            <Form.Group controlId="borrarFoto2Box">
                              <Form.Check type="checkbox" label="Borrar foto (Si ha seleccionado un archivo nuevo, éste no se subirá y además esta foto se borrará)"
                               name="borrarFoto2"
            									 onChange={this.onChangeCheckBox}
                              />
                            </Form.Group>
                            <img src={aux3} width="100%" height="100%"/>
                            <br/>
                            <input type='file' onChange={this.handleOnChange3.bind(this)}/>
                            <Form.Group controlId="borrarFoto3Box">
                              <Form.Check type="checkbox" label="Borrar foto (Si ha seleccionado un archivo nuevo, éste no se subirá y además esta foto se borrará)"
                               name="borrarFoto3"
            									 onChange={this.onChangeCheckBox}
                              />
                            </Form.Group>
                          </div>
    }
    if(this.state.primera){
      this.setState({primera: false,
                     fotoP: aux,
                     foto1: aux1,
                     foto2: aux2,
                     foto3: aux3,
                     fotoPAntigua: aux,
                     foto1Antigua: aux1,
                     foto2Antigua: aux2,
                     foto3Antigua: aux3});
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
              <Form noValidate validated={validated}
                    onSubmit={e => this.onSubmit(e)}>
                <Form.Group controlId="productName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                  placeholder="Nombre"
                  required
                  name="nombre"
										value={this.state.nombre}
										onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="productDescription">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control as="textarea" rows="5" placeholder="Descripción"
                  required
                  name="descripcion"
                  value={this.state.descripcion}
                  onChange={this.onChange} />
                </Form.Group>
                <Form.Group controlId="categoryProduct">
                  <Form.Label>Categoría actual: {this.state.categoriaActual}</Form.Label>
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
                  <img src={aux} width="100%" height="100%"/>
                  <progress value={this.state.uploadValue} max='100'></progress>
                  <input type='file' id="princFot" onChange={this.handleOnChangeP.bind(this)}/>
                  <Form.Group controlId="mantenerFotoPBox">
                    <Form.Check type="checkbox" label="Mantener foto original (Si se ha seleccionado una foto nueva por error seleccione este campo para no hacer efectivo el cambio)"
                     name="mantenerFotoP"
  									 onChange={this.onChangeCheckBox}
                    />
                  </Form.Group>
                </div>
                {contenidoImagenes}
                <Form.Group controlId="productPrice">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control placeholder="Introduzca precio"
                  required
                  name="precio"
                  type="number"
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
