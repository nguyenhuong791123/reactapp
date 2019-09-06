
import React, { Component as C } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Form from "react-jsonschema-form-bs4";

import Actions from '../utils/Actions';
import { ACTION } from '../utils/Types';

import GetMsg from '../../msg/Msg';

class Create extends C {
  constructor(props) {
    super(props);

    this._onClickReturn = this._onClickReturn.bind(this);
    this._onClickSubmit = this._onClickSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onError = this._onError.bind(this);
    this._onValidate = this._onValidate.bind(this)

    this.state = {
      isUser: this.props.isUser
    }
  };

  UNSAFE_componentWillMount(){
    this.state.schema = {
      type: "object",
      properties: {
        base_info: {
          type: "object"
          ,title:  GetMsg(null, this.props.isUser.language, 'base_info')
          // ,required: [ "file", "files" ]
          ,properties: {
            password: { "type": "string", "title": "Password", "minLength": 4 }
          },
        }
      }
    }
    this.state.uiSchema = {
      base_info: {
        classNames: "div-top-box div-top-box-100 div-box-not-view-label"
        ,password: { "ui:widget": "password", classNames: "div-box div-box-25 div-box-not-view-label" }
      }
    }
    this.state.formData = {}
  }

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

  UNSAFE_componentWillReceiveProps(props) {
    console.log('CREATE componentWillReceiveProps');
    this.state.isUser = props.isUser;
    console.log(this.state.isUser);
  }

  render() {
    return (
      <Form
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