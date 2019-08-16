import React, { Component as C } from 'react';
import onClickOutside from 'react-onclickoutside'
import { NavDropdown } from 'react-bootstrap';

class NavDropdownMenu extends C {
  constructor(props) {
    super(props);

    this._onShow = this._onShow.bind(this);
    this._onClick = this._onClick.bind(this);

    this.state = { isShow: false }
  }

  _onClick(e) {
    var obj = e.target;
    if(obj.tagName != 'A') {
      if(obj.tagName === 'path') {
        obj = e.target.parentElement.parentElement;
      } else {
        obj = e.target.parentElement;
      }
      if(obj.tagName != 'A') return;
    }
    const flag = parseInt(obj.getAttribute("view"));
    console.log(flag==1);
    if(flag === 1) {
      e.preventDefault();
      e.stopPropagation();  
      this.setState({ isShow: true });
    }
  }

  _onShow(e) {
    this.setState({ isShow: !this.state.isShow });
  }

  handleClickOutside = () => {
    this.setState({ isShow: false });
  }

  render() {
      return ( 
        <NavDropdown title="Dropdown" id="basic-nav-dropdown" show={ this.state.isShow } onClick={ this._onShow.bind(this) }>
            <NavDropdown.Item onClick={ this._onClick.bind(this) } view="0">Action</NavDropdown.Item>
            <NavDropdown.Item onClick={ this._onClick.bind(this) } view="1">Another action</NavDropdown.Item>
            <NavDropdown.Item onClick={ this._onClick.bind(this) } view="0">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={ this._onClick.bind(this) } view="1">Separated link</NavDropdown.Item>
        </NavDropdown>
    );
  }
}

export default onClickOutside(NavDropdownMenu);