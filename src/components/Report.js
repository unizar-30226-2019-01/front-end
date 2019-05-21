import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Route, Switch, Redirect, Link } from 'react-router-dom';



class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
          vendedor: props.location.datos.vendedor ,
          producto: props.location.datos.articulo

        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.handleSubmit.bind(this)   //Prevencion de campos vacios
      }

















}

export default Report;