import React, { Component } from 'react';
import MonetizationOnIcon from "@material-ui/core/SvgIcon/SvgIcon";
import EkkiLang from "./Lang";
import User from "../services/User";
import EkkiBalanceDisplay from "./BalanceDisplay";
import Card from "@material-ui/core/Card/Card";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";

class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: props.type,
      params: props.params,
    }
  }

  getActivityTextName() {
    switch (this.state.type) {
      case 'transfer_sent': return 'activity_transfer_sent_text';
      case 'transfer_received': return 'activity_transfer_received_text';
      default: return '';
    }
  }

  render() {
    return (
      <Card square className="-padded">
        <Avatar className="">JD</Avatar>
        <EkkiLang name={this.getActivityTextName} params={this.state.params}/>
      </Card>
    )
  }
}

export default Activity;
