import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

const chipStyle = {
  height: 80,
  width: '20vw',
  textAlign: 'center',
}

class ChipImage extends Component {
  render() {
    const {
      chipSize,
      onTouchTap,
    } = this.props;

    return (
      <Paper
        style={chipStyle}
        circle={true}
        onTouchTap={onTouchTap}
        zDepth={3}
      >
        {chipSize}
      </Paper>
    )
  }
}

export default ChipImage;
