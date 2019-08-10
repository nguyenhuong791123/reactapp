import React from "react";
import { Nav } from 'react-bootstrap';
import { FaBars, FaRocketchat } from 'react-icons/fa';
import { slide as MenuLeft, slide as MenuRight } from "react-burger-menu";

var stylesMenuLeft = {
  bmBurgerButton: { position: 'fixed', width: '36px', height: '30px', left: '10px', top: '10px', color: 'white' },
  bmBurgerBars: { background: '#373a47' },
  bmBurgerBarsHover: { background: '#a90000' },
  bmCrossButton: { height: '24px', width: '24px' },
  bmCross: { background: '#bdc3c7' },
  bmMenuWrap: { position: 'fixed', height: '100%' },
  // bmMenu: { background: '#373a47', padding: '2.5em 1.5em 0', fontSize: '1.15em' },
  bmMenu: { background: '#373a47', padding: '1em' },
  bmMorphShape: { fill: '#373a47' },
  // bmItemList: { color: '#b8b7ad', padding: '0.8em' },
  bmItemList: { color: '#b8b7ad' },
  bmItem: { display: 'inline-block' },
  bmOverlay: { background: 'rgba(0, 0, 0, 0.3)' }
}

var stylesMenuRight = {
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

export default props => {
  // console.log(props);
  return (
    <div>
      <MenuLeft styles={ stylesMenuLeft } className="div-menu-left" {...props} customBurgerIcon={ <FaBars /> } customCrossIcon={ false }>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
        <Nav.Link href="#link">Home</Nav.Link><br/>
      </MenuLeft>

      <MenuRight styles={ stylesMenuRight } className="div-menu-right" {...props} customBurgerIcon={ <FaRocketchat className="div-right-chat-icon" /> } customCrossIcon={ false } right>
        <a className="menu-item" href="/">
          Home
        </a>
      </MenuRight>
    </div>
  );
};