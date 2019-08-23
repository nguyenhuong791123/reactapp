import React, { Component as C } from 'react';

import '../css/Footer.css';

class Footer extends C {
  constructor(props) {
    super(props);

    this.state = { };
  }

  render() {
    if(!this.props.viewFooter) return "";
    console.log(this.props.viewFooter);
    return (
      <div>
        <span>
          { this.props.copyright }
        </span>
      </div>
    );
  };
}

export default Footer;