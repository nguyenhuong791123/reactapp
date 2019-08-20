import React, { Component as C } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Alert, Form, Button } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';

import { isEmpty } from '../utils/Utils';
import Messages from '../../msg/Msg';

import "../../css/Index.css";
import '../../css/Login.css';

class Login extends C {
  constructor(props){
    super(props);

    this._onChangeSelect = this._onChangeSelect.bind(this);
    this._onLogin = this._onLogin.bind(this);

    console.log(this);
    this.state = {
      isUser: this.props.isUser
      ,language: this.props.isUser.language
      ,uLid: ''
      ,pw: ''
    }
  }

  _onLogin(e){
    e.preventDefault();
    const isUser = this.state.isUser;
    isUser['uLid'] = this.state.uLid;
    this.state.isUser = isUser;
    this.props.onLogin(isUser);
    this.props.history.push("/list");
  }

  _onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  _onChangeSelect(e) {
    this.state.isUser.language = e.target.value;
    this.forceUpdate();
  }

  // componentWillMount(){
  //     browserHistory.push('/list');
  // }

  componentDidMount() {
    this._reLoadBody();
  }

  _reLoadBody() {
    var body = document.getElementById('div_body');
    if(!isEmpty(body) && !isEmpty(body.className)) {
      body.className = body.className.replace("div-margin-right-22", "");
    }
  }

  render() {
    console.log(this.props);
    const Msg = Messages[ this.state.isUser.language ]
    const MsgLogin = Messages[ 'login/' + this.state.isUser.language ]

    return (
      <div>
        <Alert variant="success" className="div-center">
          {/* <Alert.Heading>{ <FaUnlockAlt /> }System Authorization{ <FaUnlockAlt /> }</Alert.Heading> */}
          <Alert.Heading>{ MsgLogin['system_auth'] }</Alert.Heading>
          <hr />
          <Form noValidate validated="true" onSubmit={ this._onLogin.bind(this) }>
            <Form.Group>
              <Form.Control required type="text" name="uLid" onChange={ this._onChange.bind(this) } placeholder={ MsgLogin['login_id'] } />
            </Form.Group>
            <Form.Group>
              <Form.Control required type="password" name="pw" onChange={ this._onChange.bind(this) } placeholder={ MsgLogin['password'] } />
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

export default withRouter(connect()(Login));