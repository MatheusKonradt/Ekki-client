import React, { Component } from 'react';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EkkiLogo from "../../components/Logo";
import EkkiBalanceDisplay from "../../components/BalanceDisplay";
import EkkiLang from '../../components/Lang';
import User from '../../services/User';
import * as api from '../../services/api';

import '../../styles/main.sass';
import Button from "@material-ui/core/Button/Button";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wallet: null,
      card: null,
    };

  }

  componentDidMount() {
    this.loadDashboardInformation();
  }

  async loadDashboardInformation() {
    const userId = User.getAuthenticatedUserInstance().id;
    const [wallet, card] = await Promise.all([
      api.getWalletByUserId(userId),
      api.getCardByUserId(userId),
    ]);
    this.setState({ wallet, card });
  }

  async createCard() {
    const userId = User.getAuthenticatedUserInstance().id;
    const card = await api.createCardForUser(userId);
    this.setState({ card });
  }

  render() {
    const walletAmount = _.get(this.state, 'wallet.amount', 0);
    const cardDebit = _.get(this.state, 'card.debit', 0);
    const cardLimit = _.get(this.state, 'card.limit', 0);
    const cardLastingLimit = cardLimit - cardDebit;
    const isCardEnabled = Boolean(this.state.card);

    return (
      <div className="view-container">
        <Grid container direction="column" spacing={0}>

          <Grid item xs={12}>
            <Paper square className="-padded -double-pad-top">
              <MonetizationOnIcon className="top-card-icon" /><br />
              <EkkiLang name={"home_account_balance_presentation"} params={{userName: User.getAuthenticatedUserInstance().getDisplayName()}}/>
              <EkkiBalanceDisplay balance={walletAmount}/>
            </Paper>
          </Grid>

          {isCardEnabled ?
            (
              <Grid item xs={12}>
                <Paper square className="-padded -double-pad-top">
                  <CreditCardIcon className="top-card-icon" /><br />
                  <EkkiLang name={"home_creadit_card_debit_presentation"}/>
                  <EkkiBalanceDisplay balance={cardDebit}/>
                  <EkkiLang name={"home_credit_card_limit_presentation"} params={{limit: cardLastingLimit} />
                  <br />
                  <Button variant="contained" color="secondary">Excluir Cartão!</Button>
                </Paper>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Paper square className="-padded -double-pad-top">
                  <CreditCardIcon className="top-card-icon" /><br />
                  <EkkiLang name={"home_credit_card_not_found"}/>
                  <br />
                  <Button variant="contained" color="default" onClick={this.createCard()}>Criar Cartão!</Button>
                </Paper>
              </Grid>
            )
          }

        </Grid>
      </div>
    )
  }
}

export default Home;