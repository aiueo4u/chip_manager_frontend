import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
} from 'react-router-dom';

class PrivateRouteContent extends Component {
  componentWillMount() {
    const { isLoggedIn } = this.props
    if (!isLoggedIn) {
      // ログイン成功後のリダイレクト先を保存
      sessionStorage.setItem('redirectTo', window.location.href);
    }
  }

  render() {
    const { component: PrivateComponent, isLoggedIn, ...rest } = this.props
    if (isLoggedIn) {
      return (<PrivateComponent {...rest} />)
    } else {
      return (<Redirect to="/login" />)
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.data.playerSession.isLoggedIn,
    nickname: state.data.playerSession.nickname,
  }
}

const ConnectedPrivateRouteContent = connect(mapStateToProps)(PrivateRouteContent)

class PrivateRoute extends Component {
  render() {
    const { component, ...rest } = this.props
    const render_func = (props) => {
      return (
        <ConnectedPrivateRouteContent {...props} component={component} />
      )
    }
    return (
      <Route {...rest} render={render_func} />
    )
  }
}

export default PrivateRoute
