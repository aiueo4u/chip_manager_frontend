import React from 'react';
import { FACEBOOK_LOGIN_ENDPOINT } from 'Configuration.js';
import Button from '@material-ui/core/Button';

const facebookLoginButtonStyle = {
  width: '50vw',
}

const FacebookLoginButton = () => (
  <div>
    <a href={FACEBOOK_LOGIN_ENDPOINT}>
      <Button variant="raised" color="primary" style={facebookLoginButtonStyle}>Facebook Login</Button>
    </a>
  </div>
)

export default FacebookLoginButton;
