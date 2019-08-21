import React, { Component as C } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Alert, Form, Button } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { SLASH, LIST } from '../utils/Types';
import { isEmpty } from '../utils/Utils';

import Messages from '../../msg/Msg';
import "../../css/Index.css";
import '../../css/Login.css';

/** String To SHA2 */
import Sha256 from 'sha256';
/** SESSION */
import AuthAction from './AuthAction';

class Login extends C {
  constructor(props){
    super(props);

    this._onLogin = this._onLogin.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onChangeSelect = this._onChangeSelect.bind(this);

    this.state = {
      isUser: this.props.isUser
      ,uLid: ''
      ,pw: ''
    }
  }

  _onLogin(e){
    e.preventDefault();
    this.state.isUser['uLid'] = this.state.uLid;
    const auth = AuthAction.authObjectLogin(this.state.auth, '/customer');
    if(!Utils.isEmpty(auth)) {
      let data = {
        uLid: this.state.uLid
        ,pw: Sha256(this.state.pw)
      };
      let global = FETCH.postFetch('/auth', data, this.basicAuth);
      global.then(data => {
        if(Utils.isEmpty(data) === null || data.length <= 0) {
          AuthAction.clearAuthSession();
          browserHistory.push('/');
        } else {
          const isUser = auth;
          isUser['cId'] = data[0]['company_id'];
          isUser['gId'] = data[0]['group_id'];
          isUser['uId'] = data[0]['member_id'];
          isUser['uName'] = data[0]['member_name'];
          this.setState({ isUser: isUser });

          this.props.onLogin(this.state.isUser);
          this.props.history.push(SLASH +LIST);
        }
      });
    } else {
      AuthAction.clearAuthSession();
      this.props.history.push(SLASH);
    }
  }

  _onChange(e){
    this.setState({ [e.target.name]: e.target.value });
  }

  _onChangeSelect(e) {
    this.state.isUser.language = e.target.value;
    this.forceUpdate();
  }

  // componentWillMount(){
  //   this.props.history.push(SLASH +LIST);
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
    console.log(this.state);
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
              <Form.Control required type="text" name={ this.state.uLid } onChange={ this._onChange.bind(this) } placeholder={ MsgLogin['login_id'] } />
            </Form.Group>
            <Form.Group>
              <Form.Control required type="password" name={ this.state.pw } onChange={ this._onChange.bind(this) } placeholder={ MsgLogin['password'] } />
            </Form.Group>
            <Form.Group>
              <Form.Control as="select" onChange={ this._onChangeSelect.bind(this) } value={ this.state.isUser.language }>
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

export default connect()(withRouter(Login));