import React, { Component as C } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';

import { ACTION } from './js/utils/Types';
import { isEmpty } from './js/utils/Utils';

/* eslint-disable import/first */
import P404 from './js/error/P404';
import Header from './js/Header';
import Footer from './js/Footer';
import Login from './js/Login';
import List from './js/pages/List';
import Create from './js/pages/Create';
import View from './js/pages/View';

import AuthSession from './js/auth/AuthSession';
import { USER_DATA } from 'redux-react-session/dist/constants';
let reducer = combineReducers({ session: sessionReducer });
let store = createStore(reducer, compose(applyMiddleware(thunkMiddleware)));
sessionService.initSessionService(store, { driver: 'COOKIES' });
const history = createBrowserHistory();

class App extends C {
    constructor(props) {
        super(props);
        this._onLogin = this._onLogin.bind(this);
        this._onLogout = this._onLogout.bind(this);
        this._setViewHeader = this._setViewHeader.bind(this);

        this.state = {
            copyright: "Copyright ©2018 VNEXT All Rights Reserved."
            ,isUser: {
                device: this.props.ua.device
                ,language: this.props.ua.language
                ,viewHeader: false
                ,path: ACTION.SLASH
            }        
        }
    }

    _onLogin(isUser, token){
        this.state.isUser = isUser;
        this._setViewHeader(true);
        AuthSession.doLogin(isUser, token).then(response => {
            console.log(this.state);
            const { token } = response;
            sessionService.saveSession({ token }).then(() => {
              sessionService.saveUser(isUser).then(() => {
                console.log(sessionService.loadUser('COOKIES'));
                // callBack(auth);
            });
          });
        });
    }
    
    _onLogout(){
        AuthSession.doLogout().then(() => {
            sessionService.deleteSession();
            sessionService.deleteUser();
            this.state.isUser = AuthSession.isUserInit(this.state.isUser);
            this.forceUpdate();
            // this._setViewHeader(false);
            // console.log(sessionService.loadUser('COOKIES'));
            // console.log(this.state);
        }).catch(err => { throw (err); });
        // history.push(SLASH);
    }

    _setViewHeader(isView) {
        this.state.isUser.viewHeader = isView;
        this.forceUpdate();
    }

    _onUpdateUser(objs) {
        this._onUpdatePromise(objs, this.state.isUser, this._setIsUser);
        // const isUser = sessionService.loadUser('COOKIES');
        // console.log(isUser);
        // isUser.then(function(data) {
        //     var keys = Object.keys(objs);
        //     if(!isEmpty(keys) && keys.length > 0) {
        //         for(var i=0; i<keys.length; i++) {
        //             data[keys[i]] = objs[keys[i]];
        //         }
        //     }
        //     console.log(data);
        //     this.forceUpdate();
        //     // this.state.isUser =data;
        // }).catch(function(error) {
        //     // this.state.isUser = AuthSession.isUserInit(this.state.isUser);
        //     history.push(ACTION.SLASH);
        //     this.forceUpdate();
        //     // console.log(error);
        // });
    }

    _onUpdatePromise(objs, stateIsUser, callBack) {
        const isUser = sessionService.loadUser('COOKIES');
        console.log(isUser);
        isUser.then(function(data) {
            var keys = Object.keys(objs);
            if(!isEmpty(keys) && keys.length > 0) {
                for(var i=0; i<keys.length; i++) {
                    data[keys[i]] = objs[keys[i]];
                }
            }
            console.log(data);
            // callBack(data);
        }).catch(function(error) {
            console.log(stateIsUser);
            const isUserInit = AuthSession.isUserInit(stateIsUser);
            console.log(isUserInit);
            // callBack(isUserInit);
            history.push(ACTION.SLASH);
        });
        this.forceUpdate();
    }

    _setIsUser(isUser) {
        this.state.isUser = isUser;
    }

    componentWillMount() {
        const isUser = sessionService.loadUser('COOKIES');
        console.log(isUser);
        isUser.then((data) => {
            console.log(data);
            this.state.isUser = data;
            this.forceUpdate();
        }).catch((error) => {
            console.log(error);
            this.state.isUser = AuthSession.isUserInit(this.state.isUser);
            console.log(this.state.isUser);
            history.push(ACTION.SLASH);
        });
    // if(!isEmpty(isUser)) {
    //     } else {
    //         history.replace(ACTION.SLASH);
    //     }
    }

    render() {
        return (
            <div>
                <Provider store={ store }>
                    <Router history={ history }>
                        <div id="div_header">
                            <Header
                                isUser={ this.state.isUser }
                                viewHeader={ this.state.isUser.viewHeader }
                                onUpdateUser={ this._onUpdateUser.bind(this) }
                                onLogout={ this._onLogout.bind(this) } />
                        </div>
                        <div id="div_body">
                            <Switch>
                                <Route
                                    exact path={ ACTION.SLASH }
                                    render={ ({ props }) => <Login isUser={ this.state.isUser } onLogin={ this._onLogin.bind(this) } {...this.props} />} />
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