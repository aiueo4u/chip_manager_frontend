import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PokerChip from './components/PokerChip';
import './style.css';

const BetAmountControlField = ({ incrementBetSize }) => (
  <div className="chipFieldContainer">
    <PokerChip chipSize={25} onTouchTap={() => incrementBetSize(25)} />
    <PokerChip chipSize={100} onTouchTap={() => incrementBetSize(100)} />
    <PokerChip chipSize={500} onTouchTap={() => incrementBetSize(500)} />
    <PokerChip chipSize={1000} onTouchTap={() => incrementBetSize(1000)} />
  </div>
)

BetAmountControlField.propTypes = {
  incrementBetSize: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => { return {} }
const mapDispatchToProps = (dispatch, ownProps) => {
  const { player } = ownProps;

  return {
    incrementBetSize: (amount) => {
      dispatch({
        type: "INCREMENT_BET_SIZE",
        playerId: player.id,
        playerStack: player.stack,
        amount: amount,
      });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BetAmountControlField);
