import React, { Component as C } from 'react';
import { Alert, Form, FormControl, InputGroup, Button, Nav } from 'react-bootstrap';
import { FaCogs, FaCheck, FaArrowLeft, FaListAlt, FaLanguage } from 'react-icons/fa';
import { TiTimes, TiVideo } from 'react-icons/ti';

import Utils from './Utils';
import '../../css/Dailer.css';

class DailerBox extends C {
    constructor(props) {
        super(props);

        this._onClick = this._onClick.bind(this);
        this._onSettingClick = this._onSettingClick.bind(this)

        this.state = {
            isUser: this.props.isUser
            ,dailer: this.props.dailer
            ,title: 'SmartCRM Ver0.1.0'
            ,setting: false
            ,validated: true
            ,id: ''
            ,pw: ''
            ,realm: ''
            ,asturl: ''
            ,wsurl: ''
            ,udpproxy: ''
            ,objs: [
                [
                    { id: 1, variant: 'info', label: '1' }
                    ,{ id: 2, variant: 'info', label: '2' }
                    ,{ id: 3, variant: 'info', label: '3' }
                    ,{ id: 'clear', variant: 'warning', label: '' }
                ]
                ,[
                    { id: 5, variant: 'info', label: '5' }
                    ,{ id: 6, variant: 'info', label: '6' }
                    ,{ id: 7, variant: 'info', label: '7' }
                    ,{ id: 'video', variant: 'info', label: '' }
                ]
                ,[
                    { id: 7, variant: 'info', label: '7' }
                    ,{ id: 8, variant: 'info', label: '8' }
                    ,{ id: 9, variant: 'info', label: '9' }
                    ,{ id: 'group', variant: 'info', label: '' }
                ]
                ,[
                    { id: '*', variant: 'info', label: '*' }
                    ,{ id: 0, variant: 'info', label: '0' }
                    ,{ id: '#', variant: 'info', label: '#' }
                    ,{ id: 'code', variant: 'info', label: '' }
                ]
            ]
        };
    };

    _onClick(e) {
        console.log(e);
    }

    _onSettingClick(e) {
        console.log(e);
        this.state.setting = !this.state.setting;
        this.forceUpdate();
    }

    _onChange(e){
        const value = e.target.value;
        // const dError = e.target.parentElement.childNodes[1];
        // if(!isEmpty(dError)) {
        //   if(value.length <= 0) {
        //     dError.style.display = 'block';
        //     dError.innerText = this._getMsg(MSG_TYPE.LOGIN, 'login_id') + this._getMsg(MSG_TYPE.ERROR, 'required');
        //   } else if(value.length > 8) {
        //     dError.style.display = 'block';
        //     var msg = StringUtil.format(this._getMsg(MSG_TYPE.ERROR, 'max_length'), 8, value.length - 8);
        //     dError.innerText = msg;
        //   } else {
        //     dError.style.display = 'none';
        //   }
        // }
        this.setState({ [e.target.name]: value });
        console.log(this.state);
    }

    _onSave(e) {
        console.log(e);
    }

    _getDailerHeaderTitle() {
        var icon = (<FaCogs />);
        if(this.state.setting) icon = (<FaCheck />);
        return (
            <div>
                <span className={ 'span-dailer-title' }>{ this.state.title }</span>
                <Nav.Link id={ 'setting' } onClick={ this._onSettingClick.bind(this) }>{ icon }</Nav.Link>
            </div>
        );
    }

    _getDailerHeader() {
        return (
            <div>
                <video src="sample.mp4"></video>
                <InputGroup>
                    <FormControl placeholder="電話番号"/>
                    <InputGroup.Append>
                    <InputGroup.Text>{ <FaArrowLeft onClick={ this._onClick.bind(this) }/> }</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }

    _getDailerBody(objs) {
        if(Utils.isEmpty(objs)) return ( <div>Not Dailer !!!</div> );
        return objs.map((json, index) => {
            return (<div key={ index }>{ this._getButtons(json) }</div>);
        });
    }

    _getButtons(json) {
        if(Utils.isEmpty(json)) return "";
        return json.map((o, index) => {
            var icon = o.label;
            if(o.id === 'video') icon = (<TiVideo />);
            if(o.id === 'clear') icon =(<TiTimes />);
            if(o.id === 'group') icon = (<FaListAlt />);
            if(o.id === 'code') icon = (<FaLanguage />);
            return (
                <Button key={ index } id={ o.id } variant={ o.variant } onClick={ this._onClick.bind(this) }>{ icon }</Button>
            );
        });
    }

    _getSettingBox() {
        return (
            <div>
                <Form noValidate validated={ this.state.validated } onSubmit={ this._onSave.bind(this) }>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="id"
                            onChange={ this._onChange.bind(this) }
                            placeholder={ 'SIP ID' }
                            required />
                        {/* <Form.Control.Feedback type="invalid">
                            { 'SIP ID' }{ 'required' }
                        </Form.Control.Feedback> */}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="password"
                            name="pw"
                            onChange={ this._onChange.bind(this) }
                            placeholder={ 'SIP PW' }
                            required />
                        {/* <Form.Control.Feedback type="invalid">
                            { 'SIP PW' }{ 'required' }
                        </Form.Control.Feedback> */}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="realm"
                            onChange={ this._onChange.bind(this) }
                            placeholder={ 'Realm' }
                            required />
                        {/* <Form.Control.Feedback type="invalid">
                            { 'Realm' }{ 'required' }
                        </Form.Control.Feedback> */}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="asturl"
                            onChange={ this._onChange.bind(this) }
                            placeholder={ 'Asturl' }
                            required />
                        {/* <Form.Control.Feedback type="invalid">
                            { 'Asturl' }{ 'required' }
                        </Form.Control.Feedback> */}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="wsurl"
                            onChange={ this._onChange.bind(this) }
                            placeholder={ 'Wsurl' }
                            required />
                        {/* <Form.Control.Feedback type="invalid">
                            { 'Wsurl' }{ 'required' }
                        </Form.Control.Feedback> */}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="udpproxy"
                            onChange={ this._onChange.bind(this) }
                            placeholder={ 'Udpproxy' }/>
                    </Form.Group>
                </Form>
            </div>
        );
    }

    render() {
        var styles = { top: this.state.dailer.top, left: this.state.dailer.left };
        return (
            <Alert style={ styles }
                id="div_alert_dailer"
                className="div-alert-dailer"
                variant={ 'secondary ' }
                show={ this.state.dailer.show }>
                { this._getDailerHeaderTitle() }
                {(() => {
                    if(!this.state.setting) {
                        return(
                            <div>
                                { this._getDailerHeader() }
                                { this._getDailerBody(this.state.objs) }
                            </div>
                        );
                    }
                })()}
                {(() => {
                    if(this.state.setting) {
                        return( this._getSettingBox() );
                    }
                })()}
            </Alert>
        );
    };
};

export default DailerBox;