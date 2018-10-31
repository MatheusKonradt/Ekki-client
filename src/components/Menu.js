import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';
import PeopleIcon from '@material-ui/icons/People';

import '../styles/menu.sass'
import {Link, BrowserRouter as Router} from "react-router-dom";

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0
    };
  }

  handleChange = (event, currentTab) => {
    this.setState({ currentTab });
  };

  static getPathnameValue(pathname) {
    const values = {};
    values['/bank/home'] = 0;
    values['/bank/activities'] = 1;
    values['/bank/contacts'] = 2;
    console.log(pathname);
    return values[pathname];
  }

  render() {
    return (
      <div className="menu">
        <Paper square>
          <BottomNavigation
            value={this.state.currentTab}
            onChange={this.handleChange}
            showLabels
            className=""
          >
            <BottomNavigationAction component={Link} label="Dashboard" to="/bank/home" icon={<DashboardIcon />} />
            <BottomNavigationAction component={Link} label="Atividades" to="/bank/activities" icon={<ListIcon />} />
            <BottomNavigationAction component={Link} label="Contatos" to="/bank/contacts"icon={<PeopleIcon />} />
          </BottomNavigation>
        </Paper>
      </div>
    )
  }
}

export default Menu;