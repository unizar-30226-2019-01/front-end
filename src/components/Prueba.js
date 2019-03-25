import React, { Component } from 'react';
import logo from './logo.png';
import PropTypes from 'prop-types';


class Prueba extends Component {
  static propTypes = {
    body: PropTypes.object.isRequired
  };
  render() {
    const { body } = this.props;
    return(
      <div>
        {body}
      </div>
    )
  }
}

export default Prueba
