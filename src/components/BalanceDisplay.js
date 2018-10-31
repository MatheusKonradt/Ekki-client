import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { palette } from "../services/themeProvider";
import '../styles/etc.sass';

class BalanceDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getFormattedBalance(balance=0) {
    const isNegative = balance < 0;
    let formattedBalance = isNegative ? '-' : '';
    formattedBalance += 'R$ ';
    formattedBalance += Math.abs(balance).toFixed(2).replace('.', ',');
    return formattedBalance;
  }

  getDisplayState() {
    return this.state.balance < 0 ? BalanceDisplay.STATE_NEGATIVE : BalanceDisplay.STATE_POSITIVE
  }

  render() {
    const style = `balance-display -${this.getDisplayState()}`;
    return (
      <div className={style}>
        <span>{this.getFormattedBalance(this.props.balance)}</span>
      </div>
    )
  }
}

BalanceDisplay.STATE_POSITIVE = 'positive';
BalanceDisplay.STATE_NEGATIVE = 'negative';

export default withTheme()(BalanceDisplay);