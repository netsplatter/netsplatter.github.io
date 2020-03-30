import React, { Component } from 'react';
import {prettyNumber} from '@utils/Formatter';

export default class Budget extends Component {
  render() {
    const { props } = this;
    const { item, value, colorize } = props;
    const { budgetApproved, budget } = item;
    return (
      <strong className={colorize && budgetApproved > budget ? `text-danger` : ''}>
        {prettyNumber(value)}
      </strong>
    );
  }
}