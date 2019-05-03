import React from 'react'

import {
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const roundToReadable = (round) => {
  switch (round) {
    case 'preflop':
      return "プリフロップ";
    case 'flop':
      return "フロップ";
    case 'turn':
      return "ターン";
    case 'river':
      return "リバー";
    case 'finished':
      return '終了'
    default:
      return round;
  }
}

const styles = theme => ({
  container: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    background: 'rgba(0, 0, 0, 0.7)',
    padding: theme.spacing.unit / 2,
    zIndex: theme.zIndex.appBar,
  },
  handCount: {
    color: theme.palette.common.white,
    display: 'inline-block',
  },
  round: {
    color: theme.palette.common.white,
    display: 'inline-block',
    marginRight: theme.spacing.unit,
  },
})

function TopInfobar({ handCount, round, classes }) {
  return (
    <div className={classes.container}>
      <Typography variant="caption" className={classes.round}>
        {roundToReadable(round)}
      </Typography>
      <Typography variant="caption" className={classes.handCount}>
        第
        {handCount}
        ゲーム
      </Typography>
    </div>
  )
}

export default withStyles(styles)(TopInfobar)
