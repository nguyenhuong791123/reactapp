import React, { Component as C } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { FaUser, FaSearch, FaPhone, FaMailBulk, FaUserCog, FaSitemap, FaKey, FaLink, FaRocketchat } from 'react-icons/fa';

import { ACTION , LINK, NOT_LINK, PAGE } from './utils/Types';
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
    this._onClickPhone = this._onClickPhone.bind(this);
    // console.log(props.ua.device);
    // console.log(props.ua.language);
    // socket.emit('join room', 'room', 1);
    // socket.emit('chat message', 'room', 1, 1, 1, 'TEST');
    // socket.on('chat message', function(data){
    //     console.log(data);
    // });

    this.state = {
      isUser: this.props.isUser
      ,options: this.props.options
      ,right: ''
      ,menus: [
        { id: 1, view: LINK, target: 'target_00', label: 'label_00', level: 0, items: [] }
        ,{ id: 2, view: NOT_LINK, target: 'target_01', label: 'label_01', level: 0, items: 
          [
            { id: 3, view: LINK, target: 'target_001', level: 1, label: 'label_001' }
            ,{ id: 4, view: NOT_LINK, target: 'target_000', level: 1, label: 'label_000', items: 
              [
                { id: 5, view: 0, target: 'target_0000', level: 2, label: 'label_0000' }
              ]
            }
          ]
        }
        ,{ id: 6, view: NOT_LINK, target: 'target_03', label: 'label_03', level: 0, items: 
          [
            { id: 7, view: LINK, target: 'target_003', level: 1, label: 'label_003' }
            ,{ id: 8, view: NOT_LINK, target: 'target_0003', level: 1, label: 'label_0003', items: 
              [
                { id: 9, view: LINK, target: 'target_00003', level: 2, label: 'label_00003' }
              ]
            }
          ]
        }
        ,{ id: 10, view: LINK, target: 'target_10', label: 'label_10', level: 0, items: [] }
        ,{ id: 11, view: LINK, target: 'target_11', label: 'label_11', level: 0, items: [] }
        ,{ id: 12, view: LINK, target: 'target_12', label: 'label_12', level: 0, items: [] }
        ,{ id: 13, view: LINK, target: 'target_13', label: 'label_13', level: 0, items: [] }
        ,{ id: 14, view: LINK, target: 'target_14', label: 'label_14', level: 0, items: [] }
        ,{ id: 15, view: LINK, target: 'target_15', label: 'label_15', level: 0, items: [] }
        ,{ id: 16, view: LINK, target: 'target_16', label: 'label_16', level: 0, items: [] }
        ,{ id: 17, view: LINK, target: 'target_17', label: 'label_17', level: 0, items: [] }
        ,{ id: 18, view: LINK, target: 'target_18', label: 'label_18', level: 0, items: [] }
        ,{ id: 19, view: LINK, target: 'target_19', label: 'label_19', level: 0, items: [] }
        ,{ id: 20, view: LINK, target: 'target_20', label: 'label_20', level: 0, items: [] }
        ,{ id: 21, view: LINK, target: 'target_21', label: 'label_21', level: 0, items: [] }
        ,{ id: 22, view: LINK, target: 'target_22', label: 'label_22', level: 0, items: [] }
        ,{ id: 23, view: LINK, target: 'target_23', label: 'label_23', level: 0, items: [] }
        ,{ id: 24, view: LINK, target: 'target_24', label: 'label_24', level: 0, items: [] }
        ,{ id: 25, view: LINK, target: 'target_25', label: 'label_25', level: 0, items: [] }
      ]
      ,chats: { room: {}, data: [] }
    };
  }

  _onClick(e) {
    var hBts = document.getElementById("basic-navbar-nav");
    if(!Utils.isEmpty(hBts) && window.innerWidth <= 991) {
      var btn = hBts.parentElement.childNodes[0];
      if(!Utils.isEmpty(btn) && btn.tagName === "BUTTON") btn.click();
    }

    var obj = e.target;
    if(obj.tagName !== 'A') {
      if(obj.tagName === 'path') {
        obj = e.target.parentElement.parentElement;
      } else {
        obj = e.target.parentElement;
      }
      if(obj.tagName !== 'A') return;
    }

    const action = obj.getAttribute('action');
    if(!Utils.isEmpty(action)) {
      if(!Utils.isEmpty(obj.id) && (obj.id === "a-chat-icon" || obj.id === "a-page-setting")) {
        const body = document.getElementById('div_body');
        const cl = body.className;
        if(!Utils.isEmpty(cl)
          && cl.indexOf('div-margin-right-22') !== -1
          && this.state.right !== action) {
            this.state.right = action;
            this.state.isUser.action = action;
            return;
        }
        var svg = document.getElementById('div-right-chat-icon');
        if(!Utils.isEmpty(svg.parentElement.childNodes) && svg.parentElement.childNodes.length > 1) {
          svg.parentElement.childNodes[1].click();
          this.state.right = action;
          this.state.isUser.action = action;
        }
        return;  
      }

      this.state.isUser.action = action;
      const url = window.location.protocol + '//' + window.location.host;
      var path = obj.href.replace(url, '').replace('#', '');
      this.state.isUser.path = path;
      this.props.onUpdateUser(this.state.isUser, this.state.options, this.props.onUpdateIsUserCallBack);
      console.log('HEADER _onClick complete !!!');
    } else {
      console.log('HEADER _onClick Not setting action !!!');
    }
  }

  _onLogout(){
    this.props.onLogout();
  }

  _onSelect(e){
    console.log(e);
  }

  _onClickPhone(e) {
    console.log(e);
  }

  UNSAFE_componentDidUpdate() {
    this._loadButtonToggle();
  }

  UNSAFE_componentDidMount() {
    this._loadButtonToggle();
  }

  UNSAFE_componentWillReceiveProps(props) {
    console.log('HEADER componentWillReceiveProps');
    this.state.isUser = props.isUser;
    // console.log(props);
    // console.log(this.state);
    // console.log(sessionService.loadUser('COOKIES'));
    // console.log(props);
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
    if(!this.state.isUser.viewHeader) return "";
    this._loadButtonToggle();
    // console.log(this.state.isUser);
    const Msg = Messages[ this.props.isUser.language ];
    // console.log(Msg);

    if(this.props.isUser != null && this.props.isUser.menu===1) {
      return ( 
        <div className="Headder">
          <LMenu ua={ this.state.ua } isUser={ this.props.isUser } menus={ this.state.menus }/>
          <RMenu ua={ this.state.ua } isUser={ this.props.isUser } action={ this.state.isUser.action }/>
          <Navbar bg="dark" expand="lg" variant="dark">
            {/* <Navbar.Brand href="#home" className="a-homepage"><img src="favicon.ico" /></Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" id="basic-navbar-nav-toggle"/>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto"></Nav>

              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Nav.Link href="#search" className="global-search"><FaSearch /></Nav.Link>
              </Form>
      
              <Nav.Link onClick={ this._onClickPhone.bind(this) }>{ <FaPhone /> }</Nav.Link>
              <Nav.Link action={ PAGE.MAIL } onClick={ this._onClick.bind(this) }>{ <FaMailBulk /> }</Nav.Link>
              <Nav.Link action={ PAGE.CHAT } onClick={ this._onClick.bind(this) } id="a-chat-icon">{ <FaRocketchat /> }</Nav.Link>
              <NavDropdown title={<FaUser />} id="basic-nav-dropdown-right" alignRight>
                <NavDropdown.Item action={ PAGE.USER } onClick={ this._onClick.bind(this) }>
                  { <FaUserCog /> }
                  <span>{ Utils.getJsonValue(Msg, 'bt_profile') }</span>
                </NavDropdown.Item>
                <NavDropdown.Item action={ PAGE.SETTING } onClick={ this._onClick.bind(this) } id="a-page-setting">
                  { <FaSitemap /> }
                  <span>{ Utils.getJsonValue(Msg, 'page_setting') }</span>
                </NavDropdown.Item>
                <NavDropdown.Item action={ PAGE.SYSTEM } onClick={ this._onClick.bind(this) }>
                  { <FaLink /> }
                  <span>{ Utils.getJsonValue(Msg, 'system_setting') }</span>
                </NavDropdown.Item>
                {/* <Link action={ PAGE.SYSTEM } to={ ACTION.SLASH + ACTION.LIST } className="dropdown-item" onClick={ this._onClick.bind(this) }>
                  { <FaKey /> }
                  <span>{ Utils.getJsonValue(Msg, 'system_setting') }</span>
                </Link> */}
                <NavDropdown.Divider />
                <Link to={ ACTION.SLASH } className="dropdown-item" onClick={ this._onLogout.bind(this) }>
                  { <FaKey /> }
                  <span>{ Utils.getJsonValue(Msg, 'bt_logout') }</span>
                </Link>

                {/* <NavDropdown.Item path={ ACTION.SLASH } onClick={ this._onLogout.bind(this) }>
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