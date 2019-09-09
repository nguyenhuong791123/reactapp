
import React, { Component as C } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Form from "react-jsonschema-form-bs4";

import Actions from '../utils/Actions';
import { ACTION, HTML_TAG } from '../utils/Types';
import { DRAG } from '../utils/HtmlTypes';
import Utils from '../utils/Utils';

import GetMsg from '../../msg/Msg';

class Create extends C {
  constructor(props) {
    super(props);

    this._onClickReturn = this._onClickReturn.bind(this);
    this._onClickSubmit = this._onClickSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onError = this._onError.bind(this);
    this._onValidate = this._onValidate.bind(this);

    this._onMouseDown = this._onMouseDown.bind(this);
    this._onDragStart = this._onDragStart.bind(this);
    // this._onDragEnter = this._onDragEnter.bind(this);
    this._onDragOver = this._onDragOver.bind(this);
    // this._onDragLeave = this._onDragLeave.bind(this);
    this._onDragDrop = this._onDragDrop.bind(this);
    // this._onDragEnd = this._onDragEnd.bind(this);
  
    this.state = {
      isUser: this.props.isUser
      ,draggable: 0
      ,dragobject: null
    }
  };

  _onClickReturn() {
    this.props.history.push(ACTION.SLASH + ACTION.LIST);
    this.forceUpdate();
  }

  _onClickSubmit() {
    console.log("Data submitted: ", this.state.formData);
  }

  _onChange(type) {
    console.log.bind(console, type);
  }

  _onError(errors) {
    console.log("I have", errors.length, "errors to fix");
  }

  _onValidate(formData, errors) {
    // if (formData.base_info.email === undefined || formData.base_info.email.length <= 0) {
    //   errors.base_info.email.addError("を入力してください。");
    // }
    // if (formData.base_info.checkboxs === undefined || formData.base_info.checkboxs.length <= 0) {
    //   errors.base_info.checkboxs.addError("を選択してください。");
    // }
    // if (formData.base_info.user_flag === undefined || formData.base_info.user_flag.length <= 0) {
    //   errors.base_info.user_flag.addError("を選択してください。");
    // }
    // if (formData.base_info.file === undefined || formData.base_info.file.length <= 0) {
    //   errors.base_info.file.addError("を選択してください。");
    // }
    // if (formData.base_info.files === undefined || formData.base_info.files.length <= 0) {
    //   errors.base_info.files.addError("を選択してください。");
    // }
    return errors;
  }

  UNSAFE_componentWillMount(){
    this.state.schema = {
        // title: "Widgets",
        type: "object",
        properties: {
          base_info: {
            type: "object"
            ,title: "基本情報"
            // ,required: [ "email", "uri" ]
            ,properties: {
              email: { type: "string", title: "メール", format: "email", }
              ,uri: { type: "string", format: "uri", }
            },
          },
          cust_info: {
            type: "object"
            ,title: "顧客情報"
            ,required: [ "cust_name_hira", "cust_name_kana" ]
            ,properties: {
              cust_name_hira: { type: "string" }
              ,cust_name_kana: { type: "string" }
            }
          },
          project_info: {
            type: "object"
            ,title: "顧客情報2"
            ,required: [ "cust_name_hira", "cust_name_kana" ]
            ,properties: {
              cust_name_hira: { type: "string" }
              ,cust_name_kana: { type: "string" }
            }
          }
        },
    }
    this.state.uiSchema = {
        base_info: {
          classNames: "draggable-top-box div-top-box div-top-box-50"
          ,email: { "ui:placeholder": "メール", classNames: "div-box div-box-50" }
          ,uri: { "ui:placeholder": "URL", classNames: "div-box div-box-50" }
        }
        ,cust_info: {
          classNames: "draggable-top-box div-top-box div-top-box-50"
          ,cust_name_hira: { "ui:placeholder": "顧客名", classNames: "div-box div-box-50" }
          ,cust_name_kana: { "ui:placeholder": "顧客カナ", classNames: "div-box div-box-50" }
        }
        ,project_info: {
          classNames: "draggable-top-box div-top-box div-top-box-50"
          ,cust_name_hira: { "ui:placeholder": "顧客名", classNames: "div-box div-box-50" }
          ,cust_name_kana: { "ui:placeholder": "顧客カナ", classNames: "div-box div-box-50" }
        }
    }
    this.state.formData = {}
  }

  UNSAFE_componentWillReceiveProps(props) {
    console.log('CREATE componentWillReceiveProps');
    this.state.isUser = props.isUser;
    console.log(this.state.isUser);
  }

