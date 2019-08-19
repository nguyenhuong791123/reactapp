import React, { Component as C } from 'react';
import onClickOutside from 'react-onclickoutside'
// import { browserHistory } from '@version/react-router-v3';
import { Nav, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCloudDownloadAlt } from 'react-icons/fa';

import * as Types from './Types';
import '../../../css/ContextMenu.css';

class ContextMenu extends C {
    constructor(props) {
        super(props);

        this._onClick = this._onClick.bind(this);
        this.state = { objs: this.props.objs };
    };

    _onClick(e) {
        const obj = e.target;
        console.log(obj.getAttribute("action"));
        console.log(this.state.objs);
        this._onCloseAlert();
    }

    _onCloseAlert() {
        this.state.objs.show = false;
        this.forceUpdate();
    }

    getLinkByType() {
        if(this.state.objs === undefined || this.state.objs.items === undefined || this.state.objs.items.length === 0) return "";
        return this.state.objs.items.map( o => {
            var icon = '';
            if(o.type === Types.EDIT) {
                icon = <FaEdit />;
            } else if(o.type === Types.DELETE) {
                icon = <FaTrash />;
            } else if(o.type === Types.DOWNLOAD) {
                icon = <FaCloudDownloadAlt />;
            }
            return (<Nav.Link key={ o.type } href="#" action={ o.type } onClick={ this._onClick.bind(this) }>{ icon }{ o.label }</Nav.Link>);
          });
    }

    handleClickOutside = () => {
        this._onCloseAlert();
    }

    render() {
        var styles = { top: this.state.objs.top, left: this.state.objs.left };
        return (
            <div className="div-context-menu" style={ styles }>
                <Alert show={this.state.objs.show}>
                    { this.getLinkByType() }
                </Alert>
            </div>
        )
    };
};

export default onClickOutside(ContextMenu);
