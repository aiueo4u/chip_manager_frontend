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
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CircularProgress from 'material-ui/CircularProgress';

class InnerAppBar extends Component {
  render() {
    const { match, history, location, staticContext, ...rest } = this.props
    return (
      <AppBar
        {...rest}
        iconElementLeft={
          <IconMenu
            iconButtonElement={<IconButton><MenuIcon /></IconButton>}
          >
            <MenuItem primaryText="ホーム" onTouchTap={() => { history.push("/") }} />
          </IconMenu>
        }
      />
    )
  }
}

class CustomAppBar extends Component {
  render() {
    return (
      <Route path="/" render={(props) => <InnerAppBar {...props} {...this.props} />} />
    )
  }
}

function parse_query_string(query) {
  if (!query) {
    return {}
  }
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}

class App extends Component {
  componentWillMount() {
    let url = new URL(window.location.href);

    if (url.searchParams) {
      let jwt = url.searchParams.get('jwt')
      if (jwt) {
        localStorage.setItem('playerSession.jwt', jwt)
        // ブラウザのアドレスバーからJWTパラメータを削除する
        window.history.replaceState({}, "remove JWT", url.href.split('?')[0]);
      }
    } else {
      let parsed = parse_query_string(window.location.href.split('?')[1])
      if (parsed.jwt) {
        localStorage.setItem('playerSession.jwt', parsed.jwt)
        // ブラウザのアドレスバーからJWTパラメータを削除する
        window.history.replaceState({}, "remove JWT", url.href.split('?')[0]);
      }
    }

    // ログイン前のページへとリダイレクトさせる
    let redirectTo = sessionStorage.getItem('redirectTo')
    if (redirectTo) {
      sessionStorage.removeItem('redirectTo');
      window.location = redirectTo;
    }

    this.props.dispatch({ type: "FETCH_PLAYER" });
  }

  render() {
    const { isPrepared } = this.props;

    return isPrepared ? (
      <div>
        <Router>
          <div>
            <CustomAppBar title="Poker Chip Manager" />
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/newTable" component={Lobby} />
            <PrivateRoute path="/tables" component={Tables} />
          </div>
        </Router>
      </div>
    ) : (
      <div>
        <CircularProgress />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isPrepared: state.data.playerSession.isPrepared,
  }
}

export default connect(mapStateToProps)(App);
