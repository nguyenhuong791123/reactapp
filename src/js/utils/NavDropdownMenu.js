import React, { Component as C } from 'react';
import ReactDOM from 'react-dom';
import onClickOutside from 'react-onclickoutside'
import { NavDropdown } from 'react-bootstrap';

import { LINK, NOT_LINK } from './Types';
import Utils from './Utils';

class NavDropdownMenu extends C {
  constructor(props) {
    super(props);

    this._onShow = this._onShow.bind(this);
    this._onClick = this._onClick.bind(this);

    this.state = {
      id: this.props.id
      ,title: this.props.title
      ,show: false
      ,level: 0
      ,objs: this.props.objs
    }
  }

  _onClick(e) {
    var obj = this.getLinkObj(e);
    const view = parseInt(obj.getAttribute("view"));
    const level = parseInt(obj.getAttribute("level"));
    const divId = this.state.id + '_level_' + (level+1);
    if(view === NOT_LINK) {
      e.preventDefault();
      e.stopPropagation();
      console.log(e);
      var isExistObj = document.getElementById(divId);
      if(!Utils.isEmpty(isExistObj)) isExistObj.remove();
      const pObj = obj.parentElement.parentElement;
      isExistObj = pObj.cloneNode(true);
      isExistObj.id = divId;
      isExistObj.innerHTML = "";
      const idx = obj.getAttribute("idx");
      var items = [];
      var idxs = idx.split('-');
      // console.log(idxs);
      if(!Utils.isEmpty(idxs) && idxs.length === 1) {
        items = this.state.objs[idxs[0]].items;
      }
      if(!Utils.isEmpty(idxs) && idxs.length === 2) {
        items = this.state.objs[idxs[0]].items[idxs[1]].items;
      }
      if(!Utils.isEmpty(idxs) && idxs.length === 3) {
        items = this.state.objs[idxs[0]].items[idxs[1]].items[idxs[2]].items;
      }
      if(!Utils.isEmpty(idxs) && idxs.length === 4) {
        items = this.state.objs[idxs[0]].items[idxs[1]].items[idxs[2]].items[idxs[3]].items;
      }

      if(!Utils.isEmpty(items) && items.length > 0) {
        this._getMenuLinkBoxHTML(isExistObj, idx, items);
        const objPos = ReactDOM.findDOMNode(obj).getBoundingClientRect();
        isExistObj.style.top = (objPos.top) + 'px';
        isExistObj.style.left = (objPos.x + objPos.width) + 'px';
  
        var header = document.getElementById('div_header');
        header.appendChild(isExistObj);
        this.setState({ level: (level+1) });  
      }

      this._hideAllChildMenu((level+1));
      this.setState({ show: true });
      this.forceUpdate();
    } else {
      console.log(e);
      var div = document.getElementById(this.state.id);
      const className = div.childNodes[0].className;
      if(className.indexOf('show ') === -1) {
        this._hideAllChildMenu(0);
      } else {
        this._hideAllChildMenu(level);
      }
    }
  }

  _onShow(e) {
    this.setState({ show: !this.state.show });
  }

  _getMenuLinkBoxHTML(pDiv, idx, items) {
    if(Utils.isEmpty(items) || items.length === 0) return "";
    return items.map((o, index) => {
      index = idx + '-' + index;
      if(o.view === LINK) {
        pDiv.appendChild(this._getMenuLink(o, index));
      } else {
        const nDiv = document.createElement('div');
        nDiv.className = "dropright"
        nDiv.appendChild(this._getMenuLink(o, index));
        pDiv.appendChild(nDiv);
      }
      return o;
    });
  }

  _getMenuLink(item, index) {
    const nObj = document.createElement('a');
    if(item.view === LINK) {
      nObj.className = "dropdown-item";
    } else {
      nObj.className = "dropdown-item dropdown-toggle";
    }
    nObj.innerHTML = item.label;
    nObj.setAttribute('idx', index);
    nObj.setAttribute('level', item.level);
    nObj.setAttribute('view', item.view);
    nObj.onclick = this._onClick.bind(this);
    nObj.onmouseover = this._onClick.bind(this);
    return nObj;
  }

  handleClickOutside = (e) => {
    var obj = this.getLinkObj(e);
    if(!Utils.isEmpty(obj)) {
      const view = obj.getAttribute("view");
      if(view === NOT_LINK) return;
    }
    this.setState({ show: false });
    var level = 0;
    if(!Utils.isEmpty(obj)) level = obj.getAttribute("level");
    this._hideAllChildMenu(level);
  }

  _hideAllChildMenu(level) {
    for(var idx = 0; idx <= this.state.level; idx++) {
      if(idx < (level+1)) continue;
      var isExistObj = document.getElementById(this.state.id + '_level_' + idx);
      if(!Utils.isEmpty(isExistObj)) {
        isExistObj.remove();
      }
    }  
  }

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

  _getMenuLinkBox(items) {
    if(Utils.isEmpty(items) || items.length === 0) return "";
    return items.map((o, index) => {
      if(o.view === LINK) {
        return (
          <NavDropdown.Item
            key={ o.target }
            idx={ index }
            onClick={ this._onClick.bind(this) }
            onMouseOver={ this._onClick.bind(this) }
            level={ o.level }
            view={ o.view }>{ o.label }</NavDropdown.Item>);
      } else {
        return (
          <div className="dropright" key={ o.target }>
            <NavDropdown.Item
              idx={ index }
              onClick={ this._onClick.bind(this) }
              onMouseOver={ this._onClick.bind(this) }
              className="dropdown-toggle"
              level={ o.level }
              view={ o.view }>{ o.label }</NavDropdown.Item>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div id={ this.state.id }>
        <NavDropdown title={ this.state.title } show={ this.state.show } onClick={ this._onShow.bind(this) }>
          { this._getMenuLinkBox(this.state.objs) }
        </NavDropdown>
      </div>
    );
  }
}

export default onClickOutside(NavDropdownMenu);