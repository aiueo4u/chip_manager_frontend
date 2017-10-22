import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PokerChip from './components/PokerChip';
import './style.css';

const BetAmountControlField = ({ incrementBetSize }) => (
  <div className="chipFieldContainer">
    <div style={{ width: '18%', height: '100%', margin: '1%' }}>
      <PokerChip chipSize={25} onTouchTap={() => incrementBetSize(25)} />
    </div>
    <div style={{ width: '18%', height: '100%', margin: '1%' }}>
      <PokerChip chipSize={100} onTouchTap={() => incrementBetSize(100)} />
    </div>
    <div style={{ width: '20%' }} />
    <div style={{ width: '18%', height: '100%', margin: '1%' }}>
      <PokerChip chipSize={500} onTouchTap={() => incrementBetSize(500)} />
    </div>
    <div style={{ width: '18%', height: '100%', margin: '1%' }}>
      <PokerChip chipSize={1000} onTouchTap={() => incrementBetSize(1000)} />
    </div>
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
