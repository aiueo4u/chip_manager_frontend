import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import FacebookIcon from 'assets/facebook-icon.png';
import { FACEBOOK_LOGIN_ENDPOINT } from 'Configuration.js';

import styles from './FacebookLoginButtonStyles';

const useStyles = makeStyles(styles);

function FacebookLoginButton() {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      startIcon={<Avatar src={FacebookIcon} className={classes.icon} />}
      className={classes.button}
      href={FACEBOOK_LOGIN_ENDPOINT}
    >
      Facebookでログイン
    </Button>
  );
};

export default FacebookLoginButton;
