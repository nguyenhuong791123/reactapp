
import React, { Component as C } from 'react';
import { browserHistory } from '@version/react-router-v3';
import { Alert, Button } from 'react-bootstrap';

import '../../css/Alert.css';

export default class List extends C {
    constructor(props) {
        super(props);

        this._onClick = this._onClick.bind(this);
        this.state = { show: true };
    };

    _onClick() {
        this.props.route.auth.logout();
        browserHistory.push('/');
    }

    componentWillMount() {
        this.props.route.viewHeader(false);
    }

    render() {
        return (
            <div>
                <Alert show={this.state.show} variant="danger" className="div-alert">
                    <div className="d-flex justify-content-end">
                        <Button onClick={ this._onClick.bind(this) } variant="primary" size="sm">
                            ログイン画面へ
                        </Button>
                    </div>
                    <Alert.Heading>☆ ページを見つかりませんでした</Alert.Heading>
                    <p>
                        ・ システム管理者へ連絡するか以下のボタンをクリックして再度ログインをしてください。
                    </p>
                </Alert>
            </div>
        )
    };
};