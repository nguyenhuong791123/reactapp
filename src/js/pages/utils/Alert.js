import React, { Component as C } from 'react';
import { browserHistory } from '@version/react-router-v3';
import { Nav, Alert } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCloudDownloadAlt } from 'react-icons/fa';

import '../../../css/Alert.css';

class AlertBox extends C {
    constructor(props) {
        super(props);

        this._onClick = this._onClick.bind(this);
        this.state = {
            show: this.props.show
            ,top: this.props.top
            ,left: this.props.left
            ,objs: this.props.objs
        };
    };

    _onClick(e) {
        this.props.onClick(e);
        // console.log(this.state.objs);
        // browserHistory.push({ pathname: '/list', params: { objs: this.state.objs }});
    }

    getLinkByType() {
        if(this.state.objs === undefined || this.state.objs === null || this.state.objs.length === 0) return "";
        return this.state.objs.map(o => {
            return (
                <div key={ o.target }>
                    <Nav.Link target={ o.target } view={ o.view } onClick={ this._onClick.bind(this) }>
                        { <FaEdit /> }{ o.label }
                    </Nav.Link>
                </div>
            );
        });
    }

    render() {
        var styles = { top: this.state.top, left: this.state.left };
        return (
            <div className="div-alert-menu" style={ styles }>
                <Alert show={this.state.show}>
                    { this.getLinkByType() }
                </Alert>
            </div>
        )
    };
};

export default AlertBox;
