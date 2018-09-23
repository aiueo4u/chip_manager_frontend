import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
            <TextField name="playerNicknameTextField" placeholder="Your nickname" />
            <Button variant="raised" component="label">
              デバッグログイン
              <input type="submit" style={styles.submitInput} />
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm;
