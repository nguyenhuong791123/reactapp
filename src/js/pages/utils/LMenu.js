import React, { Component as C } from "react";
import { Nav } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { slide as Menu } from "react-burger-menu";

import { LINK, NOT_LINK } from './Types';
import Utils from './Utils';

var styles = {
  bmBurgerButton: { position: 'fixed', width: '36px', height: '30px', left: '10px', top: '10px', color: 'white' },
  bmBurgerBars: { background: '#373a47' },
  bmBurgerBarsHover: { background: '#a90000' },
  bmCrossButton: { height: '24px', width: '24px' },
  bmCross: { background: '#bdc3c7' },
  bmMenuWrap: { position: 'fixed', height: '100%' },
  // bmMenu: { background: '#373a47', padding: '2.5em 1.5em 0', fontSize: '1.15em' },
  bmMenu: { background: '#373a47' },
  bmMorphShape: { fill: '#373a47' },
  // bmItemList: { color: '#b8b7ad', padding: '0.8em' },
  bmItemList: { color: '#b8b7ad' },
  bmItem: { display: 'inline-block' },
  bmOverlay: { background: 'rgba(0, 0, 0, 0.3)' }
}

class LMenu extends C {
  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);

    this.state = {
      menus: this.props.menus
    }
  }

  _onClick(e) {
    var obj = e.target;
    const view = parseInt(obj.getAttribute("view"));
    if(view === NOT_LINK) {
      const pObj = e.target.parentElement.parentElement;
      if(Utils.isEmpty(pObj)) return;
      const childs = e.target.parentElement.parentElement.childNodes;
      if(Utils.isEmpty(childs) || childs.length < 2) return;
      var className = childs[1].className;
      console.log(childs[1]);
      console.log(childs[1].className);

      if(className.indexOf('-hide') === -1) {
        className = className.replace('-show', '-hide');
      } else {
        className = className.replace('-hide', '-show');
      }
      console.log(className);
      childs[1].className = className;
      console.log(childs[1]);
      console.log(childs[1].className);

      // console.log(e.target);
      // console.log(e.target.parentElement);
      // console.log(e.target.parentElement.parentElement.childNodes[1]);
    } else {
      console.log(e);
    }
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
        return (
          <div key={ o.target }>
            <div className="dropright" key={ o.target }>
              <Nav.Link
                idx={ index }
                onClick={ this._onClick.bind(this) }
                className="dropdown-toggle"
                level={ o.level }
                view={ o.view }>{ o.label }</Nav.Link>
            </div>
            <div className="div-left-menu-child div-left-menu-child-hide">
              { this._getMenu(o.items) }
            </div>
          </div>
        );  
      }
    });
  }

  render() {
    return (
      <div>
        <Menu
          styles={ styles }
          className="div-left-menu"
          width={ '20%' }
          { ...this.props }
          customBurgerIcon={ <FaBars /> }
          customCrossIcon={ false }>
          { this._getMenu(this.state.menus) }
        </Menu>
      </div>
    );
  }
}

export default LMenu;