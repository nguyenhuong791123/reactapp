import React, { Component as C } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
// import { browserHistory } from '@version/react-router-v3';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone }  from 'react-bootstrap-table2-paginator';
// import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';

import * as Types from '../utils/Types';
import Utils from '../utils/Utils';
import View from './View';
import ContextMenu from '../utils/ContextMenu';

import "../../css/List.css";

class List extends C {
  constructor(props) {
    super(props);

    this.divTableListRef = React.createRef();
    this.divContextMenuRef = React.createRef();
    this.onClickCreate = this.onClickCreate.bind(this);
    // console.log(this.Auth.getProfile());

    this.state = {
      isUser: this.props.isUser
      ,objs: {
        show: false
        ,items: [
          { type: Types.CREATE_EDIT, label: '編集'}
          ,{ type: Types.DELETE, label: '削除'}
          ,{ type: Types.DOWNLOAD, label: 'ダウロード'}
        ]
      }
      // ,columns: this._setTextFileter(this.props.route.list.columns)
      // ,datas: this.props.route.list.datas
      ,columns: this.getDatas().columns
      ,datas: this.getDatas().datas
      ,options: this.getOptions()
      ,defaultSorted: [{ dataField: 'id', order: 'asc' }, { dataField: 'name', order: 'desc' }]
      ,expandRow: {
        onlyOneExpanding: true
        ,showExpandColumn: true
        ,renderer: row => ( <View id={ row.id } isUser={ this.state.isUser } /> )
        ,onExpandAll: (isExpandAll, rows, e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log(isExpandAll);
          console.log(rows);
          console.log(e);
          // e.preventDefault();
          // e.stopPropagation();
        }
      }
      ,selectRow: {
        mode: 'checkbox'
        ,clickToSelect: true
        ,hideSelectColumn: true
        ,bgColor: (row, rowIndex) => ((rowIndex%2===0) ? 'rgba(54, 163, 173, .10)' : '#E7E7E7')
        ,onSelect: (row, isSelect, rowIndex, e) => {
          console.log(row.id);
          console.log(isSelect);
          console.log(rowIndex);
          console.log(e);
        }
      }
      ,rowEvents: {
        onContextMenu: (e, row, rowIndex) => {
          e.preventDefault();
          e.stopPropagation();
          this.state.objs.show = true;
          this.state.objs.id = row.id;
          this.state.objs.top = e.pageY;
          this.state.objs.left = e.pageX;
          console.log(e.pageX);
          console.log(e.pageY);
          // console.log(e.nativeEvent.offsetX);
          // console.log(e.nativeEvent.offsetY + 100);
          console.log(row.id);
          console.log(rowIndex);
          console.log(e);
          this.forceUpdate();
        }
      }
    }
  };

  getOptions() {
    const pageButtonRenderer = ({
      page,
      active,
      disabled,
      title,
      onPageChange
    }) => {
      const handleClick = (e) => {
        e.preventDefault();
        console.log(page);
        console.log(e.target);
        // const ul = e.target.parentElement.parentElement;
        // const l = ul.childNodes.length;
        // console.log(sizePerPageList);
        // for(var i = 0; i < l; i++) {
        //   var li = ul.childNodes[i];
        //   var a = ul.childNodes[0];
        //   li.className = li.className.replace('active ', '');
        //   console.log(a.innerText);
        //   if(a.innerText == page) {
        //     li.className = 'active ' + li.className;
        //   }
        // }
        // const liN = e.target.parentElement;
        // liN.className = 'active ' + li.className;
        // this.state.datas = this.state.datas[page];
        // this.forceUpdate();
        onPageChange(page);
      };
      return (
        <li className="page-item" key={ page }>
          <a href="#" className="page-link" onClick={ handleClick } >{ page }</a>
        </li>
      );
    };
  
    const sizePerPageOptionRenderer = ({
      text,
      page,
      onSizePerPageChange
    }) => (
      <li key={ text } role="presentation" className="dropdown-item" >
        <a href="#" tabIndex="-1" role="menuitem" data-page={ page }
          onMouseDown={ (e) => {
            e.preventDefault();
            console.log(e);
            console.log(page);
            onSizePerPageChange(page);
          } }
          // style={ { color: 'red' } }
        >
          { text }
        </a>
      </li>
    );
    
    
    return {
      custom: true
      ,showTotal: true
      ,totalSize: 30
      ,pageButtonRenderer
      ,sizePerPageOptionRenderer
      // ,paginationSize: 4
      // ,pageStartIndex: 1
      // ,firstPageText: '最初'
      // ,prePageText: '前'
      // ,nextPageText: '次'
      // ,lastPageText: '最後'
      ,sizePerPageList: [
        { text: '1', value: 1 }
        ,{ text: '5', value: 5 }
        ,{ text: '10', value: 10 }
        ,{ text: '15', value: 15 }
        ,{ text: '20', value: 20 }
        ,{ text: '30', value: 30 }
        // ,{ text: 'All', value: products.length }
      ]
    }
  }

