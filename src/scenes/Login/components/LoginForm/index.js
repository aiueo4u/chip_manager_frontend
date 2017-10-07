import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TwitterLoginButton from './components/TwitterLoginButton';
import FacebookLoginButton from './components/FacebookLoginButton';

const styles = {
  submitInput: { // デフォルトのサブミットボタンは見えなくする
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    opacity: 0,
  }
}

class LoginForm extends Component {
  render() {
    const { isFetching, isLoggedIn, handleSubmit } = this.props

    if (isLoggedIn) {
      window.location = '/'
    }

    return isFetching ? (
      <div>
        <CircularProgress />
      </div>
    ) : (
      <div>
        <TwitterLoginButton />
        <FacebookLoginButton />
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <TextField name="playerNicknameTextField" hintText="Your nickname" />
            </div>
            <div>
              <RaisedButton label="ログイン" labelPosition="before" containerElement="label">
                <input type="submit" style={styles.submitInput} />
              </RaisedButton>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginForm;
