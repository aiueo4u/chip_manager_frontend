import React from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import { Link } from 'react-router-dom';

const Home = ({ nickname }) => (
  <div>
    <ul>
      <li><Link to="/lobby">Lobby</Link></li>
      <li><Link to="/tables">Tables</Link></li>
    </ul>
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React, {nickname}!</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  </div>
)

export default connect(
  (state, ownProps) => {
    return {
      nickname: state.data.playerSession.nickname,
    }
  }
)(Home);
