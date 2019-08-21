import React, { Component as C } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';

import { SLASH, LIST, CREATE_EDIT, VIEW } from './js/utils/Types';

/* eslint-disable import/first */
import P404 from './js/error/P404';
import Header from './js/Header';
import Footer from './js/Footer';
import Login from './js/pages/Login';
import List from './js/pages/List';
import CreateEdit from './js/pages/CreateEdit';
// import Edit from './js/pages/Edit';
import View from './js/pages/View';

/** SESSION */
import AuthAction from './AuthAction';

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
        AuthAction.doLogin(isUser);
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

    _getAuth(isUser) {
        if(!Utils.isEmpty(isUser) && !Utils.isEmpty(isUser['loginId']) && isUser['isViewHeader'] === true) {
          this.setState({ isUser: isUser });
          history.push({ pathname: this.state.isUser.path });
        } else {
          AuthAction.clearAuthSession();
          history.push(SLASH);
        }
    }

    componentWillMount() {
        AuthAction.loadAuthCookies(this._getAuth);
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
                                    path={ SLASH + CREATE_EDIT }
                                    render={ ({ props }) => <CreateEdit isUser={ this.state.isUser } {...this.props} />} />
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