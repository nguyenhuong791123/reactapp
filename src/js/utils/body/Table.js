
import React, { Component as C } from 'react';
import { Form } from 'react-bootstrap';
import { FaRegEye } from 'react-icons/fa';

import CMenu from '../CMenu';

import Utils from '../Utils';
import { ACTION, HTML_TAG } from '../Types';
import GetMsg from '../../../msg/Msg';
import "../../../css/Table.css";

export default class Table extends C {
    constructor(props) {
        super(props);

        this.divContextMenuRef = React.createRef();
        this._onSort = this._onSort.bind(this);
        this._onThKeyDown = this._onThKeyDown.bind(this);
        this._onTrClick = this._onTrClick.bind(this);
        this._onContextMenu = this._onContextMenu.bind(this);
        this._onCheckBoxClick = this._onCheckBoxClick.bind(this);
        this._onScroll = this._onScroll.bind(this);

        this.state = {
            isUser: this.props.isUser
            ,columns: this.props.columns
            ,datas: this.props.datas
            ,isCols: []
            ,actions: {
                show: false
                ,ids: []
                ,items: [
                  { type: ACTION.EDIT, label: GetMsg(null, this.props.isUser.language, 'bt_edit') }
                  ,{ type: ACTION.DELETE, label: GetMsg(null, this.props.isUser.language, 'bt_delete') }
                  ,{ type: ACTION.DOWNLOAD, label: GetMsg(null, this.props.isUser.language, 'bt_download') }
                ]
              }
        };
    };

    _onSort(e) {
        console.log(e);
        console.log(e.target);
    }

    _onThKeyDown(e) {
        console.log(e);
        console.log(e.target);
        console.log(e.key);
        console.log(e.keyCode);
    }

    _onTrClick(e) {
        var obj = this._getObjTr(e);
        if(Utils.isEmpty(obj)) return;
        if(Utils.isEmpty(obj.className)
            || obj.className.indexOf('selected') === -1) {
            obj.setAttribute('class', 'selected');
        } else {
            obj.removeAttribute('class');
        }
    }

