import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import { muiTheme } from './services/themeProvider';
import './App.css';

import LoginView from './views/Login';
import BankView from './views/Bank';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Router>
          <MuiThemeProvider theme={muiTheme}>
            <Switch>
              <Route exact path="/" component={LoginView}/>
              <Route path="/bank" component={BankView}/>
            </Switch>
          </MuiThemeProvider>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
