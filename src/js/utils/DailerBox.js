import React, { Component as C } from 'react';
import { Alert, Form, FormControl, InputGroup, Button, Nav } from 'react-bootstrap';
import { FaCogs, FaCheck, FaArrowLeft, FaListAlt, FaLanguage, FaPhone , FaVolumeUp, FaVolumeOff, FaTty, FaSignal, FaRandom } from 'react-icons/fa';
import { TiTimes, TiVideo } from 'react-icons/ti';

import Utils from './Utils';
import { DAILER, NUMBER, VARIANT_TYPES } from './Types';
import '../../css/Dailer.css';

class DailerBox extends C {
    constructor(props) {
        super(props);

        this._onClick = this._onClick.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onSettingClick = this._onSettingClick.bind(this);
        this._onOpenBoxPhone = this._onOpenBoxPhone.bind(this);

        this.state = {
            isUser: this.props.isUser
            ,dailer: this.props.dailer
            ,title: 'SmartCRM Ver0.1.0'
            ,setting: false
            ,validated: true
            ,phone: ''
            ,id: ''
            ,pw: ''
            ,realm: ''
            ,asturl: ''
            ,wsurl: ''
            ,udpproxy: ''
            ,objs: [
                [
                    { id: NUMBER.ONE, variant: VARIANT_TYPES.INFO }
                    ,{ id: NUMBER.TWO, variant: VARIANT_TYPES.INFO }
                    ,{ id: NUMBER.THREE, variant: VARIANT_TYPES.INFO }
                    ,{ id: DAILER.CLEARALL, variant: VARIANT_TYPES.WARNING }
                ]
                ,[
                    { id: NUMBER.FOUR, variant: VARIANT_TYPES.INFO }
                    ,{ id: NUMBER.FIVE, variant: VARIANT_TYPES.INFO }
                    ,{ id: NUMBER.SIX, variant: VARIANT_TYPES.INFO }
                    ,{ id: DAILER.SOUND, variant: VARIANT_TYPES.PRIMARY }
                ]
                ,[
                    { id: NUMBER.SEVEN, variant: VARIANT_TYPES.INFO }
                    ,{ id: NUMBER.EIGHT, variant: VARIANT_TYPES.INFO }
                    ,{ id: NUMBER.NINE, variant: VARIANT_TYPES.INFO }
                    ,{ id: DAILER.VIDEO, variant: VARIANT_TYPES.PRIMARY }
                ]
                ,[
                    { id: NUMBER.ASTERISK, variant: VARIANT_TYPES.INFO }
                    ,{ id: NUMBER.ZERO, variant: VARIANT_TYPES.INFO }
                    ,{ id: NUMBER.SHARP, variant: VARIANT_TYPES.INFO }
                    ,{ id: DAILER.CONTRACT, variant: VARIANT_TYPES.SUCCESS }
                ]
                ,[
                    { id: DAILER.CODE, variant: VARIANT_TYPES.INFO }
                    ,{ id: DAILER.CALL, variant: VARIANT_TYPES.SUCCESS }
                    ,{ id: DAILER.TRANFER, variant: VARIANT_TYPES.WARNING }
                ]
            ]
        };
    };

    _onClick(e) {
        var obj = this._getClickButton(e.target);
        // console.log(obj);
        if(Utils.isEmpty(obj.id)) return;
        if(obj.id === DAILER.CLEAR) {
            this._onClearText(false);
        }
        if(obj.id === DAILER.CLEARALL) {
            this._onClearText(true);
        }
        if(!this.state.dailer.register) return;
        if(obj.id === DAILER.CALL) {
            this.props.onUpdateDailer(DAILER.CALL);
        }
        if(obj.id === DAILER.SOUND) {
            this.props.onUpdateDailer(DAILER.SOUND);
        }
        if(obj.id === DAILER.VIDEO) {
            this.props.onUpdateDailer(DAILER.VIDEO);
        }
        if(Utils.isTelNumber(obj.id)) {
            this.state.phone += obj.id;
            this.forceUpdate();
        }
    }

