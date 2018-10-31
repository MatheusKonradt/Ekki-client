import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import EkkiActivity from '../../components/Activity';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

import '../../styles/main.sass';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activities: [1,2,3,4,5,6,7,8,9,7,8,9]
    };
  }

  handleChange = (event, currentTab) => {
    this.setState({ currentTab });
  };

  renderActivity(activity) {
    return (
      <ListItem className="activity-list-item">
        <Avatar>
          <ImageIcon />
        </Avatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
    )
  }

  render() {
    return (
      <div className="view-container">
        <List className="activity-list">
          {this.state.activities.map(activity => this.renderActivity(activity))}
        </List>
      </div>
    )
  }
}

export default Home;