import React, { Component as C } from "react";
import { FaRocketchat } from 'react-icons/fa';
import { slide as Menu } from "react-burger-menu";

import { isEmpty } from './Utils';

var styles = {
  bmBurgerButton: { position: 'fixed', width: '20px', height: '30px', right: '80px', top: '16px', color: 'white' },
  bmBurgerBars: { background: '#373a47' },
  bmBurgerBarsHover: { background: '#a90000' },
  // bmCrossButton: { height: '24px', width: '24px' },
  bmCross: { background: '#bdc3c7' },
  bmMenuWrap: { position: 'fixed', height: '100%' },
  // bmMenu: { background: '#373a47', padding: '2.5em 1.5em 0', fontSize: '1.15em' },
  bmMenu: { background: '#373a47', padding: '0.5em' },
  bmMorphShape: { fill: '#373a47' },
  // bmItemList: { color: '#b8b7ad', padding: '0.8em' },
  bmItemList: { color: '#b8b7ad' },
  bmItem: { display: 'inline-block' },
  // bmOverlay: { background: 'rgba(0, 0, 0, 0.3)' }
  bmOverlay: { position: 'unset !important' }
}

class RMenu extends C {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);

    this.state = {
      isOpen: false
      ,menus: this.props.menus
    }
  }

  _onClick(e) {
    if(isEmpty(e.isOpen)) return;
    var body = document.getElementById('div_body');
    if(e.isOpen) {
      body.className = "div-margin-right-22";
    } else {
      body.className = "";
    }

    var bts = document.getElementById('div_button_action');
    if(!isEmpty(bts)) {
      var btClass = bts.className;
      if(e.isOpen) {
        bts.className = btClass + " div-margin-right-22";
      } else {
        bts.className = btClass.replace(" div-margin-right-22", "");
      }
    }
    // console.log(body);
  }

  render() {
    return (
      <div>
        <Menu
          styles={ styles }
          width={ '22%' }
          className="div-menu-right"
          { ...this.props }
          customBurgerIcon={ <FaRocketchat className="div-right-chat-icon" /> }
          customCrossIcon={ false }
          onStateChange={ this._onClick.bind(this) }
          right>
          <a className="menu-item" href="/">
            Home
          </a>
        </Menu>
      </div>
    );
  }
}

export default RMenu;

// export default props => {
//   // console.log(props);
//   return (
//     <div>
//       <Menu styles={ styles } className="div-menu-right" {...props} customBurgerIcon={ <FaRocketchat className="div-right-chat-icon" /> } customCrossIcon={ false } right>
//         <a className="menu-item" href="/">
//           Home
//         </a>
//       </Menu>
//     </div>
//   );
// };