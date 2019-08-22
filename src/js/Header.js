import React, { Component as C } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { FaUser, FaSearch, FaPhone, FaMailBulk, FaUserCog, FaSitemap, FaLink, FaKey, FaRocketchat } from 'react-icons/fa';

import { ACTION , LINK, NOT_LINK } from './utils/Types';
import Utils from './utils/Utils';
import LMenu from "./utils/LMenu";
import RMenu from "./utils/RMenu";
import NbMenu from "./utils/NbMenu";

import Messages from '../msg/Msg';
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
      isUser: this.props.isUser
      ,menus: [
        { view: LINK, target: 'target_00', label: 'label_00', level: 0, items: [] }
        ,{ view: NOT_LINK, target: 'target_01', label: 'label_01', level: 0, items: 
          [
            { view: LINK, target: 'target_001', level: 1, label: 'label_001' }
            ,{ view: NOT_LINK, target: 'target_000', level: 1, label: 'label_000', items: 
              [
                { view: 0, target: 'target_0000', level: 2, label: 'label_0000' }
              ]
            }
          ]
        }
        ,{ view: NOT_LINK, target: 'target_03', label: 'label_03', level: 0, items: 
          [
            { view: LINK, target: 'target_003', level: 1, label: 'label_003' }
            ,{ view: NOT_LINK, target: 'target_0003', level: 1, label: 'label_0003', items: 
              [
                { view: LINK, target: 'target_00003', level: 2, label: 'label_00003' }
              ]
            }
          ]
        }
      ]
      ,chats: { room: {}, data: [] }
    };
  }

  _onClick(e) {
    var hBts = document.getElementById("basic-navbar-nav");
    // console.log(window.innerWidth);
    if(!Utils.isEmpty(hBts) && window.innerWidth <= 991) {
      var btn = hBts.parentElement.childNodes[0];
      if(!Utils.isEmpty(btn) && btn.tagName === "BUTTON") btn.click();
    }
    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    // e.nativeEvent.composedPath();

    var obj = e.target;
    if(obj.tagName !== 'A') {
      if(obj.tagName === 'path') {
        obj = e.target.parentElement.parentElement;
      } else {
        obj = e.target.parentElement;
      }
      if(obj.tagName !== 'A') return;
    }

    if(!Utils.isEmpty(obj.id) && obj.id === "a-chat-icon") {
      var svg = document.getElementById('div-right-chat-icon');
      if(!Utils.isEmpty(svg.parentElement.childNodes) && svg.parentElement.childNodes.length > 1) {
        svg.parentElement.childNodes[1].click();
      }
      return;  
    }

    // console.log(obj);
    this.props.history.push({ pathname: ACTION.SLASH + ACTION.LIST, params: { "para": obj.para } });
  }

  _onLogout(){
    this.props.onLogout();
  }

  _onSelect(e){
    console.log(e);
  }

  componentDidUpdate() {
    this._loadButtonToggle();
  }

  componentDidMount() {
    this._loadButtonToggle();
  }

  _loadButtonToggle() {
    var btn = document.getElementById("basic-navbar-nav-toggle");
    if(!Utils.isEmpty(btn) && !Utils.isEmpty(this.props.isUser)) {
      if(this.state.isUser.menu === 1) {
        btn.style.left = "1.5em";
      } else {
        btn.style.left = "0";  
      }
    }
  }

  render() {
    if(!this.props.viewHeader) return "";
    this._loadButtonToggle();
    // console.log(this.state.isUser);
    const Msg = Messages[ this.props.isUser.language ];
    // console.log(Msg);

    if(this.props.isUser != null && this.props.isUser.menu===1) {
      return ( 
        <div className="Headder">
          <LMenu ua={ this.state.ua } isUser={ this.props.isUser } menus={ this.state.menus }/>
          <RMenu ua={ this.state.ua } isUser={ this.props.isUser }/>
          <Navbar bg="dark" expand="lg" variant="dark">
            {/* <Navbar.Brand href="#home" className="a-homepage"><img src="favicon.ico" /></Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" id="basic-navbar-nav-toggle"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto"></Nav>

              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Nav.Link href="#search" className="global-search"><FaSearch /></Nav.Link>
              </Form>
      
              <Nav.Link onClick={ this._onClick.bind(this) }>{ <FaPhone /> }</Nav.Link>
              <Nav.Link onClick={ this._onClick.bind(this) }>{ <FaMailBulk /> }</Nav.Link>
              <Nav.Link onClick={ this._onClick.bind(this) } id="a-chat-icon">{ <FaRocketchat /> }</Nav.Link>
              <NavDropdown title={<FaUser />} id="basic-nav-dropdown-right" alignRight>
                <NavDropdown.Item onClick={ this._onClick.bind(this) } para="user">
                  { <FaUserCog /> }
                  <span>{ Utils.getJsonValue(Msg, 'bt_profile') }</span>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={ this._onClick.bind(this) } para="pagesetting">
                  { <FaSitemap /> }
                  <span>{ Utils.getJsonValue(Msg, 'page_setting') }</span>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={ this._onClick.bind(this) } para="system">
                  { <FaLink /> }
                  <span>{ Utils.getJsonValue(Msg, 'system_setting') }</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <Link to={ ACTION.SLASH } className="dropdown-item" onClick={ this._onLogout.bind(this) }>
                  { <FaKey /> }
                  <span>{ Utils.getJsonValue(Msg, 'bt_logout') }</span>
                </Link>

                {/* <NavDropdown.Item onClick={ this._onLogout.bind(this) }>
                  { <FaKey /> }
                  <span>{ Utils.getJsonValue(Msg, 'bt_logout') }</span>
                </NavDropdown.Item> */}
              </NavDropdown>
            </Navbar.Collapse>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div>
          <RMenu isUser={ this.props.isUser } />
          <NbMenu
            ua={ this.state.ua }
            isUser={ this.props.isUser }
            onLogout={ this._onLogout.bind(this) }
            onClick={ this._onClick.bind(this) }
            menus={ this.state.menus } />
        </div>
      );
    }
  };
}

export default Header;