    _onSettingClick(e) {
        var obj = e.target;
        if(obj.tagName === 'path') obj = obj.parentElement;
        if(Utils.isEmpty(obj.id)) return;
        this.state.setting = !this.state.setting;
        if(obj.id === 'svg_icon_check') {
            this.props.onUpdateDailer(DAILER.REGISTER);
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

    _onChange(e){
        if(e.target.name === 'phone') return;
        const value = e.target.value;
        this.setState({ [e.target.name]: value });
    }

    _onClearText(clearAll) {
        if(Utils.isEmpty(this.state.phone)) return;
        if(clearAll) {
            this.state.phone = '';
        } else {
            const length = this.state.phone.length;
            const text = this.state.phone;
            this.state.phone = text.substring(0, length-1);
        }
        this.forceUpdate();
    }

    _onSave(e) {
        console.log(e);
    }

    _onOpenBoxPhone(e) {
        this.props.onOpenBoxPhone(e);
    }

    _getButonDisabled(btId, disable) {
        var bt = document.getElementById(btId);
        if(!Utils.isEmpty(bt)) bt.setAttribute('disabled', disable);
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

    _onKeyDown(e) {
        if(e.keyCode !== 8 && !Utils.isTelNumber(e.key)) return;
        if(e.keyCode === 8) {
            this._onClearText(false);
        } else {
            this.state.phone += e.key;
        }
        this.forceUpdate();
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
                    <FormControl name="phone" value={ this.state.phone } placeholder="電話番号" onChange={ this._onChange.bind(this) } onKeyDown={ this._onKeyDown.bind(this) } />
                    <InputGroup.Append>
                    <InputGroup.Text id={ DAILER.CLEAR }>{ <FaArrowLeft onClick={ this._onClick.bind(this) }/> }</InputGroup.Text>
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
            var icon = o.id;
            if(o.id === DAILER.CLEARALL) icon =(<TiTimes />);
            if(o.id === DAILER.CONTRACT) icon = (<FaListAlt />);
            if(o.id === DAILER.CODE) icon = (<FaLanguage />);
            // if(o.id === 'end') icon = (<FaTty />);
            if(o.id === DAILER.TRANFER) icon = (<FaRandom />);
            if(o.id === DAILER.CALL) {
                if(this.state.dailer.register && this.state.dailer.isCall) {
                    icon = (<FaPhone />);
                } else {
                    icon = (<FaTty />);
                }
            }
            if(o.id === DAILER.SOUND) {
                if(this.state.dailer.sound) {
                    icon = (<FaVolumeUp />);
                } else {
                    icon = (<FaVolumeOff />);
                }
            }
            if(o.id === DAILER.VIDEO) {
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
        this._getButonDisabled(DAILER.CALL, true);
        this._getButonDisabled(DAILER.TRANFER, true);
        if(!this.state.dailer.register) {
            this._getButonDisabled(DAILER.ZERO, true);
            this._getButonDisabled(DAILER.ONE, true);
            this._getButonDisabled(DAILER.TWO, true);
            this._getButonDisabled(DAILER.THREE, true);
            this._getButonDisabled(DAILER.FOUR, true);
            this._getButonDisabled(DAILER.FIVE, true);
            this._getButonDisabled(DAILER.SIX, true);
            this._getButonDisabled(DAILER.SEVEN, true);
            this._getButonDisabled(DAILER.EIGHT, true);
            this._getButonDisabled(DAILER.NINE, true);
            this._getButonDisabled(DAILER.CODE, true);
            this._getButonDisabled(DAILER.CONTRACT, true);
            this._getButonDisabled(DAILER.SOUND, true);
            this._getButonDisabled(DAILER.VIDEO, true);
        }
        // console.log(this.state);
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