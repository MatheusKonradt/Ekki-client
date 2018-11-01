import React, { Component } from 'react';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import EkkiActivity from '../../components/Activity';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import * as api from '../../services/api';
import '../../styles/main.sass';
import Button from "@material-ui/core/Button/Button";
import User from '../../services/User';

function getErrorCode(e) {
  return _.get(e, 'response.data.code');
}

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  async loadUsers() {
    const users = await api.listUsers();
    this.setState({ users });
  }

  handleChange = (event, currentTab) => {
    this.setState({ currentTab });
  };

  async transferTo(user) {
    const value = window.prompt('Quanto deseja transferir? (e.g. 100.90 | 100.0 | 109.8)');
    if (!/^\d+(\.\d+)?$/.test(value)) window.alert('Somente valores númericos!');

    const transfer = {
      fromUserId: User.getAuthenticatedUserInstance().id,
      toUserId: user._id,
      amount: Math.round(parseFloat(value) * 100),
      currency: 'BRL'
    };

    try {
      await api.createTransfer(transfer);
    } catch (e) {
      if (getErrorCode(e) === 'ERR_NOT_ENOUGH_FOUNDS' && window.confirm('Fundos insuficientes. Deseja utiliza o cartão de credito?')) {
        transfer.allowCreditCardUsage = true;
      } else {
        return;
      }

      try {
        await api.createTransfer(transfer);
      } catch (e) {
        if (getErrorCode(e) === 'ERR_NOT_ENOUGH_FOUNDS') alert('Limite insuficiente!');
        else if (getErrorCode(e) === 'ERR_RESOURCE_NOT_FOUND') alert('Você precisa ativar um cartão primeiro!');
        else alert('Algo deu errado. Tente novamente mais tarde.')
      }
    }
  }

  renderUser(user) {
    let avatar = user.displayName.split(' ').slice(0, 2).map(n => n.charAt(0)).join('').toUpperCase();
    return (
      <ListItem key={user._id} className="activity-list-item">
        <Avatar className="">{avatar}</Avatar>
        <ListItemText primary={user.displayName} secondary={user.email} />
        <Button onClick={() => this.transferTo.bind(this)(user)}>Transferir</Button>
      </ListItem>
    )
  }

  render() {
    return (
      <div className="view-container">
        <List className="activity-list">
          {this.state.users.map(user => this.renderUser(user))}
        </List>
      </div>
    )
  }
}

export default Users;