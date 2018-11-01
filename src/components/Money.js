import React, { Component } from 'react';

class Money extends Component {
  static format(amount=0, currency='BRL') {
    switch(currency) {
      case 'BRL':
        const isNegative = amount < 0;
        let formattedBalance = isNegative ? '-' : '';
        formattedBalance += 'R$ ';
        formattedBalance += Math.abs(amount/100).toFixed(2).replace('.', ',');
        return formattedBalance;
      default:
        throw new Error();
    }
  }

  render() {
    return (<span>{Money.format(this.props.amount, this.props.currency)}</span>)
  }
}

export default Money;