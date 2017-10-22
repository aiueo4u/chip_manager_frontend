import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TwitterLoginButton from './components/TwitterLoginButton';
import FacebookLoginButton from './components/FacebookLoginButton';
import WallPaperImage from 'components/WallPaperImage';

const loginPageStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'fixed',
  height: '50%',
  width: '80%',
  textAlign: 'center',
  margin: 'auto',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(200, 200, 200, 0.3)',
  borderRadius: '30px',
}

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
        <WallPaperImage />
        <div style={loginPageStyle}>
          <TwitterLoginButton />
          <FacebookLoginButton />
          <br />
          <div>or</div>
          <br />
          <form onSubmit={handleSubmit}>
            <TextField name="playerNicknameTextField" hintText="Your nickname" />
            <RaisedButton label="Debug Login" labelPosition="before" containerElement="label">
              <input type="submit" style={styles.submitInput} />
            </RaisedButton>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm;
