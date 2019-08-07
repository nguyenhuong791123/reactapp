
import React, { Component as C, PropTypes } from 'react';
import { Router, Route, browserHistory } from '@version/react-router-v3';

import Login from './pages/Login';
import List from './pages/List';

class App extends C {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router history={browserHistory}>
                    <Route path="/" component={Login} />
                    <Route path="/list" component={List} />
                </Router>
            </div>
        );
    };
}

export default App;