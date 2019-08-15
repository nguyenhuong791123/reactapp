import React, { Component as C } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { FaUser, FaSearch, FaPhone, FaMailBulk, FaRocketchat, FaUserCog, FaSitemap, FaLink, FaKey } from 'react-icons/fa';

class NbMenu extends C {
  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
    this._onLogout = this._onLogout.bind(this);
  }

  _onClick(e) {
    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    this.props.onClick(e);
  }

  _onLogout(){
    this.props.onLogout();
  }

  render() {
      return ( 
        <div className="Headder">
          <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={ this._onClick.bind(this) }>Home</Nav.Link>
              <Nav.Link onClick={ this._onClick.bind(this) }>Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={ this._onClick.bind(this) }>Action</NavDropdown.Item>
                <NavDropdown.Item onClick={ this._onClick.bind(this) }>Another action</NavDropdown.Item>
                <NavDropdown.Item onClick={ this._onClick.bind(this) }>Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={ this._onClick.bind(this) }>Separated link</NavDropdown.Item>
              </NavDropdown>
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

export default NbMenu;