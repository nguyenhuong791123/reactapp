import React, { Component as C } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl } from 'react-bootstrap';
import { FaUser, FaSearch, FaPhone, FaMailBulk, FaUserCog, FaSitemap, FaLink, FaKey } from 'react-icons/fa';

import SMenu from "./pages/utils/SMenu";
import NbMenu from "./pages/utils/NbMenu";

import "../css/Index.css";
import "../css/SMenu.css";
import '../css/Header.css';
// import socket from './Socket';

class Header extends C {
  constructor(props) {
    super(props);

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
          <SMenu isUser={ this.props.isUser }/>
          <Navbar bg="dark" expand="lg" variant="dark">
            {/* <Navbar.Brand href="#home" className="a-homepage"><img src="favicon.ico" /></Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>

            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Nav.Link href="#search" className="global-search"><FaSearch /></Nav.Link>
            </Form>
    
            <Nav.Link href="#link">{ <FaPhone /> }</Nav.Link>
            <Nav.Link href="#link">{ <FaMailBulk /> }</Nav.Link>
            <Nav.Link href="#link"></Nav.Link>
            <NavDropdown title={<FaUser />} id="basic-nav-dropdown-right" alignRight>
            <NavDropdown.Item href="#action/3.1">{ <FaUserCog /> }<span>プロフィール</span></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">{ <FaSitemap /> }<span>ページ設定</span></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">{ <FaLink /> }<span>システム設定</span></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#logout" onClick={ this._onLogout }>{ <FaKey /> }<span>ログアウト</span></NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
          </Navbar>
        </div>
       );
    } else {
      return ( <NbMenu onLogout={ this.props.onLogout }/> );
    }
  };
}

export default Header;
