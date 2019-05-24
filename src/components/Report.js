import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import NavLogReg from './NavLogReg';

import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { reportar, infoUsuario } from '../GestionUsuarios';


class Report extends Component {
    constructor(props) {
        super(props)
        this.state = {
          denunciante: props.location.datos.denunciante ,  
          vendedor: props.location.datos.vendedor ,          
          producto: props.location.datos.articulo ,
          texto: '',
          //tipoDenuncia: '',

          validated: false
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.handleSubmit.bind(this)   //Prevencion de campos vacios
    }

    handleSubmit(event) { //Cada vez que se envie el formulario
      
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault(); //Evita refrescar la pantalla (si hay entradas no validas)
        event.stopPropagation();
      }
      else{
        event.preventDefault()
        
        console.log("Denunsiante:")
        console.log(this.state.denunciante)

        const infoReport = {
          denunciante: this.state.denunciante,
          vendedor: this.state.vendedor,
          producto: this.state.producto,
          //tipoDenuncia: this.state.tipoDenuncia,
          texto: this.state.texto
        }
        console.log("infoReport :")
        console.log(infoReport)
        
        reportar(infoReport).then(res => {
          this.setState({
            respuestaBD: res
          })
        })  
        this.setState({ redirect: true });
      }
      this.setState({ validated: true });
    }

    onChange(e) {
        console.log(this.state)
        //Indica que el campo que se actualiza con el valor obtenido del input
        this.setState({ [e.target.name]: e.target.value }) 
    }


    render(){
        const { validated } = this.state;
        if (this.state.redirect){
          return <Redirect push to="/" />;
        }

        return(
            <div className="App">
            <NavLogReg/>
            <br />
              <br />
              <div className="row">
                <div className = "col"> </div>           {/* Margen de la izquierda */}
                <div className="col-8">
                    <h1>
                    Reportar al usuario {this.state.vendedor} por venta del producto {this.state.producto}
                    </h1>
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={e => this.handleSubmit(e)}
                    >
                  
            {/*
                    <fieldset>
                        <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            Motivo de la denuncia:
                        </Form.Label>
                         <Col sm={10}>
                            <Form.Check
                            type="radio"
                            label="Fraude"
                            name="fraude"
                            id="formHorizontalRadios1"
                            value={this.state.value}
                            onChange={this.onChange} 
                            />
                            <Form.Check
                            type="radio"
                            label="Mal comportamiento o abuso"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                            value={this.state.value}
                            onChange={this.onChange} 
                            />
                            <Form.Check
                            type="radio"
                            label="Artículo en mal estado"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios3"
                            value={this.state.value}
                            onChange={this.onChange} 
                            />
                            <Form.Check
                            type="radio"
                            label="Otros"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios4"
                            />

                        </Col>
                        </Form.Group>
                    </fieldset>
                */}

                {/* 
                    <textarea 
                        required
                        rows="10" 
                        cols="100"
                        name="texto"
                        placeholder="Indique los motivos de su denuncia"
                        value={this.state.texto} 
                        onChange={this.onChange} 
                    />
                  */}

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" 
                          rows="10" 
                          required
                          name="texto"
                          placeholder="Indique los motivos de su denuncia"
                          value={this.state.texto} 
                          onChange={this.onChange}                           
                        
                        />
                    </Form.Group>




                  <Button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block">
                    Enviar informe negativo
                  </Button>
                  </Form>
                </div>
                <div className = "col"></div> {/* Margen de la derecha */}               
              </div>
            </div> 
        );
    }
}
export default Report;