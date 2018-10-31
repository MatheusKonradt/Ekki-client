import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EkkiMenu from '../components/Menu';
import HomeView from "./bank/Home";
import ActivitiesView from "./bank/Activities";
import Avatar from '@material-ui/core/Avatar';

import '../styles/main.sass';

class Home extends Component {

  constructor(props) {
    super(props);
    this.lastLocationValue = 0;
    this.state = {

    };
  }

  handleChange = (event, currentTab) => {
    this.setState({ currentTab });
  };

  renderWithTransition({ location }) {
    return (
      <div className="view">
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <Avatar className="">JD</Avatar>
            <Typography variant="h6" color="inherit">
              Ekki
            </Typography>
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
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
        <EkkiMenu />
      </div>
    )
  }

  render() {
    return (
      <Router>
        <Route render={this.renderWithTransition}/>
      </Router>
    )
  }
}

export default Home;