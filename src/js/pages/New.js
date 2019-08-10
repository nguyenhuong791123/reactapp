
import React, { Component as C } from 'react';
import { browserHistory } from '@version/react-router-v3';
import { Button } from 'react-bootstrap';
import { FaReply } from 'react-icons/fa';

export default class New extends C {
  constructor(props) {
    super(props);

    this.onClickReturn = this.onClickReturn.bind(this);

    this.state = {};
  };

  onClickReturn() {
    browserHistory.push('/list');
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <Button onClick={ this.onClickReturn.bind(this) } variant="warning"><FaReply />戻る</Button>
      </div>
    )
  };
};