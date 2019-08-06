import React, { Component } from 'react';
import { browserHistory } from '@version/react-router-v3';

import AuthService from './AuthService';

export default function WithAuth(AuthComponent) {
    const Auth = new AuthService('http://192.168.56.63:8085');
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        }

        componentWillMount() {
            if (!Auth.loggedIn()) {
                //this.props.history.replace('/login')
                browserHistory.push('/');
            }
            else {
                try {
                    const profile = Auth.getProfile()
                    this.setState({ user: profile })
                }
                catch(err){
                    Auth.logout()
                    //this.props.history.replace('/login')
                    browserHistory.push('/');
                }
            }
        }

        render() {
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user} />
                )
            } else {
                return null
            }
        }
    }
 }