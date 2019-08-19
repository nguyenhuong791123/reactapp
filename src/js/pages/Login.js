import React, { Component as C } from 'react';
import { browserHistory } from '@version/react-router-v3';
import { Alert, Form, Button } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';

import AuthService from '../sevice/AuthService';

import Messages from '../msg/Msg';

import "../../css/Index.css";
import '../../css/Login.css';

export default class Login extends C {
  constructor(props){
    super(props);

    this.Auth = new AuthService();
    this._onChangeSelect = this._onChangeSelect.bind(this);
    this._onLogin = this._onLogin.bind(this);

    this.state = {
      ua: this.props.route.ua
      ,username: ''
      ,password: ''
    }
  }

  _onLogin(e){
    e.preventDefault();
    this.props.route.onLogin(this.state.username, this.state.password, this.state.ua);
  }

  // _onChange(e){
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  _onChangeSelect(e) {
    this.state.ua = { device: this.state.ua.device, language: e.target.value };
    this.props.route.onUpdateUA(this.state.ua);
    this.forceUpdate();
  }

  componentWillMount(){
    if(this.Auth.loggedIn())
      browserHistory.push('/list');
  }

  render() {
    console.log(this.state);
    const Msg = Messages[ this.state.ua.language ]
    const MsgLogin = Messages[ 'login/' + this.state.ua.language ]

    return (
      <div>
        <Alert variant="success" className="div-center">
          {/* <Alert.Heading>{ <FaUnlockAlt /> }System Authorization{ <FaUnlockAlt /> }</Alert.Heading> */}
          <Alert.Heading>{ MsgLogin['system_auth'] }</Alert.Heading>
          <hr />
          <Form noValidate validated="true" onSubmit={ this._onLogin.bind(this) }>
            <Form.Group>
              <Form.Control required type="text" name={ this.state.username } placeholder={ MsgLogin['login_id'] } />
            </Form.Group>
            <Form.Group>
              <Form.Control required type="password" name={ this.state.password } placeholder={ MsgLogin['password'] } />
            </Form.Group>
            <Form.Group>
              <Form.Control as="select" onChange={ this._onChangeSelect.bind(this) }>
                <option value="ja">{ Msg['ja'] }</option>
                <option value="en">{ Msg['en'] }</option>
                <option value="vn">{ Msg['vn'] }</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Button type="submit">{ Msg['bt_login'] }{ <FaSignInAlt /> }</Button>              
            </Form.Group>
          </Form>
        </Alert>
      </div>
    )
  };
};