  getDatas() {
    return {
      columns: [
        // { dataField: 'id', text: '', sort: true, onSort: (field, order) => { console.log(field) }, filter: textFilter(), headerStyle: { minWidth: '50px', maxWidth: '50px' } }
        // { dataField: 'id', text: '', sort: true, filter: textFilter(), filterRenderer: (onFilter, column) => { console.log(column); }, headerStyle: { minWidth: '50px', maxWidth: '50px' } }
        { dataField: 'id', text: '', sort: true, filter: textFilter({ placeholder: '#ID', onFilter:(filter) => { this._onFilter(filter) } }), headerStyle: { minWidth: '50px', maxWidth: '50px' } }
        ,{ dataField: 'name', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px', maxWidth: '100px' } }
        ,{ dataField: 'price3', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px', maxWidth: '100px' } }
        ,{ dataField: 'price4', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price5', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        // ,{ dataField: 'price6', text: 'Product Price6', sort: true, formatter: cell => this.getSelectOptions[cell], filter: selectFilter({ options: this.getSelectOptions(), defaultValue: 0 }) }
        ,{ dataField: 'price6', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price7', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price8', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price9', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price10', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price11', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price12', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price13', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price14', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price15', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price16', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price17', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price18', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price19', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price20', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price21', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price22', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price23', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price24', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price25', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price26', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price27', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price28', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price29', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
        ,{ dataField: 'price30', text: '', sort: true, filter: textFilter(), headerStyle: { minWidth: '100px' } }
      ]
      ,datas:[
        { id: 1, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 2, name: "Item name 2", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 3, name: "Item name 3", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 4, name: "Item name 4", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 5, name: "Item name 5", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 6, name: "Item name 6", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 7, name: "Item name 7", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 8, name: "Item name 8", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 9, name: "Item name 9", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 10, name: "Item name 10", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 11, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 12, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 13, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 14, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 15, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 16, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 17, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 18, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 19, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 20, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 21, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 22, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 23, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 24, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 25, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 26, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 27, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 28, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 29, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
        ,{ id: 30, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001, price7: 1001, price8: 1001, price9: 1001, price10: 1001, price11: 1001, price12: 1001, price13: 1001, price14: 1001, price15: 1001, price16: 1001, price17: 1001, price18: 1001, price19: 1001, price20: 1001, price21: 1001, price22: 1001, price23: 1001, price24: 1001, price25: 1001, price26: 1001, price27: 1001, price28: 1001, price29: 1001, price30: 1001 }
      ]
    };
  }

  // getSelectOptions() {
  //   return { 0: 'good', 1: 'Bad', 1001: 'unknown' };
  // }

  // componentWillMount(){
  //   this.forceUpdate();
  // }

  _rowStyle = (row, rowIndex) => {
    row.index = rowIndex;
    const style = {};
    if (rowIndex % 2 === 0) {
      style.backgroundColor = 'transparent';
    } else {
      style.backgroundColor = '#F5F5F5';
    }
    style.borderTop = 'none';

    return style;
  }

  _setTextFileter(objs) {
    if(Utils.isEmpty(objs)) return;
    return objs.map((o) => {
      if(!Utils.isEmpty(o.filter) && o.filter === "textFilter()") {
        o.filter = textFilter();
      } else if(!Utils.isEmpty(o.filter) && o.filter === "selectFilter()") {
        o.filter = selectFilter({ options: {} });
      }
      return o;
    });
  }

  _onFilter(filter) {
    console.log(filter);
    return filter;
  }

  onClickCreate() {
    this.props.history.push('/' + Types.CREATE_EDIT);
    this.forceUpdate();
  }

  componentDidUpdate() {
    // this._removeExpandRowAll();
  }

  componentDidMount(){
    // this._removeExpandRowAll();
    console.log('componentDidMount' + window.innerHeight);
    // this.forceUpdate();
  }

  componentWillMount(){
    console.log('componentWillMount' + window.innerHeight);
    // const headers = {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json'
    // }

    // if ( this.state.isUser.token !== undefined &&  this.state.isUser.token !== null) {
    //     headers['Authorization'] = 'Bearer ' + this.state.isUser.token
    // }

    // var datas = fetch('http://192.168.10.6:8085/list', {
    //     method: "POST"
    //     ,mode: "cors"
    //     ,cache: "no-cache"
    //     ,credentials: "same-origin"
    //     ,headers: headers
    //     ,redirect: "follow"
    //     ,referrer: "no-referrer"
    //     ,body: JSON.stringify({ path: this.state.isUser.path })
    // }//).then(status
    // ).then(res => {
    //     if (res.ok) {
    //       return res.json(); 
    //     }
    // }).then(json => {
    //     return json;
    // });

    // datas.then(data => {
    //   var jd = JSON.parse(data);
    //   this.state.list.columns = jd.columns;
    //   this.state.list.datas = jd.datas;
    //   console.log(this.state);
    //   this.forceUpdate();
    // });
  }

  _onPageChange(e) {
    console.log(e);
  }

  // _removeExpandRowAll() {
  //   var tbl = document.getElementById('div-react-bootstrap-table');
  //   var tr = tbl.childNodes[0].childNodes[0];
  //   console.log(tr);
  //   if(!Utils.isEmpty(tr)) {
  //     const th = tbl.childNodes[0].childNodes[0].childNodes;
  //     for(var i=0; i<th.length; i++) {
  //       const attr = th[i].getAttribute('data-row-selection');
  //       if(attr === 'true') {
  //         th[i].className = 'th-expand-row-all';
  //         th[i].style.display = 'none';
  //         break;
  //       }
  //     }
  //     console.log(th);
  //     const th0 = tbl.childNodes[0].childNodes[0].childNodes[0];
  //     if(!Utils.isEmpty(th0) && th0.innerText !== '') {
  //       tr.insertCell(0).outerHTML = '<th></th>';
  //     }
  //   }
  // }

  render() {
    // if(Utils.isEmpty(this.props.isUser) || Utils.isEmpty(this.props.list)) return("");
    const styles = { 'height': (window.innerHeight - 100 ) + 'px' };
    return (
      <div>
        {<ContextMenu ref={ this.divContextMenuRef } objs={ this.state.objs }/>}
        <PaginationProvider pagination={ paginationFactory(this.state.options) }>
          { ({ paginationProps, paginationTableProps }) => (
              <div>
                <table className="table-pagination-header">
                  <tbody>
                  <tr>
                    <td></td>
                    <td>
                      <SizePerPageDropdownStandalone { ...paginationProps }/>
                      <Button onClick={ this.onClickCreate.bind(this) } variant="primary"><FaPlus />新規</Button>
                      <PaginationListStandalone { ...paginationProps }/>
                    </td>
                  </tr>
                  </tbody>
                </table>

                <div className="div-react-bootstrap-table" style={ styles }>
                  <BootstrapTable
                    id="div-react-bootstrap-table"
                    ref={ this.divTableListRef }
                    keyField='id'
                    { ...paginationTableProps }
                    defaultSorted={ this.state.defaultSorted } 
                    columns={ this.state.columns }
                    data={ this.state.datas }
                    selectRow={ this.state.selectRow }
                    expandRow={ this.state.expandRow }
                    filter={ filterFactory() }
                    rowEvents={ this.state.rowEvents }
                    noDataIndication="検索結果ありません。"
                    classes="table-list"
                    rowStyle={ this._rowStyle }
                  />
                </div>
              </div>
            )
          }
        </PaginationProvider>
      </div>
    )
  };
};

export default connect()(withRouter(List));