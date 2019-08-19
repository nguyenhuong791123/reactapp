import React, { Component } from 'react';
import { browserHistory } from '@version/react-router-v3';

import UA from '..//Device';
import AuthService from './AuthService';

export default function WithAuth(AuthComponent) {
    const Auth = new AuthService('http://192.168.10.6:8085');
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = { auth: null }
        }

        componentWillMount() {
            if (!Auth.loggedIn()) {
                //this.props.history.replace('/login')
                browserHistory.push('/');
            } else {
                try {
                    // const profile = Auth.getProfile()
                    //this.setState({ auth: Auth.getUserInfo() })
                    this.setState({ user: Auth.getProfile(), auth: Auth.getUserInfo() })
                } catch(err){
                    Auth.logout();
                    browserHistory.push('/');
                }
            }
        }

        render() {
            if (this.state.user) {
                return (
                    <AuthComponent ua={UA()} auth={ this.state.auth } />
                )
            } else {
                return (<AuthComponent ua={UA()} auth={ null } />)
            }
        }
    }
 }