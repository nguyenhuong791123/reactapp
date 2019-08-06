import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
/** DEVICE PAGES INFO */
import UA from './js/Device';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Header ua={UA()}/>
    , document.getElementById('div_header'));

ReactDOM.render(
    <Body ua={UA()}/>
    , document.getElementById('div_body'));

ReactDOM.render(
    <Footer ua={UA()}/>
    , document.getElementById('div_footer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
