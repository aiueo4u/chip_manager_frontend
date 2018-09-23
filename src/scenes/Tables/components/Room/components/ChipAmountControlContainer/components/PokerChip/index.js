import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

const getColorClassName = (chipSize) => {
  return "pokerChipColor" + chipSize;
}

const PokerChip = ({ chipSize, onClick }) => (
  <div
    className={"pokerChip " + getColorClassName(chipSize)}
    onClick={onClick}
  />
)

PokerChip.propTypes = {
  chipSize: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default PokerChip;
