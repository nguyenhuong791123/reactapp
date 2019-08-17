import React, { Component as C } from 'react';
import { browserHistory } from '@version/react-router-v3';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, SizePerPageDropdownStandalone, PaginationListStandalone }  from 'react-bootstrap-table2-paginator';
// import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import * as Types from './utils/Types';
import View from './View';
import ContextMenu from './utils/ContextMenu';

import "../../css/List.css";

export default class List extends C {
  constructor(props) {
    super(props);

    this.divTableListRef = React.createRef();
    this.divContextMenuRef = React.createRef();
    this.onClickCreate = this.onClickCreate.bind(this);
    // console.log(this.Auth.getProfile());

    this.state = {
      objs: {
        show: false
        ,items: [
          { type: Types.EDIT, label: '編集'}
          ,{ type: Types.DELETE, label: '削除'}
          ,{ type: Types.DOWNLOAD, label: 'ダウロード'}
        ]
      }
      ,columns: this.getDatas().columns
      ,datas: this.getDatas().datas
      ,options: this.getOptions()
      ,defaultSorted: [{ dataField: 'id', order: 'asc' }, { dataField: 'name', order: 'desc' }]
      ,expandRow: {
        onlyOneExpanding: true
        ,showExpandColumn: true
        ,renderer: row => ( <View id={ row.id } /> )
        ,onExpandAll: (isExpandAll, rows, e) => {
          console.log(isExpandAll);
          console.log(rows);
          console.log(e);
          e.preventDefault();
          e.stopPropagation();
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
    return {
      custom: true
      ,showTotal: true
      ,totalSize: 30
      // ,paginationSize: 4
      // ,pageStartIndex: 1
      // ,firstPageText: 'First'
      // ,prePageText: 'Back'
      // ,nextPageText: 'Next'
      // ,lastPageText: 'Last'
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
        { dataField: 'id', text: '', sort: true, onSort: (field, order) => { console.log(field) }, filter: textFilter(), headerStyle: { minWidth: '50px', maxWidth: '50px' } }
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

  rowStyle = (row, rowIndex) => {
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

  onClickCreate() {
    browserHistory.push('/new');
    this.forceUpdate();
  }

  componentWillMount(){
    console.log(window.innerHeight);
  }

  render() {
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
                    {/* <td><PaginationTotalStandalone { ...paginationProps }/></td> */}
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
                    noDataIndication="Table is Empty"
                    classes="table-list"
                    rowStyle={ this.rowStyle }
                  />
                </div>
              </div>
            )
          }
        </PaginationProvider>
        {/* <BootstrapTable
          keyField='id'
          columns={ this.state.columns }
          data={ this.state.datas }
          selectRow={ this.state.selectRow }
          expandRow={ this.state.expandRow }
          pagination={ paginationFactory(this.state.options) } /> */}
      </div>
    )
  };
};