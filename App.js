import React, { Component as C } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { sessionService, sessionReducer } from 'redux-react-session';
import thunkMiddleware from 'redux-thunk';

/* eslint-disable import/first */
import P404 from './js/error/P404';
import Header from './js/Header';
import Footer from './js/Footer';
import Login from './js/pages/Login';
import List from './js/pages/List';
import New from './js/pages/New';
import Edit from './js/pages/Edit';
import View from './js/pages/View';

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
            ,isUser: this.props.ua
            ,copyright: "Copyright ©2018 VNEXT All Rights Reserved."
        }
    }

    _onLogin(isUser){
        this.state.isUser = isUser;
        this._setViewHeader(true);
    }
    
    _onLogout(){
        this._setViewHeader(false);
        this.props.history.push("/");
        // browserHistory.push('/');
        this.forceUpdate();
    }

    _setViewHeader(isView) {
        this.state.isViewHeader = isView;
        this.state.isViewFooter = !isView;
        this.forceUpdate();
    }

    // _onUpdateUA(inUa) {
    //     this.state.ua = inUa;
    //     this.forceUpdate();
    // }

    render() {
        return (
            <div>
                <div id="div_header">
                    <Header
                        isUser={ this.state.isUser }
                        viewHeader={ this.state.isViewHeader }
                        onLogout={ this._onLogout.bind(this) } />
                </div>
                <Provider store={store}>
                    <div id="div_body">
                        <Router history={ history }>
                            <Route
                                exact path="/"
                                render={ ({ props }) => <Login isUser={ this.state.isUser } onLogin={ this._onLogin.bind(this) } {...this.props} />} />
                            <Route
                                path="/list"
                                render={ ({ props }) => <List isUser={ this.state.isUser } {...this.props} />} />
                            <Route
                                path="/new"
                                render={ ({ props }) => <New isUser={ this.state.isUser } {...this.props} />} />
                            <Route
                                path="/edit"
                                render={ ({ props }) => <Edit isUser={ this.state.isUser } {...this.props} />} />
                            <Route
                                path="/view"
                                render={ ({ props }) => <View isUser={ this.state.isUser } {...this.props} />} />
                            {/* <Route
                                path='*'
                                render={ ({ props }) => <P404 isUser={ this.state.isUser } viewHeader={ this._setViewHeader.bind(this) } {...this.props} />} /> */}
                        </Router>
                    </div>
                </Provider>
                <div id="div_footer" className="bg-light div-footer">
                    <Footer copyright={ this.state.copyright } viewFooter={ this.state.isViewFooter } />
                </div>
            </div>
        );
    };
}

export default App;
// export default WithAuth(App);