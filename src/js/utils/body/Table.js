
import React, { Component as C } from 'react';
import { Form } from 'react-bootstrap';
import { FaRegEye } from 'react-icons/fa';


import Utils from '../Utils';
import { HTML_TAG } from '../Types';
import GetMsg from '../../../msg/Msg';
import "../../../css/Table.css";

export default class Table extends C {
    constructor(props) {
        super(props);

        this._onSort = this._onSort.bind(this);
        this._onThKeyDown = this._onThKeyDown.bind(this);
        this._onTrClick = this._onTrClick.bind(this);
        this._onScroll = this._onScroll.bind(this);

        this.state = {
            isUser: this.props.isUser
            ,columns: this.props.columns
            ,datas: this.props.datas
            ,isCols: []
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
        var obj = e.target;
        if(obj.tagName === HTML_TAG.PATH || obj.tagName === HTML_TAG.SVG) return;
        if(obj.tagName === HTML_TAG.TD) {
            const idx = obj.getAttribute('idx');
            if(Utils.isEmpty(idx)) return;
            obj = e.target.parentElement;
        }
        if(Utils.isEmpty(obj.className) || obj.className.indexOf('selected') === -1) {
            obj.setAttribute('class', 'selected');
        } else {
            obj.removeAttribute('class');
        }
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
                            <input type={ HTML_TAG.CHECKBOX } />
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
        console.log(this.state.isCols);
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
                <tr key={ index } id={ o.id } onClick={ this._onTrClick.bind(this) }>
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

    componentDidMount() {
        const divHeader = document.getElementById('div_table_header');
        const divBody = document.getElementById('div_table_body');
        divBody.style.height = (window.innerHeight - (110 + divHeader.offsetHeight)) + 'px';
    }

    render() {
        return (
            <div className='div-table'>
                { this._getHeader() }
                { this._getBody() }
            </div>
        )
    };
};