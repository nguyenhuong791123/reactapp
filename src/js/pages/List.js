
import React, { Component as C, PropTypes } from 'react';

import AuthService from '../sevice/AuthService';

export default class List extends C {
  constructor(props) {
    super(props);

    this.Auth = new AuthService();
    console.log(this.Auth.getProfile());
    this.state = {};
  };

  // componentWillMount(){
  //   this.forceUpdate();
  // }

  render() {
    return (
      <div>List</div>
    )
  };
};