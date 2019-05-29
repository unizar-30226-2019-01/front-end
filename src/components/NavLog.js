import React, { Component } from 'react';
import logo from '../images/logo.png';
import Navbar from 'react-bootstrap/Navbar';
import NavLogReg from './NavLogReg';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Registro from './Registro';
import ReactDOM from 'react-dom';
import { login } from '../GestionUsuarios';
import { Route, Switch, Redirect } from 'react-router-dom';


class NavLog extends Component {

  constructor() {
    super()
    this.state = {
      login: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.handleSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
		e.preventDefault();
		
			const user = {
				login: this.state.login,
				password: this.state.password
			}

			login(user).then(res => {
				this.setState({
					respuestaBD: res
				})
			})
			this.setState({ redirect: true });
	}

  render() {

    const { validated } = this.state;

		if (this.state.redirect){
			console.log(this.state.respuestaBD)
      if(this.state.respuestaBD=="Error"){
				window.alert("Error en el login, Intente de nuevo")
				this.setState({redirect: false,
					respuestaBD: undefined});
			}
			else if(this.state.respuestaBD != undefined) {
				return <Redirect push to="/" />
			}
    }

    return (
      <div className="Navbar">
      <Navbar collapseOnSelect expand="md"  variant="light" bg="light" fixed="top">
          <Navbar.Brand href="/">
           <h2>
            <img
              alt=""
              src={logo}
              width="50"
              height="40"
              className="d-inline-block align-top"
            />
            Baitu
            </h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Navbar.Collapse className="justify-content-front ">

          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
                 <Button
                      href="/registro"
                      className=" mr-sm-4" variant="success">Registrarse</Button>
              <br />
              <br />
              <Form inline 
                    onSubmit={e => this.handleSubmit(e)}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl className=" mr-sm-2"
                required
                  placeholder="Usuario"
                  name="login"
                  aria-label="Usuario"
                  aria-describedby="basic-addon1"
                  value={this.state.login}
                  onChange={this.onChange}
                />
              </InputGroup>
              <br />
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">?</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl className=" mr-sm-2"
                required
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  aria-label="Contraseña"
                  aria-describedby="basic-addon1"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </InputGroup>
              <br />
              <br />
              <Button type="submit" className="mx-auto"> Entrar
              </Button>
            </Form>
            <br />
            <Button className=" ml-sm-4" href="/subirProducto" variant="success">Subir producto</Button>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Navbar>
      <br /> <br /> <br />
      </div>
    );
  }
}

export default NavLog
