import React, { Component as C } from "react";
import { Pagination } from 'react-bootstrap';

import Utils from './Utils';

class Pagin extends C {
  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);

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
  }

  _getPaginations() {
      if(Utils.isEmpty(this.objs)) return "";
      const pC = (this.objs.length / this.state.per);
      return(
        <Pagination>
            {(() => {
                if(pC > 6) { return ( <Pagination.First /> ); }
                if(pC > 5) { return ( <Pagination.Prev /> ); }
                for(var i=1; i<=pC; i++) {
                  if(i === this.state.active) {
                    return ( <Pagination.Item active>{ i }</Pagination.Item> );
                  } else {
                    return ( <Pagination.Item>{ i }</Pagination.Item> );
                  }
                }
                if(pC > 5) { return ( <Pagination.Next /> ); }
                if(pC > 6) { return ( <Pagination.Last /> ); }
            })()}
        </Pagination>
      );
  }

  render() {
    return ( this._getPaginations() );
  }
}

export default Pagin;