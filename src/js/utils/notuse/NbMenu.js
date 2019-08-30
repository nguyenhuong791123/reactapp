import React, { Component as C } from 'react';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';
import { Navbar, Nav, NavDropdown, Form, FormControl, Image } from 'react-bootstrap';
import { FaUser, FaSearch, FaTty, FaPhone, FaMailBulk, FaUserCog, FaSitemap, FaKey, FaLink, FaRocketchat } from 'react-icons/fa';

import Messages from '../../msg/Msg';
import { LINK, ACTION, PAGE } from './Types';
import Utils from './Utils';
import NdMenu from './NdMenu';
import TabMenu from './TabMenu';

class NbMenu extends C {
  constructor(props) {
    super(props);

    this._onNavDropdown = this._onNavDropdown.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onLogout = this._onLogout.bind(this);

    this.state = {
      isUser: this.props.isUser
      ,dailer: this.props.dailer
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

  _onClickPhone(e) {
    this.props.onClickPhone(e);
  }

  _getMenu(menus) {
    if(Utils.isEmpty(menus) || menus.length === 0) return "";
    return menus.map((o, index) => {
      if(o.view === LINK) {
        return (
          <Nav.Link
            key={ o.target }
            idx={ index }
            action={ o.target }
            onClick={ this._onClick.bind(this) }
            level={ o.level }
            view={ o.view }>{ o.label }</Nav.Link>);
      } else {
        if(!Utils.isEmpty(o.items) && o.items.length > 0) {
          var dIdx = "dm_" + index;
          return (
            <NdMenu
              isUser={ this.state.isUser }
              key={ o.target }
              id={ dIdx }
              action={ o.target }
              title={ o.label }
              objs={ o.items }
              onClick={ this._onClick.bind(this) } />
          );
        } else {
          return (
            <div className="dropright" key={ o.target }>
              <Nav.Link
                idx={ index }
                action={ o.target }
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

  _newWindow(e) {
    var obj = e.target;
    if(Utils.isEmpty(obj) || Utils.isEmpty(obj.tagName)) return;
    var href = obj.getAttribute("page");
    if(Utils.isEmpty(href) && (obj.tagName === 'IMG' || obj.tagName === 'SPAN')) {
      href = obj.parentElement.getAttribute("page");
    }
    if(Utils.isEmpty(href)) return;
    var w = window.open();
    w.opener = null;
    w.location = href;
  }

  UNSAFE_componentWillReceiveProps(props) {
    console.log('HEADER componentWillReceiveProps');
    this.state.isUser = props.isUser;
    this.state.dailer = props.dailer;
  }

  render() {
    // console.log(this.state.isUser);
    const Msg = Messages[ this.state.isUser.language ];
    // console.log(Msg);

    return ( 
      <div className="Headder">
        <Navbar bg="dark" expand="lg" variant="dark">
          <a href='#home-page' page={ 'https://vnext.co.jp/company-info.html' } onClick={ this._newWindow.bind(this) } className={ 'header-image-icon' }>
            <Image src={ 'favicon.ico' } rounded />
            <span>SmartCRM</span>
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" id="basic-navbar-nav-toggle" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* <Nav className="mr-auto">{ this._getMenu(this.state.menus) }</Nav> */}
            <Nav className="mr-auto" id="div-nav-tab-menu">
              <TabMenu isUser={ this.state.isUser } objs={ this.state.menus } onClick={ this._onClick.bind(this) }/>
            </Nav>

            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Nav.Link href="#search" className="global-search"><FaSearch /></Nav.Link>
            </Form>
      
            <Nav.Link onClick={ this._onClickPhone.bind(this) }>
              {(() => { if(!this.state.dailer) { return ( <FaTty /> ); } })()}
              {(() => { if(this.state.dailer) { return ( <FaPhone /> ); } })()}
            </Nav.Link>
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
