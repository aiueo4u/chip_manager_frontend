import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import ChipImage from './chip_image';

class PokerChip extends Component {
  render() {
    const { count, chipSize, onIncrementBetSize } = this.props;

    let images = [];

    if (count === 0) {
      images.push(
        <ChipImage
          key={0}
          layer_index={0}
          chipSize={chipSize}
        />
      )
    } else {
      for (let i = 0; i < count; i ++) {
        images.push(
          <ChipImage
            key={i}
            layer_index={i}
            chipSize={chipSize}
          />
        )
      }
    }

    return (
      <ChipImage
        chipSize={chipSize}
        onTouchTap={onIncrementBetSize}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => { return {} }
const mapDispatchToProps = (dispatch, ownProps) => {
  const { chipSize, incrementBetSize } = ownProps;
  return {
    onIncrementBetSize: () => {
      incrementBetSize(chipSize);
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokerChip);