    _onContextMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        const ids = this._getTrSelected();
        if(Utils.isEmpty(ids) || ids.length <= 0) return;
        this.state.actions.show = true;
        this.state.actions.ids = ids;
        this.state.actions.top = e.pageY;
        this.state.actions.left = e.pageX;
        this.forceUpdate();
    }

    _onCheckBoxClick(e) {
        if(Utils.isEmpty(e.target) || e.target.type !== HTML_TAG.CHECKBOX) return;
        const isChecked = e.target.checked;
        var thead = e.target.parentElement.parentElement;
        if(thead.tagName !== HTML_TAG.TR) return;
        const tBody = this._getTBody();
        for(var i=0; i<tBody.childNodes.length; i++) {
            var obj = tBody.childNodes[i];
            if(isChecked) {
                obj.setAttribute('class', 'selected');
            } else {
                obj.removeAttribute('class');
            }
        };
    }

    _onScroll(e) {
        const divHeader = document.getElementById('div_table_header');
        var scroll = e.target.scrollLeft;
        if(Utils.isEmpty(scroll)) return;
        divHeader.style.marginLeft = -scroll + 'px';
    }

    _getHeader() {
        // [ { field: 'name', text: '', sort: true, filter: true, style: { width: '100px', minWidth: '100px', maxWidth: '100px' } } ]
        if(Utils.isEmpty(this.state.columns)) return "";
        this.state.isCols = [];
        var ths = this.state.columns.map((o, index) => {
            this.state.isCols.push(o.field);
            const key = 'label_' + o.field;
            var style = (Utils.inJson(o, 'style') && Utils.isEmpty(o.style))?'':o.style;
            if(Utils.isEmpty(style)) style = { width: 100 };
            const label = GetMsg(this.state.isUser.action, this.state.isUser.language, key);
            var isLabel = <label>{ label }</label>;
            if(Utils.inJson(o, 'filter') && o.filter) {
                isLabel = (<Form.Control type="text" placeholder={ label } onKeyDown={ this._onThKeyDown.bind(this) } />);
            }
            if(o.sort) {
                if(!Utils.isEmpty(style)) {
                    return(<th key={ index } style={ style } onClick={ this._onSort.bind(this) }>{ isLabel }</th>);
                } else {
                    return(<th key={ index } style={ style } onClick={ this._onSort.bind(this) }>{ isLabel }</th>);
                }
            } else {
                if(!Utils.isEmpty(style)) {
                    return(<th key={ index } style={ style }>{ isLabel }</th>);
                } else {
                    return(<th key={ index } style={ style }>{ isLabel }</th>);
                }
            }
        });

        return(
            <div id="div_table_header">
               <table className='table table-sm table-bordered'>
                <thead>
                    <tr>
                        <th>
                            <input type={ HTML_TAG.CHECKBOX } onClick={ this._onCheckBoxClick.bind(this) } />
                        </th>
                        { ths }
                    </tr>
                </thead>
                </table>
            </div>
        );
    }

    _getBody() {
        // [ { id: 1, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001 } ]
        if(Utils.isEmpty(this.state.datas)) return "";
        // console.log(this.state.isCols);
        var trs = this.state.datas.map((o, index) => {
            var keys = Object.keys(o);
            var tds = [];
            for(var i=0; i<keys.length; i++) {
                if(!Utils.inArray(this.state.isCols, keys[i])) continue;
                if(index === 0) {
                    var style = (Utils.inJson(this.state.columns[i], 'style') && !Utils.isEmpty(this.state.columns[i].style)?this.state.columns[i].style:'');
                    if(Utils.isEmpty(style)) style = { width: 100 };
                    if(!Utils.isEmpty(style)) {
                        tds.push(<td key={ i } idx={ i } style={ style }>{ o[keys[i]] }</td>);
                    } else {
                        tds.push(<td key={ i } idx={ i }>{ o[keys[i]] }</td>);
                    }   
                } else {
                    tds.push(<td key={ i } idx={ i }>{ o[keys[i]] }</td>);
                }
            }
            return(
                <tr key={ index } id={ o.id } onClick={ this._onTrClick.bind(this) } onContextMenu={ this._onContextMenu.bind(this) } >
                    <td><FaRegEye /></td>
                    { tds }
                </tr>
            );
        });

        return(
            <div id="div_table_body" onScroll={ this._onScroll.bind(this) }>
                <table className='table table-sm table-striped table-bordered table-hover'><tbody>{ trs }</tbody></table>
            </div>
        );
    }

    _getObjTr(e) {
        var obj = e.target;
        if(obj.tagName === HTML_TAG.PATH || obj.tagName === HTML_TAG.SVG) return null;
        if(obj.tagName === HTML_TAG.TD) {
            const idx = obj.getAttribute('idx');
            if(Utils.isEmpty(idx)) return null;
            obj = e.target.parentElement;
        }
        return obj;
    }

    _getTBody() {
        var tBody = document.getElementById('div_table_body').childNodes[0];
        if(Utils.isEmpty(tBody) || Utils.isEmpty(tBody.childNodes[0])) return;
        if(tBody.childNodes[0].tagName === HTML_TAG.TBODY) tBody = tBody.childNodes[0];
        return tBody;
    }

    _getTrSelected() {
        var ids = [];
        const tBody = this._getTBody();
        for(var i=0; i<tBody.childNodes.length; i++) {
            var trId =  tBody.childNodes[i].getAttribute('id');
            var className = tBody.childNodes[i].className;
            if(className !== 'selected'
                || Utils.isEmpty(trId)
                || !Utils.isNumber(trId)) continue;
                ids.push(trId);
        }
        return ids;
    }

    componentDidMount() {
        const divHeader = document.getElementById('div_table_header');
        const divBody = document.getElementById('div_table_body');
        divBody.style.height = (window.innerHeight - (110 + divHeader.offsetHeight)) + 'px';
    }

    render() {
        return (
            <div className='div-table'>
                { <CMenu ref={ this.divContextMenuRef } objs={ this.state.actions }/> }
                { this._getHeader() }
                { this._getBody() }
            </div>
        )
    };
};