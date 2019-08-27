import React, { Component as C } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Alert, Form, Button } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import StringUtil from 'util';

import { ACTION, MSG_TYPE } from './utils/Types';
import { isEmpty, getJsonValue } from './utils/Utils';

import Messages from '../msg/Msg';
import "../css/Index.css";
import '../css/Login.css';

class Login extends C {
  constructor(props){
    super(props);

    this._onLogin = this._onLogin.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onChangeSelect = this._onChangeSelect.bind(this);

    console.log('LOGIN constructor !!!');
    console.log(this.props.isUser);
    this.state = {
      isUser: this.props.isUser
      ,options: this.props.options
      ,validated: true
      ,uLid: ''
      ,pw: ''
    }
  }

  _onLogin(e){
    const f = e.target;
    e.preventDefault();
    if (f.checkValidity() === false) {
        console.log(f.checkValidity());
    } else {
      console.log(this.state.uLid);
      console.log(this.state.pw);
      if(this.state.uLid.length > 8 || this.state.pw.length > 8) {
        return;
      } else {
        // this.state.validated = true;
        this.state.isUser['uLid'] = this.state.uLid;
        this.state.isUser['path'] = ACTION.SLASH + ACTION.LIST;
        this.state.isUser['viewHeader'] = true;
        console.log(this.state.isUser);
        console.log(this.state.options);
        this.props.onLogin(this.state.isUser, this.state.options);
        this.props.history.push(ACTION.SLASH + ACTION.LIST);
        // console.log(this.state);
      }
    }
  }

  _onChange(e){
    const value = e.target.value;
    const dError = e.target.parentElement.childNodes[1];
    if(!isEmpty(dError)) {
      if(value.length <= 0) {
        dError.style.display = 'block';
        dError.innerText = this._getMsg(MSG_TYPE.LOGIN, 'login_id') + this._getMsg(MSG_TYPE.ERROR, 'required');
      } else if(value.length > 8) {
        dError.style.display = 'block';
        var msg = StringUtil.format(this._getMsg(MSG_TYPE.ERROR, 'max_length'), 8, value.length - 8);
        dError.innerText = msg;
      } else {
        dError.style.display = 'none';
      }
    }
    this.setState({ [e.target.name]: value });
  }

  _onChangeSelect(e) {
    this.state.isUser.language = e.target.value;
    this.forceUpdate();
  }

  componentDidMount() {
    // console.log('LOGIN componentDidMount !!!');
    var div = document.getElementById('div_alert_login');
    if(!isEmpty(div)) {
      window.onresize = function(event) {
        div.style.left = ((window.innerWidth/2) - (div.offsetWidth/2)) + 'px';
        div.style.marginTop = ((window.innerHeight/2) - (div.offsetHeight/2)) + 'px';
      };
      window.onresize();  
    }
    this._reLoadBody();
  }

  _reLoadBody() {
    var body = document.getElementById('div_body');
    if(!isEmpty(body) && !isEmpty(body.className)) {
      body.className = body.className.replace("div-margin-right-22", "");
    }
  }

  _getMsg(page, key) {
    const Msg = Messages[ this.state.isUser.language ];
    const MsgError = Messages[ MSG_TYPE.ERROR + '/' + this.state.isUser.language ]
    const MsgLogin = Messages[ MSG_TYPE.LOGIN + '/' + this.state.isUser.language ]    
    if(isEmpty(page)) return getJsonValue(Msg, key);
    if(!isEmpty(page) && page === MSG_TYPE.ERROR) return getJsonValue(MsgError, key);
    if(!isEmpty(page) && page === MSG_TYPE.LOGIN) return getJsonValue(MsgLogin, key);
    return page + '/' + key;
  }

  // UNSAFE_componentWillReceiveProps(props) {
  //   console.log('Login componentWillReceiveProps');
  //   console.log(props);
  //   this.setState.isUser = props.isUser;
  //   console.log(this.setState.isUser);
  //   this.forceUpdate();
  //   // console.log(sessionService.loadUser('COOKIES'));
  //   // console.log(props);
  // }

  render() {
    console.log('Login Render!!!');
    console.log(this.state);

    return (
      <div>
        <Alert id="div_alert_login" variant="success" className="div-center">
          {/* <Alert.Heading>{ <FaUnlockAlt /> }System Authorization{ <FaUnlockAlt /> }</Alert.Heading> */}
          <Alert.Heading>{ this._getMsg(MSG_TYPE.LOGIN, 'system_auth') }</Alert.Heading>
          <hr />
          <Form noValidate validated={ this.state.validated } onSubmit={ this._onLogin.bind(this) }>
            <Form.Group>
              <Form.Control
                type="text"
                name="uLid"
                onChange={ this._onChange.bind(this) }
                placeholder={ this._getMsg(MSG_TYPE.LOGIN, 'login_id') }
                required />
              <Form.Control.Feedback type="invalid">
                { this._getMsg(MSG_TYPE.LOGIN, 'login_id') }{ this._getMsg(MSG_TYPE.ERROR, 'required') }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                name="pw"
                onChange={ this._onChange.bind(this) }
                placeholder={ this._getMsg(MSG_TYPE.LOGIN, 'password') }
                required />
              <Form.Control.Feedback type="invalid">
                { this._getMsg(MSG_TYPE.LOGIN, 'password') }{ this._getMsg(MSG_TYPE.ERROR, 'required') }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control as="select" onChange={ this._onChangeSelect.bind(this) } value={ this.state.isUser.language }>
                <option value="ja">{ this._getMsg(null, 'ja') }</option>
                <option value="en">{ this._getMsg(null, 'en') }</option>
                <option value="vn">{ this._getMsg(null, 'vn') }</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Button type="submit">{ this._getMsg(null, 'bt_login') }{ <FaSignInAlt /> }</Button>              
            </Form.Group>
          </Form>
        </Alert>
      </div>
    )
  };
};

export default connect()(withRouter(Login));