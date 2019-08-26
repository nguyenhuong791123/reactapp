import React, { Component as C } from 'react';
import { Alert, FormControl, InputGroup, Button } from 'react-bootstrap';
// import { FaEdit, FaTrash, FaCloudDownloadAlt } from 'react-icons/fa';

import Utils from './Utils';
import '../../css/Dailer.css';

class DailerBox extends C {
    constructor(props) {
        super(props);

        this._onClick = this._onClick.bind(this);
        this.state = {
            isUser: this.props.isUser
            ,dailer: this.props.dailer
            ,title: 'SmartCRM Ver0.1.0'
            ,objs: [
                [
                    { id: 1, variant: 'info', label: '1' }
                    ,{ id: 2, variant: 'info', label: '2' }
                    ,{ id: 3, variant: 'info', label: '3' }
                    ,{ id: 'CLA', variant: 'warning', label: 'CLA' }
                ]
                ,[
                    { id: 5, variant: 'info', label: '5' }
                    ,{ id: 6, variant: 'info', label: '6' }
                    ,{ id: 7, variant: 'info', label: '7' }
                    ,{ id: 'CT', variant: 'info', label: 'CT' }
                ]
                ,[
                    { id: 7, variant: 'info', label: '7' }
                    ,{ id: 8, variant: 'info', label: '8' }
                    ,{ id: 9, variant: 'info', label: '9' }
                    ,{ id: 'IC', variant: 'info', label: 'IC' }
                ]
                ,[
                    { id: '*', variant: 'info', label: '＊' }
                    ,{ id: 0, variant: 'info', label: '0' }
                    ,{ id: '#', variant: 'info', label: '#' }
                    ,{ id: 'OC', variant: 'info', label: 'OC' }
                ]
            ]
        };
    };

    _onClick(e) {
        console.log(e);
    }

    // _getDailerBox() {
    //     return (
    //         <div>
    //             <div>{ this._getDailerHeader() }</div>
    //             <div>{ this._getDailerBody(this.state.objs) }</div>
    //         </div>
    //     );
    // }

    _getDailerHeader() {
        return (
            <div>
                <div>
                    <span>{ this.state.title }</span>
                    <Button id={ 'PR' } variant={ 'primary' } onClick={ this._onClick.bind(this) }>{ 'Set' }</Button>
                </div>
                <div>
                    <InputGroup>
                        <FormControl placeholder="Recipient's username"/>
                        <InputGroup.Append>
                            <InputGroup.Text>×</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        );
    }

    _getDailerBody(objs) {
        if(Utils.isEmpty(objs)) return ( <div>Not Dailer !!!</div> );
        return objs.map((json, index) => {
            return ( <div key={ index }>{ this._getButtons(json) }</div>);
        });
    }

    _getButtons(json) {
        if(Utils.isEmpty(json)) return "";
        return json.map((o, index) => {
            return (
                <Button key={ index } id={ o.id } variant={ o.variant } onClick={ this._onClick.bind(this) }>{ o.label }</Button>
            );
        });
    }

    render() {
        var styles = { top: this.state.dailer.top, left: this.state.dailer.left };
        return (
            <Alert style={ styles }
                id="div_alert_dailer"
                className="div-alert-dailer"
                variant={ 'secondary ' }
                show={ this.state.dailer.show }>
                { this._getDailerHeader() }
                { this._getDailerBody(this.state.objs) }
            </Alert>
        );
    };
};

export default DailerBox;