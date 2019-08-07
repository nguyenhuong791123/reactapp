
import React, { Component as C, PropTypes } from 'react';
import { browserHistory } from '@version/react-router-v3';
import { Alert, Form, Button } from 'react-bootstrap';

import AuthService from '../sevice/AuthService';

import '../../css/Login.css';

export default class Login extends C {
  constructor(props){
    super(props);
    this.Auth = new AuthService();
    this._onChange = this._onChange.bind(this);
    this._onLogin = this._onLogin.bind(this);

    this.state = { username: '', password: '' }
  }

  _onLogin(e){
    e.preventDefault();
    this.props.route.onLogin(this.state.username, this.state.password);
  }

  _onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount(){
    if(this.Auth.loggedIn())
        browserHistory.push('/list');
  }

  render() {
    return (
      <div>
        <Alert variant="success" className="div-center">
          <Alert.Heading>System Authorization</Alert.Heading>
          <hr />
          <Form noValidate validated="true" onSubmit={ this._onLogin.bind(this) }>
            <Form.Row>
              <Form.Control required type="text" name="username" placeholder="First name"/>
            </Form.Row>
            <Form.Row>
              <Form.Control required type="password" name="password" placeholder="Password"/>
            </Form.Row>
            <Form.Row>
              <Button type="submit">Submit form</Button>              
            </Form.Row>
          </Form>
        </Alert>
      </div>
    )
  };
};