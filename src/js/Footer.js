import React, { Component as C } from 'react';

import '../css/Footer.css';

class Footer extends C {
  constructor(props) {
    super(props);

    this.state = { };

  }

  render() {
    if(this.props.auth) return "";
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