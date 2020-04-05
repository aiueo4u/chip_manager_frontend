import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

import TwitterIcon from 'assets/twitter-icon.svg';
import { TWITTER_LOGIN_ENDPOINT } from 'Configuration.js';

import styles from './TwitterLoginButtonStyles';

const useStyles = makeStyles(styles);

function TwitterLoginButton() {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={classes.button}
      startIcon={<Avatar src={TwitterIcon} className={classes.icon} />}
      href={TWITTER_LOGIN_ENDPOINT}
    >
      Twitterでログイン
    </Button>
  );
};

export default TwitterLoginButton;
