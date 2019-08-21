import React, { Component as C } from 'react';
import { Button } from 'react-bootstrap';
import { FaReply, FaCheck } from 'react-icons/fa';

import { isEmpty } from './Utils';

export default class New extends C {
  constructor(props) {
    super(props);

    this._onClickReturn = this._onClickReturn.bind(this);
    this._onClickSubmit = this._onClickSubmit.bind(this);

    this.state = { }
  }

  _onClickReturn() {
    this.props.onClickReturn();
  }

  _onClickSubmit() {
    this.props.onClickSubmit();
  }

  _setLayoutActions(){
    var body = document.getElementById('div_body');
    // console.log(body);
    var bts = document.getElementById('div_button_action');
    // console.log(bts);
    if(!isEmpty(bts) && !isEmpty(body.className)) {
      var btClass = bts.className;
      if(body.className.indexOf("div-margin-right-22") !== -1) {
        bts.className = btClass + " " + body.className;
      } else {
        bts.className = btClass.replace(" div-margin-right-22", "");
      }
    }
  }

  componentDidMount() {
    this._setLayoutActions();
  }

  render() {
    return (
        <div id="div_button_action" className="div-actions-box">
            <Button onClick={ this._onClickReturn.bind(this) } variant="info"><FaReply />戻る</Button>
            <br />
            <Button type="submit" onClick={ this._onClickSubmit.bind(this) } variant="warning"><FaCheck />保存</Button>
        </div>
    )
  };
};