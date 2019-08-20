import React, { Component as C } from 'react';

import '../css/Footer.css';

class Footer extends C {
  constructor(props) {
    super(props);

    this.state = { copyright: this.props.copyright };
  }

  render() {
    if(!this.props.viewFooter) return "";
    return (
      <div>
        <span>
          { this.state.copyright }
          {/* Copyright ©2018 VNEXT All Rights Reserved. */}
        </span>
      </div>
    );
  };
}

export default Footer;