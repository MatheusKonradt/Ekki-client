import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown'
import _ from 'lodash';
import ptBR from "../lang/pt-BR";

import '../styles/etc.sass';

class Lang extends Component {
  static getCurrentLangFile() {
    return ptBR;
  }

  static getText(name, params) {
    const text = this.getCurrentLangFile()[name];
    if (!text) return '';
    const template = _.template(text);
    return template(params);
  }

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      params: props.params
    }
  }

  render() {
    return (
      <ReactMarkdown className="lang-text" source={Lang.getText(this.state.name, this.state.params)} />
    )
  }
}

export default Lang;