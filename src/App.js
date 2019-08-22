import React, { Component as C } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';

import { ACTION } from './js/utils/Types';

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
        console.log(this.state);
        console.log(this);
        // history.push(SLASH);
        this._setViewHeader(false);
    }

    _setViewHeader(isView) {
        this.state.isUser.viewHeader = isView;
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
                                viewHeader={ this.state.isUser.viewHeader }
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