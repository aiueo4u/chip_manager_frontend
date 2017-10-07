import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import './chip_image.css'

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

    let chipClassName = `pokerChip pokerChipColor${chipSize}`;

    return (
      <div
        className={chipClassName}
        onTouchTap={onTouchTap}
      >
      </div>
    )
  }
}

export default ChipImage;
