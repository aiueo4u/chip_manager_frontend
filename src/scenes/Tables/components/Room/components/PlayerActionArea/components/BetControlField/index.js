import React, { Component } from 'react';
import { connect } from 'react-redux';
import PokerChip from './components/PokerChip';

const fieldStyle = {
  'display': 'flex',
  'flexDirection': 'row',
  'justifyContent': 'space-around',
  'background': 'yellow',
}

class BetControlField extends Component {
  render() {
    const { player, incrementBetSize } = this.props;

    let stack = player.stack - (player.betSize || 0);

    let count1000 = parseInt(stack / 1000, 10);
    stack = stack - count1000 * 1000;
    let count500 = parseInt(stack / 500, 10);
    stack = stack - count500 * 500;
    let count100 = parseInt(stack / 100, 10);
    stack = stack - count100 * 100;
    let count25 = parseInt(stack / 25, 10);

    return (
      <div style={fieldStyle}>
        <PokerChip chipSize={25} count={count25} incrementBetSize={incrementBetSize} />
        <PokerChip chipSize={100} count={count100} incrementBetSize={incrementBetSize} />
        <PokerChip chipSize={500} count={count500} incrementBetSize={incrementBetSize} />
        <PokerChip chipSize={1000} count={count1000} incrementBetSize={incrementBetSize} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(BetControlField);
