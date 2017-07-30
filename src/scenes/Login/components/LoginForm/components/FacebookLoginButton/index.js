import React from 'react';
import { FACEBOOK_LOGIN_ENDPOINT } from './../../../../../../Configuration.js'; // TODO: なんとかしたい。。
import RaisedButton from 'material-ui/RaisedButton';

const FacebookLoginButton = () => (
  <div>
    <a href={FACEBOOK_LOGIN_ENDPOINT}>
      <RaisedButton>Facebook Login</RaisedButton>
    </a>
  </div>
)

export default FacebookLoginButton;
