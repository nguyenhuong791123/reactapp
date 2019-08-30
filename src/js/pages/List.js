import React, { Component as C } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

import Pagination from '../utils/body/Pagin';

import { ACTION, HTML_TAG, PAGIN_PER, PAGIN_PER_LIST } from '../utils/Types';
import Utils from '../utils/Utils';
import GetMsg from '../../msg/Msg';
// import View from './View';

import "../../css/List.css";

class List extends C {
    constructor(props) {
        super(props);

        this.divTableListRef = React.createRef();
        this.divContextMenuRef = React.createRef();
        this._onClickCreate = this._onClickCreate.bind(this);
        this._onUpdateAtPage = this._onUpdateAtPage.bind(this);
        this._onPerChange = this._onPerChange.bind(this);
        // console.log(this.Auth.getProfile());

        this.state = {
            isUser: this.props.isUser
            ,objs: {
                show: false
                ,items: [
                    { type: ACTION.EDIT, label: GetMsg(null, this.props.isUser.language, 'bt_edit') }
                    ,{ type: ACTION.DELETE, label: GetMsg(null, this.props.isUser.language, 'bt_delete') }
                    ,{ type: ACTION.DOWNLOAD, label: GetMsg(null, this.props.isUser.language, 'bt_download') }
                ]
            }
            ,total: 230
            ,atPage: 1
            ,per: 20
            ,list: [
                // { item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
                // ,{ item1: "" }
            ]
        }
    };

    _onClickCreate() {
        this.props.history.push(ACTION.SLASH + ACTION.CREATE);
        this.forceUpdate();
    }

    _onPageChange(e) {
        console.log(e);
    }

    _onPerChange(e) {
        this.state.per = e.target.value;
    }

    _onUpdateAtPage(page) {
        if(Utils.isEmpty(page)) return;
        this.state.atPage = page;
        this.forceUpdate();
    }

    _getDatas() {
        this.state.list = {
            columns: [ { field: 'name', text: '', sort: true, filter: true, style: { minWidth: '100px', maxWidth: '100px' } } ]
            ,datas:[ { id: 1, name: "Item name 1", price3: 1001, price4: 1001, price5: 1001, price6: 1001 } ]
        };
    }

    _getPageCountPer() {
        var items = [];
        for (let i=1; i<=PAGIN_PER_LIST; i++) {
            items.push( <option key={ (i * PAGIN_PER) } value={ i }>{ (i * PAGIN_PER) }</option> );
        }
        return(
            <div className="div-count-per">
                <Form.Control as={ HTML_TAG.SELECT } onChange={ this._onPerChange.bind(this) }> { items }</Form.Control>
                <span>{ this.state.atPage }</span>
                <span>/</span>
                <span>{ Math.ceil(this.state.list.datas.length / this.state.per) }</span>
            </div>
        );
    }

    UNSAFE_componentWillReceiveProps(props) {
        console.log('LIST componentWillReceiveProps');
        this.state.isUser = props.isUser;
    }

    render() {
        this._getDatas();
      // if(Utils.isEmpty(this.props.isUser) || Utils.isEmpty(this.props.list)) return("");
        // const styles = { 'height': (window.innerHeight - 100 ) + 'px' };
        return (
            <div>
                <div className="div-pagin">
                    <h5>{ this.state.isUser.path + '/' + this.state.isUser.action }</h5>
                    <Button onClick={ this._onClickCreate.bind(this) } variant="primary">
                        <FaPlus />
                        { GetMsg(null, this.props.isUser.language, 'bt_create') }
                    </Button>
                    <Pagination
                        total={ this.state.total }
                        atPage={ this.state.atPage }
                        per={ this.state.per }
                        onUpdateAtPage={ this._onUpdateAtPage.bind(this) } />
                    {/* リスト件数PER件数より小さい場合表示されない */}
                    {(() => {
                      if(this.state.total > PAGIN_PER) {
                        return ( this._getPageCountPer() );
                      }
                    })()}
                </div>
            </div>
        )
    };
};

export default connect()(withRouter(List));