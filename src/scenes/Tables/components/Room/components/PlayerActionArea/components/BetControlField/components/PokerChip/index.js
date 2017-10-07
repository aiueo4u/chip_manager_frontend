import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import ChipImage from './chip_image';

class PokerChip extends Component {
  render() {
    const { chipSize, onIncrementBetSize } = this.props;

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
