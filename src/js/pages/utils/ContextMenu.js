import React, { Component as C } from 'react';
import onClickOutside from 'react-onclickoutside'
import { browserHistory } from '@version/react-router-v3';
import { Nav, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCloudDownloadAlt } from 'react-icons/fa';

import '../../../css/ContextMenu.css';

class ContextMenu extends C {
    constructor(props) {
        super(props);

        // this.divOnClickOutSideRef = React.createRef();
        this._onEdit = this._onEdit.bind(this);
        this._onDelete = this._onDelete.bind(this);
        this._onDownload = this._onDownload.bind(this);
        this.state = { objs: this.props.objs };
    };

    _onEdit() {
        this._onCloseAlert();
        console.log(this.state.objs);
        browserHistory.push({ pathname: '/edit', params: { objs: this.state.objs }});
    }

    _onDelete() {
        this._onCloseAlert();
        console.log(this.state.objs);
    }

    _onDownload() {
        this._onCloseAlert();
        console.log(this.state.objs);

    }

    _onCloseAlert() {
        this.state.objs.show = false;
        this.forceUpdate();
    }

    getLinkByType() {
        if(this.state.objs === undefined || this.state.objs.types === null || this.state.objs.types.length === 0) return "";
        return this.state.objs.types.map(t => {
            if(t === 'edit') {
                return (<div key='edit'><Nav.Link href="#" onClick={ this._onEdit.bind(this) }>{ <FaEdit /> }編集</Nav.Link></div>);
            } else if(t === 'delete') {
                return (<div key='delete'><Nav.Link href="#" onClick={ this._onDelete.bind(this) }>{ <FaTrash /> }削除</Nav.Link></div>);
            } else if(t === 'download') {
                return (<div key='download'><Nav.Link href="#" onClick={ this._onDownload.bind(this) }>{ <FaCloudDownloadAlt /> }ダウンロード</Nav.Link></div>);
            }
            return "";
          });
    }

    handleClickOutside = () => {
        this._onCloseAlert();
    }

    render() {
        var styles = { top: this.state.objs.top, left: this.state.objs.left };
        return (
            <div className="div-conenxt-menu" style={ styles }>
                <Alert show={this.state.objs.show}>
                    { this.getLinkByType() }
                </Alert>
            </div>
        )
    };
};

export default onClickOutside(ContextMenu);
