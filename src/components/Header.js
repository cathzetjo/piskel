import React, { Component } from 'react';

import logo from '../Assets/img/piskelLogo.png';

export default class Header extends Component {
  render() {
    return (
      <header>
        <img src={logo} alt=""/>
      </header>
    );
  }
}
