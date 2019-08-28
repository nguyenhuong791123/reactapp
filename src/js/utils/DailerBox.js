import React, { Component as C } from 'react';
import { Alert, Form, FormControl, InputGroup, Button, Nav } from 'react-bootstrap';
import { FaCogs, FaCheck, FaArrowLeft, FaListAlt, FaLanguage, FaPhone , FaVolumeUp, FaVolumeOff, FaTty, FaSignal, FaRandom } from 'react-icons/fa';
import { TiTimes, TiVideo } from 'react-icons/ti';

import Utils from './Utils';
import '../../css/Dailer.css';

class DailerBox extends C {
    constructor(props) {
        super(props);

        this._onClick = this._onClick.bind(this);
        this._onSettingClick = this._onSettingClick.bind(this);
        this._onOpenBoxPhone = this._onOpenBoxPhone.bind(this);
        this._onIsCall = this._onIsCall.bind(this);

        this.state = {
            isUser: this.props.isUser
            ,dailer: this.props.dailer
            ,title: 'SmartCRM Ver0.1.0'
            ,setting: false
            ,btCall: null
            ,btTranfer: null
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
                    ,{ id: 'sound', variant: 'info', label: '' }
                ]
                ,[
                    { id: 7, variant: 'info', label: '7' }
                    ,{ id: 8, variant: 'info', label: '8' }
                    ,{ id: 9, variant: 'info', label: '9' }
                    ,{ id: 'video', variant: 'info', label: '' }
                ]
                ,[
                    { id: '*', variant: 'info', label: '*' }
                    ,{ id: 0, variant: 'info', label: '0' }
                    ,{ id: '#', variant: 'info', label: '#' }
                    ,{ id: 'group', variant: 'info', label: '' }
                ]
                ,[
                    { id: 'code', variant: 'info', label: '' }
                    ,{ id: 'call', variant: 'success', label: '' }
                    // ,{ id: 'end', variant: 'danger', label: '' }
                    ,{ id: 'tranfer', variant: 'warning', label: '' }
                ]
            ]
        };
    };

    _getBuuton(id) {
        return document.getElementById(id);
    }

    _onClick(e) {
        var obj = this._getClickButton(e.target);
        console.log(obj);
        if(Utils.isEmpty(obj.id)) return;
        if(obj.id === 'call') {
            if(!this.state.dailer.register) return;
            this.props.onIsCall();
        }
    }

    _onSettingClick(e) {
        var obj = e.target;
        if(obj.tagName === 'path') obj = obj.parentElement;
        if(Utils.isEmpty(obj.id)) return;
        this.state.setting = !this.state.setting;
        if(obj.id === 'svg_icon_check') {
            this.props.onRegister();
        }
        if(obj.id === 'svg_icon_setting') {
            this.forceUpdate();
        }
    }

    _getClickButton(inObj) {
        var obj = inObj;
        if(obj.tagName === 'path') obj = obj.parentElement.parentElement;
        if(obj.tagName === 'svg') obj = obj.parentElement;
        return obj;
    }

    _onIsCall(e) {
        console.log(e);
        this.props.onIsCall();
    }

    _onChange(e){
        const value = e.target.value;
        this.setState({ [e.target.name]: value });
        console.log(this.state);
    }

    _onSave(e) {
        console.log(e);
    }

    _onOpenBoxPhone(e) {
        this.props.onOpenBoxPhone(e);
    }

    _getDailerHeaderTitle() {
        var icon = (<FaCogs id="svg_icon_setting"/>);
        if(this.state.setting) icon = (<FaCheck id="svg_icon_check"/>);
        return (
            <div>
                <span className={ 'span-dailer-title' }>
                    { <TiTimes onClick={ this._onOpenBoxPhone.bind(this) } /> }
                    { this.state.title }
                </span>
                <Nav.Link id={ 'setting' } onClick={ this._onSettingClick.bind(this) }>{ icon }</Nav.Link>
            </div>
        );
    }

    _getDailerHeader() {
        return (
            <div>
                <div>
                    {(() => {
                        if(this.state.dailer.register) {
                            return ( <FaSignal /> );
                        }
                    })()}
                    <video src="sample.mp4"></video>
                </div>
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
            if(o.id === 'clear') icon =(<TiTimes />);
            if(o.id === 'group') icon = (<FaListAlt />);
            if(o.id === 'code') icon = (<FaLanguage />);
            // if(o.id === 'end') icon = (<FaTty />);
            if(o.id === 'tranfer') icon = (<FaRandom />);
            if(o.id === 'call') {
                if(this.state.dailer.register && this.state.dailer.isCall) {
                    icon = (<FaPhone />);
                } else {
                    icon = (<FaTty />);
                }
            }
            if(o.id === 'sound') {
                if(this.state.dailer.sound) {
                    icon = (<FaVolumeUp />);
                } else {
                    icon = (<FaVolumeOff />);
                }
            }
            if(o.id === 'video') {
                if(this.state.dailer.audio) {
                    icon = (<TiVideo />);
                } else {
                    icon = (<TiVideo />);
                }
            }
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

    componentDidUpdate() {
        this.state.btCall = this._getBuuton('call');
        this.state.btCall.setAttribute('disabled', true);
        console.log(this.state);
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