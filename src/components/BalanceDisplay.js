import React, { Component } from 'react';
import { withTheme } from '@material-ui/core/styles';
import { palette } from "../services/themeProvider";
import Money from './Money';
import '../styles/etc.sass';

class BalanceDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getDisplayState() {
    return this.state.balance < 0 ? BalanceDisplay.STATE_NEGATIVE : BalanceDisplay.STATE_POSITIVE
  }

  render() {
    const style = `balance-display -${this.getDisplayState()}`;
    return (
      <div className={style}>
        <Money amount={this.props.amount} currency={this.props.currency} />
      </div>
    )
  }
}

BalanceDisplay.STATE_POSITIVE = 'positive';
BalanceDisplay.STATE_NEGATIVE = 'negative';

export default withTheme()(BalanceDisplay);