import React, { Component as C } from 'react';
// import ReactDOM from 'react-dom';
import { Nav, Tabs, Tab } from 'react-bootstrap';

import Utils from './Utils';
import "../../css/TabMenu.css";

class TabMenu extends C {
    constructor(props) {
        super(props);
  
        this._onSelect = this._onSelect.bind(this);
        this._onClick = this._onClick.bind(this);
        //   this._onShow = this._onShow.bind(this);
    //   this._onMouseOver = this._onMouseOver.bind(this)
  
        this.state = {
            isUser: this.props.isUser
            ,isActive: 1
            ,isSliderTab: 0
            ,isMargin: 0
            ,isLastChild: 0
        // ,id: this.props.id
        // ,title: this.props.title
        // ,show: false
        // ,level: 0
            ,objs: this.props.objs
        }
    }
  
    // _onClick(e) {
    //   console.log('NDMENU _onClick');
    //   var obj = this.getLinkObj(e);
    //   const view = parseInt(obj.getAttribute("view"));
    //   if(view === NOT_LINK) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     return;
    //   }
    //   const level = parseInt(obj.getAttribute("level"));
    //   var div = document.getElementById(this.state.id);
    //   const className = div.childNodes[0].className;
    //   if(className.indexOf('show ') === -1) {
    //     this._hideAllChildMenu(0);
    //   } else {
    //     this._hideAllChildMenu(level);
    //   }
    //   this.props.onClick(e);
    // }
  
    // _onMouseOver(e) {
    //   console.log('NDMENU _onMouseOver');
    //   console.log(e.target);
    //   var obj = this.getLinkObj(e);
    //   const view = parseInt(obj.getAttribute("view"));
    //   const level = parseInt(obj.getAttribute("level"));
    //   const divId = this.state.id + '_level_' + (level+1);
    //   if(view === NOT_LINK) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     console.log(e);
    //     var isExistObj = document.getElementById(divId);
    //     if(!Utils.isEmpty(isExistObj)) isExistObj.remove();
    //     const pObj = obj.parentElement.parentElement;
    //     isExistObj = pObj.cloneNode(true);
    //     isExistObj.id = divId;
    //     isExistObj.innerHTML = "";
    //     const idx = obj.getAttribute("idx");
    //     var items = [];
    //     var idxs = idx.split('-');
    //     // console.log(idxs);
    //     if(!Utils.isEmpty(idxs) && idxs.length === 1) {
    //       items = this.state.objs[idxs[0]].items;
    //     }
    //     if(!Utils.isEmpty(idxs) && idxs.length === 2) {
    //       items = this.state.objs[idxs[0]].items[idxs[1]].items;
    //     }
    //     if(!Utils.isEmpty(idxs) && idxs.length === 3) {
    //       items = this.state.objs[idxs[0]].items[idxs[1]].items[idxs[2]].items;
    //     }
    //     if(!Utils.isEmpty(idxs) && idxs.length === 4) {
    //       items = this.state.objs[idxs[0]].items[idxs[1]].items[idxs[2]].items[idxs[3]].items;
    //     }
  
    //     if(!Utils.isEmpty(items) && items.length > 0) {
    //       this._getMenuLinkBoxHTML(isExistObj, idx, items);
    //       const objPos = ReactDOM.findDOMNode(obj).getBoundingClientRect();
    //       isExistObj.style.top = (objPos.top) + 'px';
    //       isExistObj.style.left = (objPos.x + objPos.width) + 'px';
    
    //       var header = document.getElementById('div_header');
    //       header.appendChild(isExistObj);
    //       this.setState({ level: (level+1) });  
    //     }
  
    //     this._hideAllChildMenu((level+1));
    //     this.setState({ show: true });
    //     this.forceUpdate();
    //   } else {
    //     // console.log(e);
    //     var div = document.getElementById(this.state.id);
    //     const className = div.childNodes[0].className;
    //     if(className.indexOf('show ') === -1) {
    //       this._hideAllChildMenu(0);
    //     } else {
    //       this._hideAllChildMenu(level);
    //     }
    //   }
    // }
  
    // _onShow(e) {
    //   this.setState({ show: !this.state.show });
    // }
  
    // _getMenuLinkBoxHTML(pDiv, idx, items) {
    //   if(Utils.isEmpty(items) || items.length === 0) return "";
    //   return items.map((o, index) => {
    //     index = idx + '-' + index;
    //     if(o.view === LINK) {
    //       pDiv.appendChild(this._getMenuLink(o, index));
    //     } else {
    //       const nDiv = document.createElement('div');
    //       nDiv.className = "dropright"
    //       nDiv.appendChild(this._getMenuLink(o, index));
    //       pDiv.appendChild(nDiv);
    //     }
    //     return o;
    //   });
    // }
  
