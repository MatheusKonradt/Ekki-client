import React, { Component } from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EkkiMenu from '../components/Menu';
import HomeView from "./bank/Home";
import ActivitiesView from "./bank/Activities";
import UsersView from "./bank/Users";
import Avatar from '@material-ui/core/Avatar';
import User from '../services/User';
import '../styles/main.sass';
import Button from "@material-ui/core/Button/Button";

class Home extends Component {
  signOff() {
    User.signOff();
    this.props.history.push('/');
  }

  renderWithTransition({ location }) {
    const user = User.getAuthenticatedUserInstance();
    console.log(user);
    const avatar = user.displayName.split(' ').slice(0, 2).map(n => n.charAt(0)).join('').toUpperCase();

    return (
      <div className="view">
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Avatar className="header-avatar">{avatar}</Avatar>
            <Typography variant="h6" color="inherit">
              {user.displayName}
            </Typography>
            <Button className="exit-button" onClick={this.signOff.bind(this)}>sair</Button>
          </Toolbar>
        </AppBar>
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="fading-slide"
            timeout={300}
          >
            <div className="bank-view">
              <Switch location={location}>
                <Route path="/bank/home" component={HomeView}/>
                <Route path="/bank/activities" component={ActivitiesView}/>
                <Route path="/bank/contacts" component={UsersView}/>
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
        <EkkiMenu />
      </div>
    )
  }

  render() {
    if (!User.getAuthenticatedUserInstance()) {
      return <Redirect to='/' />;
    }
    return (
      <Router>
        <Route render={this.renderWithTransition.bind(this)}/>
      </Router>
    )
  }
}

export default Home;