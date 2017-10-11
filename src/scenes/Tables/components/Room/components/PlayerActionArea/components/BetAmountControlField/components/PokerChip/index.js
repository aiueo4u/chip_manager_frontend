import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

const getColorClassName = (chipSize) => {
  return "pokerChipColor" + chipSize;
}

const PokerChip = ({ chipSize, onTouchTap }) => (
  <div
    className={"pokerChip " + getColorClassName(chipSize)}
    onTouchTap={onTouchTap}
  />
)

PokerChip.propTypes = {
  chipSize: PropTypes.number.isRequired,
  onTouchTap: PropTypes.func.isRequired,
}

export default PokerChip;
