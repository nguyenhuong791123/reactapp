import React, { Component as C } from 'react';
import { Router, Route, browserHistory } from '@version/react-router-v3';
// import { Provider } from 'react-redux';
// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// import { sessionService, sessionReducer } from 'redux-react-session';
// import thunkMiddleware from 'redux-thunk';

import AuthService from './js/sevice/AuthService';
import WithAuth from './js/sevice/WithAuth';
const Auth = new AuthService();

/* eslint-disable import/first */
import P404 from './js/error/P404';
import Header from './js/Header';
import Footer from './js/Footer';
import Login from './js/pages/Login';
import List from './js/pages/List';
import New from './js/pages/New';
import Edit from './js/pages/Edit';
import View from './js/pages/View';

// let reducer = combineReducers({ session: sessionReducer });
// let store = createStore(reducer, compose(applyMiddleware(thunkMiddleware)));
// sessionService.initSessionService(store, { driver: 'COOKIES' });

class App extends C {
    constructor(props) {
        super(props);
        this._onLogin = this._onLogin.bind(this);
        this._onLogout = this._onLogout.bind(this);
        this._setViewHeader = this._setViewHeader.bind(this);
        // this._onUpdateList = this._onUpdateList.bind(this);

        this.state = {
            ua: this.props.ua
            ,isViewHeader: (props.auth!=null)
            ,isViewFooter: (props.auth===null)
            ,isuser: props.auth
        }
    }

    _onLogin(username, password){
        // e.preventDefault();
        Auth.login(username, password, this.state.ua).then(res => {
            browserHistory.push({ pathname: '/list' });
            this.setState({ isuser: res.auth });
            this._setViewHeader(true);
        }).catch(err => {
            alert(err);
        })
    }
    
    _onLogout(){
        Auth.logout()
        browserHistory.push({ pathname: '/' });
        this._setViewHeader(false);
        this.forceUpdate();
    }

    _setViewHeader(isView) {
        this.state.isViewHeader = isView;
        this.state.isViewFooter = !isView;
        this.forceUpdate();
    }

    // _onUpdateList(obj) {
    //     console.log(obj);
    // }

    _onUpdateUA(inUa) {
        this.state.ua = inUa;
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <div id="div_header">
                    <Header
                        ua={ this.state.ua }
                        isUser={ this.state.isuser }
                        viewHeader={ this.state.isViewHeader }
                        onLogout={ this._onLogout.bind(this) } />
                </div>
                {/* <Provider store={store}> */}
                <div id="div_body">
                    <Router history={ browserHistory }>
                        <Route
                            path="/"
                            component={ Login }
                            ua={ this.state.ua }
                            onUpdateUA={ this._onUpdateUA.bind(this) }
                            onLogin={ this._onLogin.bind(this) } />
                        <Route
                            path="/list"
                            component={ List }
                            // ua={ this.state.ua }
                            isUser={ this.state.isUser } />
                        <Route
                            path="/new"
                            component={ New }
                            // ua={ this.state.ua }
                            isUser={ this.state.isUser } />
                        <Route
                            path="/edit"
                            component={ Edit }
                            // ua={ this.state.ua }
                            isUser={ this.state.isUser } />
                        <Route
                            path="/view"
                            component={ View }
                            // ua={ this.state.ua }
                            isUser={ this.state.isUser } />

                        <Route
                            path='*'
                            component={ P404 }
                            // ua={ this.state.ua }
                            auth={ Auth }
                            viewHeader={ this._setViewHeader.bind(this) } />
                    </Router>
                </div>
                {/* </Provider> */}
                <div id="div_footer" className="bg-light div-footer">
                    <Footer ua={ this.state.ua } viewFooter={ this.state.isViewFooter } />
                </div>
            </div>
        );
    };
}

// App.propTypes = {
//     onLogout: PropTypes.func
// };

//export default App;
export default WithAuth(App);