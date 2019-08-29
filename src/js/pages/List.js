import React, { Component as C } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { ACTION } from '../utils/Types';
// import Utils from '../utils/Utils';
// import View from './View';

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
          { type: ACTION.EDIT, label: '編集'}
          ,{ type: ACTION.DELETE, label: '削除'}
          ,{ type: ACTION.DOWNLOAD, label: 'ダウロード'}
        ]
      }
    }
  };

  onClickCreate() {
    this.props.history.push(ACTION.SLASH + ACTION.CREATE);
    this.forceUpdate();
  }

  _onPageChange(e) {
    console.log(e);
  }

  // UNSAFE_componentWillMount(){
  //   console.log('LIST UNSAFE_componentWillMount');
  // }

  // UNSAFE_componentDidUpdate() {
  //   console.log('LIST UNSAFE_componentDidUpdate');
  // }

  // UNSAFE_componentDidMount(){
  //   console.log('LIST UNSAFE_componentDidMount');
  // }

  UNSAFE_componentWillReceiveProps(props) {
    console.log('LIST componentWillReceiveProps');
    this.state.isUser = props.isUser;
    // console.log(props);
    // console.log(this.state);
    // console.log(this.props);
    // console.log(sessionService.loadUser('COOKIES'));
    // console.log(props);
  }

  render() {
    // if(Utils.isEmpty(this.props.isUser) || Utils.isEmpty(this.props.list)) return("");
    // const styles = { 'height': (window.innerHeight - 100 ) + 'px' };
    return (
      <div>
        { this.state.isUser.path + '/' + this.state.isUser.action }
      </div>
    )
  };
};

export default connect()(withRouter(List));