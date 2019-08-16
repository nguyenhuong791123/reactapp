import React, { Component as C } from 'react';
import onClickOutside from 'react-onclickoutside'
import { NavDropdown } from 'react-bootstrap';

import TwoMenu from './Alert';

class NavDropdownMenu extends C {
  constructor(props) {
    super(props);

    this._onShow = this._onShow.bind(this);
    this._onClick = this._onClick.bind(this);

    this.state = {
      show: true
      ,objs: [
        { view: 0, target: 'target_00', label: 'label_00' }
        ,{ view: 1, target: 'target_01', label: 'label_01' }
        ,{ view: 0, target: 'target_02', label: 'label_02' }
        ,{ view: 1, target: 'target_03', label: 'label_03' }
      ]
    }
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

    if(flag === 1) {
      e.preventDefault();
      e.stopPropagation();  
      this.setState({ show: true });
      this.forceUpdate();
    }
  }

  _onShow(e) {
    this.setState({ show: !this.state.show });
  }

  _getTowMenu() {
    return( <TwoMenu show={ this.state.show } top={ 100 } left={ 100 } objs={ this.state.objs } /> );
  }

  handleClickOutside = () => {
    this.setState({ show: false });
  }

  render() {
    var towMenu = this._getTowMenu();
    return (
      <div>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown" show={ this.state.show } onClick={ this._onShow.bind(this) }>
          <NavDropdown.Item onClick={ this._onClick.bind(this) } view="0">Action</NavDropdown.Item>
          <NavDropdown.Item onClick={ this._onClick.bind(this) } view="1">Another action</NavDropdown.Item>
          <NavDropdown.Item onClick={ this._onClick.bind(this) } view="0">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={ this._onClick.bind(this) } view="1">Separated link</NavDropdown.Item>
        </NavDropdown>
        { towMenu }
      </div>
    );
  }
}

export default onClickOutside(NavDropdownMenu);