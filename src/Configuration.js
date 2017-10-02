var websocket_endpoint;
var api_endpoint;
var twitter_login_endpoint;
var facebook_login_endpoint;
if (process.env.NODE_ENV === 'production') {
  websocket_endpoint = 'ws://safe-fortress-96782.herokuapp.com';
  api_endpoint = 'https://safe-fortress-96782.herokuapp.com/api';
  twitter_login_endpoint = 'https://safe-fortress-96782.herokuapp.com/auth/twitter';
  facebook_login_endpoint = 'https://safe-fortress-96782.herokuapp.com/auth/facebook';
} else {
  websocket_endpoint = 'ws://localhost:3001';
  api_endpoint = 'http://localhost:3001/api';
  twitter_login_endpoint = 'http://localhost:3001/auth/twitter';
  facebook_login_endpoint = 'http://localhost:3001/auth/facebook';
}

export const WEBSOCKET_ENDPOINT = websocket_endpoint;
export const API_ENDPOINT = api_endpoint;
export const TWITTER_LOGIN_ENDPOINT = twitter_login_endpoint;
export const FACEBOOK_LOGIN_ENDPOINT = facebook_login_endpoint;

/*
export const WEBSOCKET_ENDPOINT = 'ws://192.168.100.102:3001';
export const API_ENDPOINT = 'http://192.168.100.102:3001/api';
export const TWITTER_LOGIN_ENDPOINT = 'http://192.168.100.102:3001/auth/twitter';
export const FACEBOOK_LOGIN_ENDPOINT = 'http://192.168.100.102:3001/auth/facebook';
*/
/*
export const WEBSOCKET_ENDPOINT = 'ws://localhost:3001';
export const API_ENDPOINT = 'http://localhost:3001/api';
export const TWITTER_LOGIN_ENDPOINT = 'http://localhost:3001/auth/twitter';
export const FACEBOOK_LOGIN_ENDPOINT = 'http://localhost:3001/auth/facebook';
*/
