import React, { Component } from 'react';
import './chip_image.css'

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
