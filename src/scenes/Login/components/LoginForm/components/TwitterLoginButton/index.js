import React from 'react';
import signInWithTwitterImage from './images/sign-in-with-twitter-gray.png'
import { TWITTER_LOGIN_ENDPOINT } from './../../../../../../Configuration.js'; // TODO: なんとかしたい。。

const TwitterLoginButton = () => (
  <div>
    <a href={TWITTER_LOGIN_ENDPOINT}><img src={signInWithTwitterImage} alt="Login with Twitter" /></a>
  </div>
)

export default TwitterLoginButton
