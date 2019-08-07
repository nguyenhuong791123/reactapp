
import React, { Component as C, PropTypes } from 'react';
import { Router, Route, browserHistory } from '@version/react-router-v3';

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

class App extends C {
    constructor(props) {
        super(props);
        this._onLogin = this._onLogin.bind(this);
        this._onLogout = this._onLogout.bind(this);

        this.state = { ua: props.ua }
    }

    _onLogin(username, password){
        // e.preventDefault();
        Auth.login(username, password).then(res => {
            browserHistory.push('/list');
            this.forceUpdate();
        }).catch(err => {
            alert(err);
        })
    }
    
    _onLogout(){
        Auth.logout()
        browserHistory.push('/');
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <Header ua={ this.state.ua } auth={Auth.loggedIn()} onLogout={ this._onLogout.bind(this) } />
                <Router history={browserHistory}>
                    <Route path="/" component={Login} onLogin={ this._onLogin.bind(this) } />
                    <Route path="/list" component={List} ua={ this.state.ua } />
                    <Route path="/new" component={New} ua={ this.state.ua } />
                    <Route path="/edit" component={Edit} ua={ this.state.ua } />
                    <Route path="/view" component={View} ua={ this.state.ua } />

                    <Route path='*' component={P404} ua={ this.state.ua } />
                </Router>
                <div id="div_footer" className="bg-light div-footer">
                    <Footer ua={ this.state.ua }/>
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