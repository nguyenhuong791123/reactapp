import React, { Component as C } from 'react';
import { browserHistory } from '@version/react-router-v3';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { FaUser, FaSearch, FaPhone, FaMailBulk, FaUserCog, FaSitemap, FaLink, FaKey, FaRocketchat } from 'react-icons/fa';

import LMenu from "./pages/utils/LMenu";
import RMenu from "./pages/utils/RMenu";
import NbMenu from "./pages/utils/NbMenu";

import { LINK, NOT_LINK } from './pages/utils/Types';
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
      menus: {
        menu1: [
          { view: LINK, target: 'target_00', label: 'label_00', level: 0, items: [] }
          ,{ view: NOT_LINK, target: 'target_01', label: 'label_01', level: 0, items: [
            { view: 0, target: 'target_001', level: 1, label: 'label_001' }
            ,{ view: 1, target: 'target_000', level: 1, label: 'label_000', items: [
              { view: 0, target: 'target_0000', level: 2, label: 'label_0000' }
            ] }
          ] }
          ,{ view: NOT_LINK, target: 'target_03', label: 'label_03', level: 0, items: [
            { view: 0, target: 'target_003', level: 1, label: 'label_003' }
            ,{ view: 1, target: 'target_0003', level: 1, label: 'label_0003', items: [
              { view: 0, target: 'target_00003', level: 2, label: 'label_00003' }
            ] }
          ] }
        ]
        ,menu2: [
          { view: LINK, target: 'target_01_00', label: 'label_01_00', level: 0, items: [] }
          ,{ view: NOT_LINK, target: 'target_01_01', label: 'label_01_01', level: 0, items: [
            { view: 0, target: 'target_01_001', level: 1, label: 'label_01_001' }
            ,{ view: 1, target: 'target_01_000', level: 1, label: 'label_01_000', items: [
              { view: 0, target: 'target_01_0000', level: 2, label: 'label_01_0000' }
            ] }
          ] }
          ,{ view: NOT_LINK, target: 'target_01_03', label: 'label_01_03', level: 0, items: [] }
        ]

      }
      ,chats: { room: {}, data: [] }
    };
  }

  _onClick(e) {
    e.preventDefault();
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
          <LMenu isUser={ this.props.isUser } menus={ this.state.menus }/>
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
          <NbMenu isUser={ this.props.isUser } onLogout={ this.props.onLogout } onClick={ this._onClick.bind(this) } menus={ this.state.menus } />
        </div>
      );
    }
  };
}

export default Header;
