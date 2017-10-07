import React from 'react';
import { FACEBOOK_LOGIN_ENDPOINT } from './../../../../../../Configuration.js'; // TODO: なんとかしたい。。
import RaisedButton from 'material-ui/RaisedButton';

const facebookLoginButtonStyle = {
  width: '50vw',
}

const FacebookLoginButton = () => (
  <div>
    <a href={FACEBOOK_LOGIN_ENDPOINT}>
      <RaisedButton style={facebookLoginButtonStyle}>Facebook Login</RaisedButton>
    </a>
  </div>
)

export default FacebookLoginButton;
