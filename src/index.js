import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
// import './index.css';
import UA from './js/device/Device';

// import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App ua={UA()} />, document.getElementById('app'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
// serviceWorker.register();
