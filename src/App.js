import React, { Component as C } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';

import { SLASH, LIST, CREATE, EDIT, VIEW } from './js/utils/Types';

/* eslint-disable import/first */
import P404 from './js/error/P404';
import Header from './js/Header';
import Footer from './js/Footer';
import Login from './js/pages/Login';
import List from './js/pages/List';
import Create from './js/pages/Create';
import View from './js/pages/View';

import AuthSession from './js/auth/AuthSession';
import AuthAction from './js/auth/AuthAction';
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


        AuthSession.doLogin(this.props.ua, 'SmartCRM v0.1').then(response => {
            const { token } = response;
            sessionService.saveSession({ token }).then(() => {
              sessionService.saveUser(this.props.ua).then(() => {
                // callBack(auth);
            });
          });
        });
        AuthAction.loadAuthCookies(this._onLogin)
        // console.log();
        this.state = {
            isViewHeader: false
            ,isViewFooter: true
            ,copyright: "Copyright ©2018 VNEXT All Rights Reserved."
            ,isUser: {
                device: this.props.ua.device
                ,language: this.props.ua.language
                ,loginId: ''
                ,isViewHeader: false
                ,isViewFooter: true
                ,register: false
                ,path: '/'
                ,logo: ''
            }        
        }
    }

    _onLogin(isUser){
        this.state.isUser = isUser;
        this._setViewHeader(true);
        console.log(this.state);
    }
    
    _onLogout(){
        console.log(this.state);
        console.log(this);
        // history.push(SLASH);
        this._setViewHeader(false);
    }

    _setViewHeader(isView) {
        this.state.isViewHeader = isView;
        this.state.isViewFooter = !isView;
        this.forceUpdate();
    }

    componentWillMount() {
    }

    render() {
        return (
            <div>
                <Provider store={ store }>
                    <Router history={ history }>
                        <div id="div_header">
                            <Header
                                isUser={ this.state.isUser }
                                viewHeader={ this.state.isViewHeader }
                                onLogout={ this._onLogout.bind(this) } />
                        </div>
                        <div id="div_body">
                            <Switch>
                                <Route
                                    exact path={ SLASH }
                                    render={ ({ props }) => <Login isUser={ this.state.isUser } onLogin={ this._onLogin.bind(this) } {...this.props} />} />
                                <Route
                                    path={ SLASH + LIST }
                                    render={ ({ props }) => <List isUser={ this.state.isUser } {...this.props} />} />
                                <Route
                                    path={ SLASH + CREATE }
                                    render={ ({ props }) => <Create isUser={ this.state.isUser } {...this.props} />} />
                                <Route
                                    path={ SLASH + EDIT }
                                    render={ ({ props }) => <Create isUser={ this.state.isUser } {...this.props} />} />
                                <Route
                                    path={ SLASH + VIEW }
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
                    <Footer copyright={ this.state.copyright } viewFooter={ this.state.isViewFooter } />
                </div>
            </div>
        );
    };
}

export default App;