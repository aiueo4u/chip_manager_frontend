import React from 'react'
import {
  CircularProgress,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  container: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
})

function Loading({ classes }) {
  return (
    <div className={classes.container}>
      <div className={classes.progress}>
        <CircularProgress size={80} />
      </div>
    </div>
  )
}

export default withStyles(styles)(Loading)
