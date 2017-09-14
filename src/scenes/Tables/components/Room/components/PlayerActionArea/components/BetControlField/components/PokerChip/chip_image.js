import React, { Component } from 'react';
import chipImage from './chip.png';

class ChipImage extends Component {
  render() {
    const {
      layer_index,
      chipSize,
    } = this.props;

    return (
      <img
        src={chipImage}
        style={{ 'position': 'absolute', 'top': layer_index * -5 + 'px', 'width': '12vw' }}
        alt={'chip' + chipSize}
      />
    )
  }
}

export default ChipImage;