    // _getMenuLink(item, index) {
    //   const nObj = document.createElement('a');
    //   if(item.view === LINK) {
    //     nObj.className = "dropdown-item";
    //   } else {
    //     nObj.className = "dropdown-item dropdown-toggle";
    //   }
    //   nObj.innerHTML = item.label;
    //   nObj.setAttribute('idx', index);
    //   nObj.setAttribute('action', item.target);
    //   nObj.setAttribute('href', '#');
    //   nObj.setAttribute('level', item.level);
    //   nObj.setAttribute('view', item.view);
    //   nObj.onclick = this._onClick.bind(this);
    //   nObj.onmouseover = this._onMouseOver.bind(this);
    //   return nObj;
    // }
  
    // getLinkObj(e) {
    //   var obj = e.target;
    //   if(obj.tagName !== 'A') {
    //     if(obj.tagName === 'path') {
    //       obj = e.target.parentElement.parentElement;
    //     } else {
    //       obj = e.target.parentElement;
    //     }
    //     if(Utils.isEmpty(obj) || obj.tagName !== 'A') return;
    //   }
    //   return obj;
    // }

    _onSelect(tabIdx) {
        if(Utils.isEmpty(tabIdx)) return;
        // if(tabIdx === '-' || tabIdx === '+') {
        //     this._nextPrevTab(tabIdx);
        //     var div = document.getElementById('div-nav-tab-menu');
        //     // const active = (this.state.isActive+1);
        //     // console.log(active);
        //     const nav = div.childNodes[0];
        //     const navChilds = nav.childNodes;
        //     if(Utils.isEmpty(navChilds) || navChilds.length <= 0) return;
        //     console.log('isActive');
        //     console.log(this.state.isActive);
        //         for(var i=1; i<navChilds.length; i++) {
        //         if(i !== (this.state.isActive+1)) {
        //             navChilds[i].className = navChilds[i].className.replace(' active', '');
        //         } else {
        //             var className = navChilds[i].className;
        //             if(!Utils.isEmpty(className) && className.indexOf('active') === -1) {
        //                 navChilds[i].className = navChilds[i].className + ' active';
        //             }        
        //         }
        //     }
        //     return;
        // }
        // console.log('tabIdx');
        // console.log(tabIdx);
        this.state.isActive = parseInt(tabIdx);
    }

    _onClick(e) {
        const action = e.target.getAttribute("action");
        if(Utils.isEmpty(action) || (action !== '-' && action !== '+')) return;
        this._nextPrevTab(action, e.target);
    }

    _nextPrevTab(action, nextObj) {
        var div = document.getElementById('div-nav-tab-menu');
        const nav = div.childNodes[0].childNodes[1];
        if(Utils.isEmpty(nav)) return;
        const navChilds = nav.childNodes;
        if(Utils.isEmpty(navChilds) || navChilds.length <= 0) return;
        this.state.isSliderTab = (action === '-')?(this.state.isSliderTab+1):(this.state.isSliderTab-1);
        if(this.state.isSliderTab <= 0) this.state.isSliderTab = 0;
        const last1st = navChilds[navChilds.length-1];
        console.log(last1st.offsetLeft);
        console.log(nextObj.offsetLeft);
        if(last1st.offsetLeft <= nextObj.offsetLeft && action === '-') {
            this.state.isSliderTab = (this.state.isSliderTab-1);
            return;
        }

        console.log(this.state.isSliderTab);
        var isMargin = 0;
        if(this.state.isSliderTab !== 0) {
            const isTab = navChilds[this.state.isSliderTab];
            if(Utils.isEmpty(isTab)) return;
            isMargin = this.state.isMargin + parseInt(action + isTab.offsetWidth);
        }
        if(isMargin > 0) {
            return;
        }

        this.state.isMargin = isMargin;
        navChilds[0].style.marginLeft = isMargin + 'px';
    }
  
    _getTabs(items) {
        if(Utils.isEmpty(items) || items.length === 0) return "";
        return items.map((o, index) => {
            return (
                <Tab key={ index } eventKey={ index } title={ o.label }></Tab>
            );
        });
    }

    // UNSAFE_componentWillReceiveProps(props) {
    //     console.log('TABMENU componentWillReceiveProps');
    // }

    componentDidMount() {
        console.log('TABMENU componentDidMount');
        window.onresize = function(event) {
            var div = document.getElementById('div-nav-tab-menu');
            if(!Utils.isEmpty(div)) {
                const divContent = div.childNodes[1];
                if(!Utils.isEmpty(divContent)) divContent.remove();
                const nav = div.childNodes[0].childNodes[1];;
                console.log(div.offsetLeft);
                if(!Utils.isEmpty(nav)) {
                    const nl = nav.childNodes.length;
                    nav.style.width = (window.innerWidth - 610) + 'px';
                }
            }    
        };
        window.onresize();
    }
  
    render() {
      return (
            <div>
                <Nav.Link action={ '+' } onClick={ this._onClick.bind(this) }>{ '◀︎' }</Nav.Link>
                    <Tabs defaultActiveKey={ this.state.isActive } onSelect={ this._onSelect.bind(this) }>
                        { this._getTabs(this.state.objs) }
                    </Tabs>
                <Nav.Link action={ '-' } onClick={ this._onClick.bind(this) }>{ '▶︎' }</Nav.Link>
            </div>
        );
    }
}
  
export default TabMenu;