import React, { Component as C } from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
import { Navbar, Nav, NavDropdown, Form, FormControl, Image } from 'react-bootstrap';
import { FaUser, FaSearch, FaPhone, FaMailBulk, FaUserCog, FaSitemap, FaLink, FaKey, FaRocketchat } from 'react-icons/fa';

import Messages from '../../msg/Msg';
import { LINK, ACTION, PAGE } from './Types';
import Utils from './Utils';
import NavDropdownMenu from './NavDropdownMenu';

class NbMenu extends C {
  constructor(props) {
    super(props);

    this._onNavDropdown = this._onNavDropdown.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onLogout = this._onLogout.bind(this);

    this.state = {
      isUser: this.props.isUser
      ,menus: this.props.menus
      ,isShow: false
    }
  }

  _onClick(e) {
    this.props.onClick(e);
  }

  _onNavDropdown(e) {
    this.setState({ isShow: !this.state.isShow });
  }

  handleClickOutside = () => {
    this.setState({ isShow: false });
  }

  _onLogout(){
    this.props.onLogout();
  }

  _getMenu(menus) {
    if(Utils.isEmpty(menus) || menus.length === 0) return "";
    return menus.map((o, index) => {
      if(o.view === LINK) {
        return (
          <Nav.Link
            key={ o.target }
            idx={ index }
            onClick={ this._onClick.bind(this) }
            level={ o.level }
            view={ o.view }>{ o.label }</Nav.Link>);
      } else {
        if(!Utils.isEmpty(o.items) && o.items.length > 0) {
          var dIdx = "dm_" + index;
          return (
            <NavDropdownMenu key={ o.target } id={ dIdx } title={ o.label } objs={ o.items }/>
          );
        } else {
          return (
            <div className="dropright" key={ o.target }>
              <Nav.Link
                idx={ index }
                onClick={ this._onClick.bind(this) }
                className="dropdown-toggle"
                level={ o.level }
                view={ o.view }>{ o.label }</Nav.Link>
            </div>
          );  
        }
      }
    });
  }

  render() {
    // console.log(this.state.isUser);
    const Msg = Messages[ this.state.isUser.language ];
    // console.log(Msg);
    return ( 
      <div className="Headder">
        <Navbar bg="dark" expand="lg" variant="dark">
          <a target="_blank" href="https://vnext.co.jp/company-info.html" className="header-image-icon">
            <Image src="favicon.ico" rounded />
            <span>SmartCRM</span>
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" id="basic-navbar-nav-toggle" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">{ this._getMenu(this.state.menus) }</Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Nav.Link href="#search" className="global-search"><FaSearch /></Nav.Link>
            </Form>
      
            <Nav.Link onClick={ this._onClick.bind(this) }>{ <FaPhone /> }</Nav.Link>
            <Nav.Link action={ PAGE.MAIL } path={ ACTION.SLASH + ACTION.LIST } onClick={ this._onClick.bind(this) }>{ <FaMailBulk /> }</Nav.Link>
            <Nav.Link onClick={ this._onClick.bind(this) } id="a-chat-icon">{ <FaRocketchat /> }</Nav.Link>
            <NavDropdown title={<FaUser />} id="basic-nav-dropdown-right" alignRight>
              <NavDropdown.Item action={ PAGE.USER } path={ ACTION.SLASH + ACTION.LIST } onClick={ this._onClick.bind(this) }>
                { <FaUserCog /> }
                <span>{ Utils.getJsonValue(Msg, 'bt_profile') }</span>
              </NavDropdown.Item>
              <NavDropdown.Item action={ PAGE.SETTING } path={ ACTION.SLASH + ACTION.LIST } onClick={ this._onClick.bind(this) }>
                { <FaSitemap /> }
                <span>{ Utils.getJsonValue(Msg, 'page_setting') }</span>
              </NavDropdown.Item>
              {/* <NavDropdown.Item action={ PAGE.SYSTEM } path={ ACTION.SLASH + ACTION.LIST } onClick={ this._onClick.bind(this) }>
                { <FaLink /> }
                <span>{ Utils.getJsonValue(Msg, 'system_setting') }</span>
              </NavDropdown.Item> */}
                <Link action={ PAGE.SYSTEM } to={ ACTION.SLASH + ACTION.LIST } className="dropdown-item" onClick={ this._onClick.bind(this) }>
                  { <FaKey /> }
                  <span>{ Utils.getJsonValue(Msg, 'system_setting') }</span>
                </Link>
              <NavDropdown.Divider />
              <Link to={ ACTION.SLASH } className="dropdown-item" onClick={ this._onLogout.bind(this) }>
                { <FaKey /> }
                <span>{ Utils.getJsonValue(Msg, 'bt_logout') }</span>
              </Link>
              {/* <NavDropdown.Item href={ ACTION.SLASH } onClick={ this._onLogout.bind(this) }>
              { <FaKey /> }
                <span>{ Utils.getJsonValue(Msg, 'bt_logout') }</span>
                </NavDropdown.Item> */}
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };
}

export default onClickOutside(NbMenu);
