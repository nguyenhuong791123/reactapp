import React, { Component as C } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Image } from 'react-bootstrap';
import { FaUser, FaSearch, FaTty, FaPhone, FaMailBulk, FaUserCog, FaSitemap, FaKey, FaLink, FaRocketchat } from 'react-icons/fa';

import { ACTION , LINK, NOT_LINK, PAGE, WINDOWN_WIDTH, DAILER, HTML_TAG } from './utils/Types';
import Utils from './utils/Utils';
import LMenu from "./utils/LMenu";
import RMenu from "./utils/RMenu";
import TabMenu from './utils/TabMenu';
import DailerBox from "./utils/DailerBox";

import Messages from '../msg/Msg';
import "../css/Index.css";
import "../css/SMenu.css";
import '../css/Header.css';
// import socket from './Socket';

class Header extends C {
  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this._onLogout = this._onLogout.bind(this);
    this._onOpenBoxPhone = this._onOpenBoxPhone.bind(this);
    this._onUpdateDailer = this._onUpdateDailer.bind(this);
    this._newWindow = this._newWindow.bind(this);
    // console.log(props.ua.device);
    // console.log(props.ua.language);
    // socket.emit('join room', 'room', 1);
    // socket.emit('chat message', 'room', 1, 1, 1, 'TEST');
    // socket.on('chat message', function(data){
    //     console.log(data);
    // });