  componentDidMount() {
    const div = document.getElementById('div-form');
    if(Utils.isEmpty(div)) return;
    if(Utils.isEmpty(div.childNodes[0])) return;
    if(Utils.isEmpty(div.childNodes[0].childNodes[0])) return;
    const divDrags = div.childNodes[0].childNodes[0].childNodes;
    div.childNodes[0].childNodes[0].addEventListener('mousedown', this._onMouseDown.bind(this), true);
    div.childNodes[0].childNodes[0].addEventListener('dragover', this._onDragOver.bind(this), false);
    div.childNodes[0].childNodes[0].addEventListener('drop', this._onDragDrop.bind(this), false);

    console.log(div.childNodes[0]);
    for(var i=0; i<divDrags.length; i++) {
      const drags = divDrags[i];
      const dragChilds = drags.childNodes[0].childNodes;
      if(Utils.isEmpty(dragChilds)) continue;
      drags.id = DRAG.ABLE + '_' + i;
      drags.setAttribute(DRAG.ABLE, 'true');
      drags.addEventListener(DRAG.START, this._onDragStart.bind(this), false);
      // drags.addEventListener('dragenter', this._onDragEnter.bind(this), false);
      // drags.addEventListener('dragover', this._onDragOver.bind(this), false);
      // drags.addEventListener('dragleave', this._onDragLeave.bind(this), false);
      // drags.addEventListener('drop', this._onDragDrop.bind(this), false);
      // drags.addEventListener('dragend', this._onDragEnd.bind(this), false);
      // drags.ondragstart = this._onDragStart.bind(this);
      // drags.ondragend = this._onDragEnd.bind(this);
      for(var c=0; c<dragChilds.length; c++) {
        const dDrag = dragChilds[c];
        if(c === 0 && dDrag.tagName === HTML_TAG.LEGEND) continue;
        dDrag.setAttribute(DRAG.ABLE, 'true');
        dDrag.ondragstart = this._onDragStart.bind(this);
        // const divs = dDrag.childNodes;
        // for(var d=0; d<divs.length; d++) {
        //   if(divs[d].tagName !== HTML_TAG.LABEL) continue;
        //   divs[d].style.cursor = 'move';
        // }
      }
    }
  }

  _onMouseDown(e) {
    console.log(e.target.tagName);
    if(e.target.tagName === HTML_TAG.LEGEND) {
      this.state.draggable = 1;
      this.state.dragobject = e.target.parentElement.parentElement;
    } else if(e.target.tagName === HTML_TAG.LABEL) {
      this.state.draggable = 2;
      this.state.dragobject = e.target.parentElement;
    } else {
      this.state.draggable = 0;
      this.state.dragobject = null;
    }
  }

  _onDragStart(e) {
    if(this.state.draggable !== 1 && this.state.draggable !== 2) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('_onDragStart');
  }

  // _onDragEnter(e) {
  //   console.log('_onDragEnter');
  //   console.log(e);
  // }

  _onDragOver(e) {
    e.preventDefault();
    console.log('_onDragOver');
    console.log(e);
  }

  // _onDragLeave(e) {
  //   console.log('_onDragLeave');
  //   console.log(e);
  // }

  _onDragDrop(e) {
    e.preventDefault();
    if(Utils.isEmpty(this.state.dragobject)) {
      e.stopPropagation();
      return;
    }
    console.log('_onDragDrop');
    if(this.state.draggable === 1 && e.target.tagName === HTML_TAG.LEGEND) {
      const div = e.target.parentElement.parentElement;
      if(Utils.isEmpty(div.id)) return;
      const dragId = this.state.dragobject.id.replace(DRAG.ABLE +'_', '');
      const dropId = div.id.replace(DRAG.ABLE + '_', '');
      if(parseInt(dragId) > parseInt(dropId)) {
        div.before(this.state.dragobject);
      } else {
        div.after(this.state.dragobject);
      }
      const fieldset = div.parentElement.childNodes;
      for(var i=0; i<fieldset.length; i++) {
        fieldset[i].id = DRAG.ABLE + '_' + i;
      }
    }
    if(this.state.draggable === 2 && e.target.tagName === HTML_TAG.LEGEND) {
      const div = e.target.parentElement;
      // div.before(this.state.dragobject);
    }
 }

  // _onDragEnd(e) {
  //   console.log('_onDragEnd');
  //   console.log(e);
  //   console.log(this.state.draggable);
  // }

  render() {
    return (
      <Form
        id='div-form'
        schema={ this.state.schema }
        uiSchema={ this.state.uiSchema } 
        widgets={ this.state.widgets }
        formData={ this.state.formData }
        onChange={ this._onChange("changed") }
        onSubmit={ this._onClickSubmit.bind(this) }
        validate={ this._onValidate.bind(this) }
        onError={ this._onError.bind(this) }>

        <Actions
          isUser={ this.state.isUser }
          onClickReturn={ this._onClickReturn.bind(this) }
          onClickSubmit={ this._onClickSubmit.bind(this) } />
      </Form>
    )
  };
};

export default connect()(withRouter(Create));