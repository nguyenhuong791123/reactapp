import React, { Component as C } from 'react';
import onClickOutside from 'react-onclickoutside'
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { FaUser, FaSearch, FaPhone, FaMailBulk, FaUserCog, FaSitemap, FaLink, FaKey } from 'react-icons/fa';

import { LINK } from './Types';
import Utils from './Utils';
import NavDropdownMenu from './NavDropdownMenu';

class NbMenu extends C {
  constructor(props) {
    super(props);

    this._onNavDropdown = this._onNavDropdown.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onLogout = this._onLogout.bind(this);

    this.state = {
      menus: this.props.menus
      ,isShow: false
    }
  }

  _onClick(e) {
    const a = e.target;
    // console.log(a);
    // this.props.onClick(e);
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
      return ( 
        <div className="Headder">
          <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              { this._getMenu(this.state.menus) }
              {/* <Nav.Link onClick={ this._onClick.bind(this) }>Home</Nav.Link>
              <Nav.Link onClick={ this._onClick.bind(this) }>Link</Nav.Link>
              { <NavDropdownMenu id="menu_01" title="Dropdown_01" objs={ this.state.menus.menu1 }/> }
              { <NavDropdownMenu id="menu_02" title="Dropdown_02" objs={ this.state.menus.menu2 }/> } */}
            </Nav>
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
       )
  };
}

export default onClickOutside(NbMenu);