    this.state = {
      isUser: this.props.isUser
      ,options: this.props.options
      ,right: ''
      ,menus: [
        { id: 1, view: LINK, target: 'target_00', label: 'label_00', level: 0, items: [] }
        ,{ id: 2, view: NOT_LINK, target: 'target_01', label: 'label_01', level: 0, items: 
          [
            { id: 3, view: LINK, target: 'target_001', level: 1, label: 'label_001' }
            ,{ id: 4, view: NOT_LINK, target: 'target_000', level: 1, label: 'label_000', items: 
              [
                { id: 5, view: 0, target: 'target_0000', level: 2, label: 'label_0000' }
              ]
            }
          ]
        }
        // ,{ id: 6, view: NOT_LINK, target: 'target_06', label: 'label_06', level: 0, items: 
        //   [
        //     { id: 7, view: LINK, target: 'target_003', level: 1, label: 'label_003' }
        //     ,{ id: 8, view: NOT_LINK, target: 'target_0003', level: 1, label: 'label_0003', items: 
        //       [
        //         { id: 9, view: NOT_LINK, target: 'target_00003', level: 2, label: 'label_00003', items: 
        //           [
        //             { id: 91, view: NOT_LINK, target: 'target_000003', level: 3, label: 'label_000003', items: 
        //               [
        //                 { id: 911, view: LINK, target: 'target_0000003', level: 4, label: 'label_0000003' }
        //               ]
        //             }
        //           ]
        //         }
        //         ,{ id: 10, view: LINK, target: 'target_0000031', label: 'target_0000031', level: 2 }
        //       ]
        //     }
        //   ]
        // }
        // ,{ id: 10, view: LINK, target: 'target_10', label: 'label_10-label_10', level: 0, items: [] }
        // ,{ id: 11, view: LINK, target: 'target_11', label: 'label_11', level: 0, items: [] }
        // ,{ id: 12, view: LINK, target: 'target_12', label: 'label_12', level: 0, items: [] }
        // ,{ id: 13, view: LINK, target: 'target_13', label: 'label_13', level: 0, items: [] }
        // ,{ id: 14, view: LINK, target: 'target_14', label: 'label_14-label_14', level: 0, items: [] }
        // ,{ id: 15, view: LINK, target: 'target_15', label: 'label_15', level: 0, items: [] }
        // ,{ id: 16, view: LINK, target: 'target_16', label: 'label_16', level: 0, items: [] }
        // ,{ id: 17, view: LINK, target: 'target_17', label: 'label_17', level: 0, items: [] }
        // ,{ id: 18, view: LINK, target: 'target_18', label: 'label_18-label_18', level: 0, items: [] }
        // ,{ id: 19, view: LINK, target: 'target_19', label: 'label_19', level: 0, items: [] }
        // ,{ id: 20, view: LINK, target: 'target_20', label: 'label_20', level: 0, items: [] }
        // ,{ id: 21, view: LINK, target: 'target_21', label: 'label_21', level: 0, items: [] }
        // ,{ id: 22, view: LINK, target: 'target_22', label: 'label_22', level: 0, items: [] }
        // ,{ id: 23, view: LINK, target: 'target_23', label: 'label_23', level: 0, items: [] }
        // ,{ id: 24, view: LINK, target: 'target_24', label: 'label_24', level: 0, items: [] }
        // ,{ id: 25, view: LINK, target: 'target_25', label: 'label_25', level: 0, items: [] }
      ]
      ,title: ''
      ,dailer: { register: false, isCall: false, audio: true, sound: true, show: false, top: 50, left: 0 }
      ,chats: { room: {}, data: [] }
    };
  }

  _onClick(e) {
    var obj = e.target;
    if(obj.tagName !== 'A') {
      if(obj.tagName === 'path') {
        obj = e.target.parentElement.parentElement;
      } else {
        obj = e.target.parentElement;
      }
      if(obj.tagName !== 'A') return;
    }

    const mode = obj.getAttribute('mode');
    if(mode !== 'menu-left') this._onClickButtonToggle();
    const action = obj.getAttribute('action');
    if(!Utils.isEmpty(action)) {
      if(!Utils.isEmpty(obj.id) && (obj.id === "a-chat-icon" || obj.id === "a-page-setting")) {
        const body = document.getElementById('div_body');
        const cl = body.className;
        if(!Utils.isEmpty(cl)
          && cl.indexOf('div-margin-right-22') !== -1
          && this.state.right !== action) {
            this.state.right = action;
            this.state.isUser.action = action;
            // return;
        } else {
          var svg = document.getElementById('div-right-chat-icon');
          if(!Utils.isEmpty(svg.parentElement.childNodes) && svg.parentElement.childNodes.length > 1) {
            svg.parentElement.childNodes[1].click();
            this.state.right = action;
            this.state.isUser.action = action;
          }  
        }

        if(obj.id === "a-chat-icon") {
          this.state.title = 'Messenger v0.1.0';
          console.log(this.state.title);
        }
        if(obj.id === "a-page-setting") {
          this.state.title = 'Page Setting';
          console.log(this.state.title);
        }
        this.forceUpdate();
        // return;
      } else {
        this.state.isUser.action = action;
        const url = window.location.protocol + '//' + window.location.host;
        var path = obj.href.replace(url, '').replace('#', '');
        this.state.isUser.path = path;
        this.props.onUpdateUser(this.state.isUser, this.state.options, this.props.onUpdateIsUserCallBack);  
      }
      console.log('HEADER _onClick complete !!!');
    } else {
      console.log('HEADER _onClick Not setting action !!!');
    }
  }

  _onLogout(){
    this.props.onLogout();
  }

  _onSelect(e){
    console.log(e);
  }

  _onOpenBoxPhone(e) {
    const obj = this.getLinkObj(e);
    if(!Utils.isEmpty(obj)) {
      if(window.innerWidth < WINDOWN_WIDTH) {
        this._onClickButtonToggle();
        this.state.dailer.top = '3em';
        this.state.dailer.left = (window.innerWidth - 250);
      } else {
        this.state.dailer.top = ((obj.offsetTop + obj.offsetHeight) + 5);
        this.state.dailer.left = ((obj.offsetLeft + obj.offsetWidth) - 245);  
      }        
    }
    this.state.dailer.show = (!this.state.dailer.show);
    this.forceUpdate();
  }

  _onClickButtonToggle() {
    var hBts = document.getElementById("basic-navbar-nav-toggle");
    if(!Utils.isEmpty(hBts) && window.innerWidth < WINDOWN_WIDTH) {
      if(hBts.tagName === "BUTTON") hBts.click();
      var btn = hBts.parentElement.childNodes[0];
      if(!Utils.isEmpty(btn) && btn.tagName === "BUTTON") btn.click();
    }
  }

  _onUpdateDailer(target) {
    if(Utils.isEmpty(target)) return;
    if(target === DAILER.REGISTER) this.state.dailer.register = !this.state.dailer.register;
    if(target === DAILER.CALL) this.state.dailer.isCall = !this.state.dailer.isCall;
    if(target === DAILER.SOUND) this.state.dailer.sound = !this.state.dailer.sound;
    if(target === DAILER.VIDEO) this.state.dailer.video = !this.state.dailer.video;
    this.forceUpdate();
  }

  // _onRegister() {
  //   this.state.dailer.register = !this.state.dailer.register;
  //   this.forceUpdate();
  // }

  // _onIsCall() {
  //   this.state.dailer.isCall = !this.state.dailer.isCall;
  //   this.forceUpdate();
  // }

  // _onSound(e) {
  //   this.state.dailer.sound = !this.state.dailer.sound;
  //   this.forceUpdate();
  // }

  // _onVideo(e) {
  //     this.state.dailer.video = !this.state.dailer.video;
  //     this.forceUpdate();
  // }

  getLinkObj(e) {
    var obj = e.target;
    if(obj.tagName !== 'A') {
      if(obj.tagName === 'path') {
        obj = e.target.parentElement.parentElement;
      } else {
        obj = e.target.parentElement;
      }
      if(Utils.isEmpty(obj) || obj.tagName !== 'A') return;
    }
    return obj;
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

  UNSAFE_componentWillMount() {
    if(this.state.options.dailer) {
      const Sipml5 = document.createElement(HTML_TAG.SCRIPT);
      Sipml5.setAttribute('type', 'text/javascript');
      Sipml5.setAttribute('src', 'src/SIPml-api.js');
      const webRtc = document.createElement(HTML_TAG.SCRIPT);
      webRtc.setAttribute('type', 'text/javascript');
      webRtc.setAttribute('src', 'src/WebRTC.js');
      const head = document.getElementsByTagName(HTML_TAG.HEAD)[0];
      head.appendChild(Sipml5);
      head.appendChild(webRtc);  
    }
  }

  // UNSAFE_componentDidMount() {
  //   this._loadButtonToggle();
  // }

  UNSAFE_componentWillReceiveProps(props) {
    console.log('HEADER componentWillReceiveProps');
    this.state.isUser = props.isUser;
    this.state.options = props.options;
  }

  // _loadButtonToggle() {
  //   var btn = document.getElementById("basic-navbar-nav-toggle");
  //   if(!Utils.isEmpty(btn) && !Utils.isEmpty(this.props.isUser)) {
  //     if(this.state.isUser.menu === 1) {
  //       btn.style.left = "1.5em";
  //     } else {
  //       btn.style.left = "0";  
  //     }
  //   }
  // }

  render() {
    if(!this.state.isUser.viewHeader) return "";
    // this._loadButtonToggle();
    const Msg = Messages[ this.props.isUser.language ];
    var menuType = (this.state.isUser.menu===1)?"tab_menu_1":"tab_menu_0";
    var menuClass = (this.state.isUser.menu===0)?" mr-auto-parent":""
    const isCallClass = (this.state.dailer.isCall && this.state.dailer.register)?"blinking":"";
    const Dailer = (this.state.options.dailer)?(<DailerBox
                                                  dailer={ this.state.dailer }
                                                  isUser={ this.props.isUser }
                                                  onOpenBoxPhone={ this._onOpenBoxPhone.bind(this) }
                                                  onUpdateDailer={ this._onUpdateDailer.bind(this) }/>):"";

    return (
      <div className="Headder">
        {/* 縦左メニュー */}
        {(() => {
          if(this.state.isUser.menu === 1) {
            return ( <LMenu isUser={ this.props.isUser } objs={ this.state.menus } onClick={ this._onClick.bind(this) }/> );
          }
        })()}
        {/* 「チャット、頁設定」を使用するときボックス */}
        <RMenu isUser={ this.props.isUser } title={ this.state.title }/>
        { Dailer }
        {/* <Navbar bg="dark" expand="lg" variant="dark"> */}
        <Navbar expand="lg">
          {/* アイコン、会社名（ホームページリンク） */}
          <a href="#home-page" page={ 'https://vnext.co.jp/company-info.html' } onClick={ this._newWindow.bind(this) } className={ 'header-image-icon' }>
            <Image src={ 'favicon.ico' } rounded />
            <span>SmartCRM Ver0.1.0</span>
          </a>

          <Navbar.Toggle aria-controls="basic-navbar-nav" id="basic-navbar-nav-toggle"/>
          {/* TOP横メニュー */}
          <Navbar.Collapse id={ menuType } className={ menuClass }>
            {(() => {
              if (this.state.isUser.menu === 0) {
                return (
                  <Nav className="mr-auto" id="div-nav-tab-menu">
                    <TabMenu isUser={ this.state.isUser } objs={ this.state.menus } onClick={ this._onClick.bind(this) }/>
                  </Nav>
                );
              }
              if (this.state.isUser.menu !== 0) {
                return (<div id="div-nav-tab-menu"></div>);
              }
            })()}

            {/* グローバル検索 */}
            <Form inline>
              <FormControl type="text" id="input_global_search" placeholder="Search" className="mr-sm-2" />
              <Nav.Link href="#search" className="global-search"><FaSearch /></Nav.Link>
            </Form>

            {/* 電話オプション */}
            {(() => {
              if(this.state.options.dailer) {
                return(
                  <Nav.Link onClick={ this._onOpenBoxPhone.bind(this) } className={ isCallClass }>
                    {(() => {
                        if(!this.state.dailer.register) { return ( <FaTty /> );
                      }
                    })()}
                    {(() => {
                        if(this.state.dailer.register) { return ( <FaPhone /> );
                      }
                    })()}
                  </Nav.Link>
                );
              }
            })()}
            {/* メールオプション */}
            {(() => {
              if(this.state.options.mail) {
                return(
                  <Nav.Link action={ PAGE.MAIL } onClick={ this._onClick.bind(this) }>{ <FaMailBulk /> }</Nav.Link>
                  );
              }
            })()}
            {/* チャットオプション */}
            {(() => {
              if(this.state.options.chat) {
                return(
                  <Nav.Link action={ PAGE.CHAT } onClick={ this._onClick.bind(this) } id="a-chat-icon">{ <FaRocketchat /> }</Nav.Link>
                );
              }
            })()}
            {/* ユーザーDropDown */}
            <NavDropdown title={<FaUser />} id="basic-nav-dropdown-right" alignRight>
              {/* ユーザー情報 */}
              <NavDropdown.Item action={ PAGE.USER } onClick={ this._onClick.bind(this) }>
                { <FaUserCog /> }
                <span>{ Utils.getJsonValue(Msg, 'bt_profile') }</span>
              </NavDropdown.Item>
              {/* 現頁設定 */}
              <NavDropdown.Item action={ PAGE.SETTING } onClick={ this._onClick.bind(this) } id="a-page-setting">
                { <FaSitemap /> }
                <span>{ Utils.getJsonValue(Msg, 'page_setting') }</span>
              </NavDropdown.Item>
              {/* システム設定（管理者のみ表示） */}
              <NavDropdown.Item action={ PAGE.SYSTEM } onClick={ this._onClick.bind(this) }>
                { <FaLink /> }
                <span>{ Utils.getJsonValue(Msg, 'system_setting') }</span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {/* ログアウト */}
              <Link to={ ACTION.SLASH } className="dropdown-item" onClick={ this._onLogout.bind(this) }>
                { <FaKey /> }
                <span>{ Utils.getJsonValue(Msg, 'bt_logout') }</span>
              </Link>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };
}

export default Header;