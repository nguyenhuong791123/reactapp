import React, { Component as C, PropTypes } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

class Footer extends C {
  constructor(props) {
    super(props);

    this.state = {
      auth: {
        device: props.ua.device
        ,language: props.ua.language
        ,isLogin: false
      }
    };

  }

  render() {
    if(this.state.auth.isLogin) return "";
    return (
      <div>
        <span>
          Copyright ©2018 VNEXT All Rights Reserved.
        </span>
      </div>
    );
  };
}

export default Footer;