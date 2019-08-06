import React, { Component as C, PropTypes } from 'react';
import { browserHistory } from '@version/react-router-v3';
import { Navbar, Nav, NavDropdown, Form, FormControl , Button } from 'react-bootstrap';
import { FaUser, FaSearch } from 'react-icons/fa';

import './css/Header.css';

import socket from './js/Socket';
import AuthService from './js/sevice/AuthService';
import WithAuth from './js/sevice/WithAuth';
const Auth = new AuthService();

class Header extends C {
  constructor(props) {
    super(props);

    this._onLogout = this._onLogout.bind(this);
    console.log(props.ua.device);
    console.log(props.ua.language);
    socket.emit('chat message', 'Room A', 1, 1, 1, 'TEST');
    socket.on('chat message', function(data){
        console.log(data);
    });

    this.state = {
      auth: {
        device: props.ua.device
        ,language: props.ua.language
        ,cti: true
        ,chat: true
        ,mail: true
        ,isLogin: true
      }
      ,chats: { room: {}, data: [] }
    };
  }

  _onLogout(){
    Auth.logout()
    browserHistory.push('/list');
//    this.props.history.replace('/login');
  }

  render() {
    if(!this.state.auth.isLogin) return "";
    return (
      <div className="Headder">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Nav.Link href="#search" className="global-search"><FaSearch /></Nav.Link>
          </Form>

          <Nav.Link href="#link">Link</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title={<FaUser />} id="basic-nav-dropdown-right" alignRight>
              <NavDropdown.Item href="#action/3.1">プロフィール</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">ページ設定</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">モジュール設定</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout" onClick={this._onLogout.bind(this)}>ログアウト</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };
}

export default WithAuth(Header);
