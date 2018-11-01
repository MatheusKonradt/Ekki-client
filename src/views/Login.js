import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { withTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as api from '../services/api';
import User from '../services/User';

import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import '../styles/main.sass';
import {BrowserRouter as Router, Redirect} from "react-router-dom";

class Login extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      currentView: 'home',
      email: null,
      code: null,
      loading: false,
      error: false,
    };
  }


  renderGenericLoginForm(params, onSubmit) {
    const $input = React.createRef();

    function handleSubmit(event) {
      event.preventDefault();
      const { value } = $input.current;
      onSubmit(value);
      return false;
    }

    return (
      <form onSubmit={handleSubmit}>
        <TextField
          label={params.label}
          type={params.type}
          className="input-login"
          margin="normal"
          variant="filled"
          autoFocus={true}
          inputRef={$input}
          error={this.state.error}
        />
        <Button type="submit" variant="contained" color="default" className="button-login">
          {params.text}
        </Button>
      </form>
    )
  }

  renderEmailView() {
    if (User.getAuthenticatedUserInstance()) {
      return this.goToBankZone();
    }

    const onSubmit = async (email) => {
      try {
        this.setState({loading: true, error: false});
        const response = await api.findOrCreateEmailAuthorization(email);
        this.setState({loading: false});
        const emailVerificationStatus = response.resources.emailVerification.status;
        if (emailVerificationStatus === 'CREATED') {
          this.setState({
            currentView: 'code',
            email,
          });
        } else {
          this.setState({
            currentView: 'signin',
            email,
          });
        }
      } catch (e) {
        console.error(e);
        this.setState({loading: false, error: true});
      }
    };

    const params = {
      label: 'Email',
      type: 'email',
      text: 'Próximo',
    };

    return (
      <React.Fragment>
        <div className="container -end">
          <Typography variant="h2">ekki</Typography>
        </div>
        <div className="container -start">
          {this.renderGenericLoginForm(params, onSubmit)}
        </div>
      </React.Fragment>
    )
  }

  renderCodeView() {
    const onSubmit = async (code) => {
      try {
        this.setState({loading: true, error: false});
        const response = await api.verifyEmailAndCreateUser(this.state.email, code);
        this.setState({loading: false});
        User.signIn(response.resources);
        this.setState({ currentView: 'signup' });
      } catch (e) {
        console.error(e);
        this.setState({loading: false, error: true});
      }
    };

    const params = {
      label: 'Código',
      type: 'text',
      text: 'Verificar',
    };

    return (
      <React.Fragment>
        <div className="container -end">
          <Typography variant="h4">Novo por aqui?</Typography>
          <Typography variant="h5">Enviamos para seu email o código para ativar sua conta.</Typography>
        </div>
        <div className="container -start">
          {this.renderGenericLoginForm(params, onSubmit)}
        </div>
      </React.Fragment>
    )
  }

  renderSignInView() {
    const onSubmit = async (pass) => {
      try {
        this.setState({loading: true, error: false});
        const response = await api.signInWithEmailAndPass(this.state.email, pass);
        this.setState({loading: false});
        User.signIn(response.resources);
        this.goToBankZone();
      } catch (e) {
        console.error(e);
        this.setState({loading: false, error: true});
      }
    };
    const params = {
      label: 'Senha',
      type: 'password',
      text: 'Entrar',
    };

    return (
      <React.Fragment>
        <div className="container -end">
          <Typography variant="h5">Digite sua senha</Typography>
        </div>
        <div className="container -start">
          {this.renderGenericLoginForm(params, onSubmit)}
        </div>
      </React.Fragment>
    )
  }

  renderSignUpView() {
    const onSubmit = async (displayName, password) => {
      try {
        const user = User.getAuthenticatedUserInstance();
        this.setState({loading: true, error: false});
        const response = await api.patchUserDisplayName(user.id, displayName);
        await api.updatePassword(password);
        this.setState({loading: false});
        User.signIn(response.resources);
        this.goToBankZone();
      } catch (e) {
        console.error(e);
        this.setState({loading: false, error: true});
      }
    };

    const $inputName = React.createRef();
    const $inputPass = React.createRef();

    function handleSubmit(event) {
      event.preventDefault();
      const displayName = $inputName.current.value;
      const password = $inputPass.current.value;
      onSubmit(displayName, password);
      return false;
    }

    return (
      <React.Fragment>
        <div className="container -end">
          <Typography variant="h5">Escolha uma senha e nos diga o seu nome!</Typography>
        </div>
        <div className="container -start">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nome"
              type="text"
              className="input-login"
              margin="normal"
              variant="filled"
              autoFocus={true}
              inputRef={$inputName}
              error={this.state.error}
              style={{marginBottom: 0}}
            />
            <TextField
              label="Senha"
              type="password"
              className="input-login"
              margin="normal"
              variant="filled"
              autoFocus={true}
              inputRef={$inputPass}
              error={this.state.error}
            />
            <Button type="submit" variant="contained" color="default" className="button-login">
              Pronto!
            </Button>
          </form>
        </div>
      </React.Fragment>

    )
  }

  goToBankZone() {
    this.props.history.push('/bank/home');
  }

  render() {

    let view;
    if (this.state.loading) {
      view = (<center><CircularProgress thickness={7} /></center>)
    } else {
      switch (this.state.currentView) {
        case 'code':
          view = this.renderCodeView();
          break;
        case 'signup':
          view = this.renderSignUpView();
          break;
        case 'signin':
          view = this.renderSignInView();
          break;
        case 'email':
        default:
          view = this.renderEmailView();
          break;
      }
    }

    return (
      <Router>
        <div className="view">
          <TransitionGroup>
            <CSSTransition
              key={this.state.currentView}
              classNames="fading-slide"
              timeout={300}>
              <div className="view login-view">
                <Grid container className="grid-container">
                  <Grid item xs={2} />
                  <Grid item xs={8} className="center-column">
                    {view}
                  </Grid>
                  <Grid item xs={2} />
                </Grid>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </Router>
    );
  }
}



export default withTheme()(Login);