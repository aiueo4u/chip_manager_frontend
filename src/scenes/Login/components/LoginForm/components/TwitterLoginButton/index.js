import React from 'react';
import signInWithTwitterImage from './images/sign-in-with-twitter-link.png'
import { TWITTER_LOGIN_ENDPOINT } from 'Configuration.js';

const twitterLoginImageStyle = {
  width: '50vw',
  background: 'white',
  padding: '2vw',
}

const TwitterLoginButton = () => (
  <div>
    <a href={TWITTER_LOGIN_ENDPOINT}>
      <img
        src={signInWithTwitterImage}
        style={twitterLoginImageStyle}
        alt="Login with Twitter"
      />
    </a>
  </div>
)

export default TwitterLoginButton
