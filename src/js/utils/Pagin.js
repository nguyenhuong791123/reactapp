import React, { Component as C } from "react";
import { Pagination } from 'react-bootstrap';

import Utils from './Utils';

class Pagin extends C {
  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
    this._onNext = this._onNext.bind(this);
    this._onNextAll = this._onNextAll.bind(this);
    this._onPrev = this._onPrev.bind(this);
    this._onPrevAll = this._onPrevAll.bind(this);

    this.state = {
      isUser: this.props.isUser
      ,objs: this.props.objs
      ,per: this.props.per
      ,active: 1
    }
  }

  _onClick(e) {
    var obj = e.target;
    console.log(obj);
    this.state.active = parseInt(obj.id);
    this.forceUpdate();
  }

  _onNext(e) {
    this.state.active += 1;
    this.forceUpdate();
  }

  _onNextAll(e) {
    this.state.active = (this.state.objs.length - 1);
    this.forceUpdate();
  }

  _onPrev(e) {
    this.state.active -= 1;
    this.forceUpdate();
  }

  _onPrevAll(e) {
    this.state.active = 1;
    this.forceUpdate();
  }

  _getPaginations() {
    console.log(this.state.objs);
    if(Utils.isEmpty(this.state.objs)) return "";
    const pC = Math.ceil(this.state.objs.length / this.state.per);
    var items = [];
    var active = this.state.active;
    console.log(active);
    var start = (active >= (pC - 5))?(pC - 5):active;
    console.log(start);
    for (let i=start; i<=pC; i++) {
      if(i >= (start + 5)) break;
      items.push(
        <Pagination.Item key={ i } id={ i } active={ i === active } onClick={ this._onClick.bind(this) }>
          { i }
        </Pagination.Item>
      );
    }
    return(
      <Pagination>
          {(() => {
              if(active > 2) { return ( <Pagination.First onClick={ this._onPrevAll.bind(this) } /> ); }
          })()}
          {(() => {
              if(active > 1) { return ( <Pagination.Prev onClick={ this._onPrev.bind(this) } /> ); }
          })()}
          { items }
          {(() => {
              if(active < (pC - 1)) { return ( <Pagination.Next onClick={ this._onNext.bind(this) } /> ); }
          })()}
          {(() => {
              if(active < (pC - 2)) { return ( <Pagination.Last onClick={ this._onNextAll.bind(this) } /> ); }
          })()}
      </Pagination>
    );
  }

  render() {
    return ( this._getPaginations() );
  }
}

export default Pagin;