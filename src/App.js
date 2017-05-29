import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Home from './scenes/Home/index.js';
import Login from './scenes/Login';
import Lobby from './scenes/Lobby';
import Tables from './scenes/Tables';

class App extends Component {
  componentWillMount() {
    this.props.dispatch({ type: "INITIAL_LOGIN" });
  }

  render() {
    const { isPrepared } = this.props;

    return isPrepared ? (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/lobby" component={Lobby} />
          <PrivateRoute path="/tables" component={Tables} />
        </div>
      </Router>
    ) : (
      <div>Initializing...</div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isPrepared: state.data.playerSession.isPrepared,
  }
}

export default connect(mapStateToProps)(App);
