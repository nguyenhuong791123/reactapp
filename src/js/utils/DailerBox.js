import React, { Component as C } from 'react';
import { Alert, Form, FormControl, InputGroup, Button, Nav } from 'react-bootstrap';
// import { FaCogs, FaCheck, FaArrowLeft, FaListAlt, FaLanguage, FaPhone , FaVolumeUp, FaVolumeOff, FaTty, FaSignal, FaRandom, FaSpinner } from 'react-icons/fa';
import { FaCogs, FaArrowLeft, FaListAlt, FaLanguage, FaPhone , FaSignal, FaRandom } from 'react-icons/fa';
import { TiTimes, TiVideo, TiVolumeMute, TiVolumeUp, TiArrowBack } from 'react-icons/ti';

import Utils from './Utils';
import { DAILER, NUMBER, VARIANT_TYPES, HTML_TAG } from './Types';
import '../../css/Dailer.css';

class DailerBox extends C {
    constructor(props) {
        super(props);

        this._onClick = this._onClick.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onClickRegister = this._onClickRegister.bind(this);
        this._onOpenBoxPhone = this._onOpenBoxPhone.bind(this);

        this.state = {
            isUser: this.props.isUser
            ,dailer: this.props.dailer
            ,title: 'IP PBX Ver0.1.0'
            ,setting: false
            ,group: false
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
            ,groups: [
                { id: 1, name: 'group_01' }
                ,{ id: 2, name: 'group_02' }
                ,{ id: 3, name: 'group_03' }
            ]
            ,users: [
                { id: 1, ext: '1001', name: 'user_01' }
                ,{ id: 2, ext: '1002', name: 'user_02' }
                ,{ id: 3, ext: '1003', name: 'user_03' }
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
        if(obj.id === DAILER.CONTRACT) {
            this._onClickContract();
        }
        if(Utils.isTelNumber(obj.id)) {
            this.state.phone += obj.id;
            this.forceUpdate();
        }
    }

    _onClickContract() {
        this.state.group = !this.state.group;
        console.log(this.state.setting);
        console.log(this.state.group);
        this.forceUpdate();
    }

    _onClickSettingBox(e) {
        if(!this.state.dailer.register) return;
        var obj = e.target;
        if(obj.tagName === 'path') obj = obj.parentElement;
        if(Utils.isEmpty(obj.id)) return;
        this.state.setting = !this.state.setting;
        this.forceUpdate();
    }

    _onClickRegister(e) {
        var obj = e.target;
        if(obj.tagName === 'path') obj = obj.parentElement;
        if(Utils.isEmpty(obj.id)) return;
        this.state.setting = true;
        if(obj.id === 'bt_register') {
            this.props.onUpdateDailer(DAILER.REGISTER);
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
        console.log(btId);
        var bt = document.getElementById(String(btId));
        console.log(bt);
        if(!Utils.isEmpty(bt)) bt.setAttribute('disabled', disable);
    }

    _getDailerHeaderTitle() {
        var icon = (<FaCogs id="svg_icon_setting"/>);
        // if(this.state.setting) icon = (<FaCheck id="svg_icon_check"/>);
        return (
            <div>
                <span className={ 'span-dailer-title' }>
                    { <TiTimes onClick={ this._onOpenBoxPhone.bind(this) } /> }
                    { this.state.title }
                    {(() => {
                        if(!this.state.group) {
                            return( <Nav.Link id={ 'setting' } onClick={ this._onClickSettingBox.bind(this) }>{ icon }</Nav.Link>);
                        }
                    })()}
                </span>
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

    _onClickSelectUser(e) {
        var id = e.target.id;
        if(Utils.isEmpty(id)) {
            const bt = this._getClickButton(e.target);
            if(Utils.isEmpty(bt)) return;
            id = bt.id;
        }
        if(Utils.isNumber(id)) {
            this.state.phone = e.target.id;
            return;
        }
        if(id === 'bt_user') {
            this.state.group = false;
            this.props.onUpdateDailer(DAILER.CALL);
            return;
        }
        if(id === 'bt_user_cancel') {
            this.state.phone = '';
        }
        this.state.group = false;
        this.forceUpdate();
    }

    _getDailerHeader() {
        return (
            <div>
                {(() => {
                    if(this.state.dailer.register) {
                        return ( <FaSignal /> );
                    }
                })()}
                {(() => {
                    if(this.state.dailer.video) {
                        return ( <video src="sample.mp4"></video> );
                    }
                })()}
            </div>
        );
    }

    _getInputPhone() {
        return (
            <InputGroup>
                <FormControl
                    name="phone"
                    value={ this.state.phone }
                    placeholder="電話番号"
                    onChange={ this._onChange.bind(this) }
                    onKeyDown={ this._onKeyDown.bind(this) } />
                <InputGroup.Append>
                <InputGroup.Text id={ DAILER.CLEAR }>{ <FaArrowLeft onClick={ this._onClick.bind(this) }/> }</InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
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
            var variant = o.variant;
            if(o.id === DAILER.CLEARALL) icon =(<TiTimes />);
            if(o.id === DAILER.CONTRACT) icon = (<FaListAlt />);
            if(o.id === DAILER.CODE) icon = (<FaLanguage />);
            // if(o.id === 'end') icon = (<FaTty />);
            if(o.id === DAILER.TRANFER) icon = (<FaRandom />);
            if(o.id === DAILER.CALL) {
                icon = (<FaPhone />);
                if(this.state.dailer.register && this.state.dailer.isCall) {
                    variant = VARIANT_TYPES.DANGER;
                } else {
                    variant = VARIANT_TYPES.SUCCESS;
                    // icon = (<FaTty />);
                }
            }
            if(o.id === DAILER.SOUND) {
                if(this.state.dailer.sound) {
                    icon = (<TiVolumeUp />);
                } else {
                    icon = (<TiVolumeMute />);
                }
            }
            if(o.id === DAILER.VIDEO) {
                if(this.state.dailer.video) {
                    icon = (<TiVideo />);
                } else {
                    icon = (<TiVideo />);
                }
            }
            return (
                <Button key={ index } id={ o.id } variant={ variant } onClick={ this._onClick.bind(this) }>{ icon }</Button>
            );
        });
    }

    _getSettingBox() {
        return (
            <div>
                <Form noValidate validated={ this.state.validated } onSubmit={ this._onSave.bind(this) }>
                    <Form.Group>
                        <Form.Control
                            type={ HTML_TAG.TEXT }
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
                            type={ HTML_TAG.PASSWORD }
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
                            type={ HTML_TAG.TEXT }
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
                            type={ HTML_TAG.TEXT }
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
                            type={ HTML_TAG.TEXT }
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
                            type={ HTML_TAG.TEXT }
                            name="udpproxy"
                            onChange={ this._onChange.bind(this) }
                            placeholder={ 'Udpproxy' }/>
                    </Form.Group>
                    <Button id='bt_register' className='btn-register' variant={ VARIANT_TYPES.SUCCESS } onClick={ this._onClickRegister.bind(this) }>
                        認証
                    </Button>
                </Form>
            </div>
        );
    }

    _getGroupUsers() {
        return (
            <div>
                <Form.Group className='form-group-user'>
                    <Form.Label>部署</Form.Label>
                    <Form.Control as={ HTML_TAG.SELECT }>
                        <option>---</option>
                        {
                            this.state.groups.map((g) => (
                                <option key={ g.id } value={ g.id }>{ g.name }</option>
                            ))
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group className='form-group-user'>
                    <Form.Label>ユーザー</Form.Label>
                    <div className='div-text-align-left'>
                    {
                        this.state.users.map((u) => (
                            <Nav.Link key={ u.id } id={ u.ext } onClick={ this._onClickSelectUser.bind(this) }>{ u.name }</Nav.Link>
                        ))
                    }
                    </div>
                    <div>
                        <Button id='bt_user' variant={ VARIANT_TYPES.SUCCESS } onClick={ this._onClickSelectUser.bind(this) }>
                            <FaPhone />
                        </Button>
                        <Button id='bt_user_cancel' variant={ VARIANT_TYPES.INFO } onClick={ this._onClickSelectUser.bind(this) }>
                            <TiArrowBack />
                        </Button>
                    </div>
                </Form.Group>
            </div>
        );
    }

    componentDidUpdate() {
        this._getButonDisabled(DAILER.CALL, true);
        this._getButonDisabled(DAILER.TRANFER, true);
        if(!this.state.dailer.register) {
            // var body = document.getElementById("div_dailer_body");
            // if(!Utils.isEmpty(body)) body.style.display = 'none';
        //     this._getButonDisabled(NUMBER.ZERO, true);
        //     this._getButonDisabled(NUMBER.ONE, true);
        //     this._getButonDisabled(NUMBER.TWO, true);
        //     this._getButonDisabled(NUMBER.THREE, true);
        //     this._getButonDisabled(NUMBER.FOUR, true);
        //     this._getButonDisabled(NUMBER.FIVE, true);
        //     this._getButonDisabled(NUMBER.SIX, true);
        //     this._getButonDisabled(NUMBER.SEVEN, true);
        //     this._getButonDisabled(NUMBER.EIGHT, true);
        //     this._getButonDisabled(NUMBER.NINE, true);
        //     this._getButonDisabled(NUMBER.ASTERISK, true);
        //     this._getButonDisabled(NUMBER.SHARP, true);

        //     this._getButonDisabled(DAILER.CODE, true);
        //     this._getButonDisabled(DAILER.CONTRACT, true);
        //     this._getButonDisabled(DAILER.SOUND, true);
        //     this._getButonDisabled(DAILER.VIDEO, true);
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
                    if(!this.state.setting && !this.state.group) {
                        return( this._getSettingBox() );
                    }
                })()}
                {(() => {
                    if(this.state.group) {
                        return( this._getGroupUsers() );
                    }
                })()}
                {(() => {
                    if(this.state.setting && !this.state.group) {
                        return(
                            <div>
                                { this._getDailerHeader() }
                                { this._getInputPhone() }
                                { this._getDailerBody(this.state.objs) }
                            </div>
                        );
                    }
                })()}
            </Alert>
        );
    };
};

export default DailerBox;