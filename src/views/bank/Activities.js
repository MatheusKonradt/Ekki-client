import React, { Component } from 'react';
import Money from '../../components/Money';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import * as api from '../../services/api';
import User from '../../services/User';

import '../../styles/main.sass';
import Button from "@material-ui/core/Button/Button";

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transfers: []
    };
  }

  componentDidMount() {
    this.loadTransfersList();
  }

  async loadTransfersList() {
    const userId = User.getAuthenticatedUserInstance().id;
    const transfers = await api.listTransfersByUserId(userId);
    this.setState({ transfers });
  }

  handleChange = (event, currentTab) => {
    this.setState({ currentTab });
  };

  renderTransfers(transfer) {
    const type = User.getAuthenticatedUserInstance().id === transfer.fromUserId ? 'SEND' : 'RECEIVED';
    const label = type === 'SEND' ? `enviados para ${transfer.toUser.displayName}` : `recebidos de ${transfer.fromUser.displayName}`;
    return (
      <ListItem key={transfer._id} className="activity-list-item">
        <Avatar>
          {type === 'SEND' ? (<KeyboardArrowDownIcon style={{color:'red'}}/>) : (<KeyboardArrowUpIcon style={{color:'green'}}/>)}
        </Avatar>
        <ListItemText primary={Money.format(transfer.amount, transfer.currency)} secondary={label} />
        {transfer.allowCreditCardUsage ? (<Button disabled>CARD</Button>) : ''}
      </ListItem>
    )
  }

  render() {
    return (
      <div className="view-container">
        <List className="activity-list">
          {this.state.transfers.map(transfer => this.renderTransfers(transfer))}
        </List>
      </div>
    )
  }
}

export default Home;