import React, { Component as C } from 'react';
import { browserHistory } from '@version/react-router-v3';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { FaUser, FaSearch, FaPhone, FaMailBulk, FaUserCog, FaSitemap, FaLink, FaKey, FaRocketchat } from 'react-icons/fa';

import LMenu from "./pages/utils/LMenu";
import RMenu from "./pages/utils/RMenu";
import NbMenu from "./pages/utils/NbMenu";

import "../css/Index.css";
import "../css/SMenu.css";
import '../css/Header.css';
// import socket from './Socket';

class Header extends C {
  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this._onLogout = this._onLogout.bind(this);
    // console.log(props.ua.device);
    // console.log(props.ua.language);
    // socket.emit('join room', 'room', 1);
    // socket.emit('chat message', 'room', 1, 1, 1, 'TEST');
    // socket.on('chat message', function(data){
    //     console.log(data);
    // });

    this.state = {
      chats: { room: {}, data: [] }
    };
  }

  _onClick(e) {
    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    // e.nativeEvent.composedPath();
    var obj = e.target;
    if(obj.tagName != 'A') {
      if(obj.tagName === 'path') {
        obj = e.target.parentElement.parentElement;
      } else {
        obj = e.target.parentElement;
      }
      if(obj.tagName != 'A') return;
    }
    const className = e.target.parentElement.parentElement.className;
    console.log(className);
    console.log(e.target.parentElement.parentElement);
    browserHistory.push({ pathname: '/list', params: { "para": obj.para } });
  }

  _onLogout(){
    this.props.onLogout();
  }

  _onSelect(e){
    console.log(e);
  }

  render() {
    if(!this.props.viewHeader) return "";
    if(this.props.isUser != null && this.props.isUser.menu===1) {
      return ( 
        <div className="Headder">
          <LMenu isUser={ this.props.isUser }/>
          <RMenu isUser={ this.props.isUser }/>
          <Navbar bg="dark" expand="lg" variant="dark">
            {/* <Navbar.Brand href="#home" className="a-homepage"><img src="favicon.ico" /></Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>

            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Nav.Link href="#search" className="global-search"><FaSearch /></Nav.Link>
            </Form>
    
            <Nav.Link onClick={ this._onClick.bind(this) }>{ <FaPhone /> }</Nav.Link>
            <Nav.Link onClick={ this._onClick.bind(this) }>{ <FaMailBulk /> }</Nav.Link>
            <Nav.Link onClick={ this._onClick.bind(this) }></Nav.Link>
            <NavDropdown title={<FaUser />} id="basic-nav-dropdown-right" alignRight>
                <NavDropdown.Item onClick={ this._onClick.bind(this) } para="user">{ <FaUserCog /> }<span>プロフィール</span></NavDropdown.Item>
                <NavDropdown.Item onClick={ this._onClick.bind(this) } para="pagesetting">{ <FaSitemap /> }<span>ページ設定</span></NavDropdown.Item>
                <NavDropdown.Item onClick={ this._onClick.bind(this) } para="system">{ <FaLink /> }<span>システム設定</span></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={ this._onLogout.bind(this) }>{ <FaKey /> }<span>ログアウト</span></NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div>
          <RMenu isUser={ this.props.isUser } />
          <NbMenu isUser={ this.props.isUser } onLogout={ this.props.onLogout } onClick={ this._onClick.bind(this) }/>
        </div>
      );
    }
  };
}

export default Header;
