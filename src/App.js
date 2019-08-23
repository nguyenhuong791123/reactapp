import React, { Component as C } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';

import { ACTION } from './js/utils/Types';
import Utils from './js/utils/Utils';

/* eslint-disable import/first */
import P404 from './js/error/P404';
import Header from './js/Header';
import Footer from './js/Footer';
import Login from './js/Login';
import List from './js/pages/List';
import Create from './js/pages/Create';
import View from './js/pages/View';

import AuthSession from './js/auth/AuthSession';
let reducer = combineReducers({ session: sessionReducer });
let store = createStore(reducer, compose(applyMiddleware(thunkMiddleware)));
// const validateSession = (session) => { return true; }
// sessionService.initSessionService(store, { driver: 'COOKIES', validateSession });
sessionService.initSessionService(store, { driver: 'COOKIES' });
const history = createBrowserHistory();

class App extends C {
    constructor(props) {
        super(props);
        this._setViewHeader = this._setViewHeader.bind(this);
        this._doLogin = this._doLogin.bind(this);
        this._doLogout = this._doLogout.bind(this);
        this._loadAuthCookies = this._loadAuthCookies.bind(this);
        this._onUpdatePromise = this._onUpdatePromise.bind(this);
        this._updateStateIsUser = this._updateStateIsUser.bind(this);

        this.state = {
            copyright: "Copyright ©2018 VNEXT All Rights Reserved."
            ,isUser: { device: this.props.ua.device, language: this.props.ua.language, viewHeader: false }
            ,options: null
        }
    }

    _setViewHeader(isView) {
        this.state.isUser.viewHeader = isView;
        this.forceUpdate();
    }

    _doLogin = (isUser, options) => {
        const auth = { info: isUser, options: options };
        this._updateStateIsUser(auth);
        AuthSession.doLogin(auth).then(response => {
            const { token } = response;
            sessionService.saveSession({ token }).then(() => {
                sessionService.saveUser(auth).then(() => {
                    console.log('_doLogin complete !!!');
                });
            });
        });
    };

    _doLogout = () => {
        AuthSession.doLogout().then(() => {
            sessionService.deleteSession();
            sessionService.deleteUser();
            const auth = AuthSession.isUserInit(null);
            this.state.isUser = auth.info;
            this.state.options = auth.options;
        }).catch(err => { throw (err); });
    };

    _loadAuthCookies = (callBack) => {
        const objAuth = sessionService.loadUser('COOKIES');
        console.log(objAuth);
        if(objAuth !== undefined) {
            objAuth.then(function(data) {
                if(data.info['path'] === ACTION.SLASH) {
                    data.info['viewHeader'] = false;
                }
                callBack(data);
            }).catch(function(error) {
                console.log(error);
                callBack(AuthSession.isUserInit(null));
            });
        } else {
            const auth = AuthSession.isUserInit(null);
            this.state.isUser = auth.info;
            this.state.options = auth.options;
        }
    }

    _onUpdatePromise(inIsUser, inOptions) {
        const isUser = sessionService.loadUser('COOKIES');
        isUser.then(function(data) {
            var ukeys = Object.keys(inIsUser);
            if(!Utils.isEmpty(ukeys) && ukeys.length > 0) {
                for(var i=0; i<ukeys.length; i++) {
                    data.info[ukeys[i]] = inIsUser[ukeys[i]];
                }
                this.state.isUser = data.info;
            }
            var okeys = Object.keys(inOptions);
            if(!Utils.isEmpty(okeys) && okeys.length > 0) {
                for(var o=0; o<okeys.length; o++) {
                    data.options[okeys[o]] = inOptions[okeys[o]];
                }
                this.state.options = data.options;
            }
            this.forceUpdate();
        }).catch(function(error) {
            console.log('_onUpdatePromise');
            console.log(error);
        })
    }

    _updateStateIsUser(isUser) {
        this.state.isUser = isUser.info;
        this.state.options = isUser.options;
        console.log('_updateStateIsUser');
        console.log(this.state);
        this.forceUpdate();
    }

    UNSAFE_componentWillMount() {
        this._loadAuthCookies(this._updateStateIsUser);
    }

    render() {
        return (
            <div>
                <Provider store={ store }>
                    <Router history={ history }>
                        <div id="div_header">
                            <Header
                                isUser={ this.state.isUser }
                                options={ this.state.options }
                                onUpdateUser={ this._onUpdatePromise.bind(this) }
                                onLogout={ this._doLogout.bind(this) } />
                        </div>
                        <div id="div_body">
                            <Switch>
                                <Route
                                    exact path={ ACTION.SLASH }
                                    render={ ({ props }) => <Login
                                                                isUser={ this.state.isUser }
                                                                onLogin={ this._doLogin.bind(this) }
                                                                {...this.props} />} />
                                <Route
                                    path={ ACTION.SLASH + ACTION.LIST }
                                    render={ ({ props }) => <List isUser={ this.state.isUser } {...this.props} />} />
                                <Route
                                    path={ ACTION.SLASH + ACTION.CREATE }
                                    render={ ({ props }) => <Create isUser={ this.state.isUser } {...this.props} />} />
                                <Route
                                    path={ ACTION.SLASH + ACTION.EDIT }
                                    render={ ({ props }) => <Create isUser={ this.state.isUser } {...this.props} />} />
                                <Route
                                    path={ ACTION.SLASH + ACTION.VIEW }
                                    render={ ({ props }) => <View isUser={ this.state.isUser } {...this.props} />} />
                                <Route
                                    exact
                                    render={ ({ props }) => <P404 isUser={ this.state.isUser }
                                                                viewHeader={ this._setViewHeader.bind(this) }
                                                                onLogout={ this._onLogout.bind(this) }
                                                                {...this.props} />} />
                            </Switch>
                        </div>
                    </Router>
                </Provider>

                <div id="div_footer" className="bg-light div-footer">
                    <Footer copyright={ this.state.copyright } viewFooter={ !this.state.isUser.viewHeader } />
                </div>
            </div>
        );
    };
}

export default App;