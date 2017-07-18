import React from 'react';
import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
  width: '40px',
  height: '50px',
  margin: '5px',
}

const BetControlField = (
    {
      player,
      setBetSizeHalfPot,
      setBetSizePot,
      setBetSizeAllIn,
      incrementBetSize10,
      decrementBetSize10,
      bet,
      handleBetAmountSliderChange
    }
  ) => (
  <div>
    <Slider
      min={0}
      max={player.stack}
      step={10}
      defaultValue={player.betSize}
      value={player.betSize}
      onChange={handleBetAmountSliderChange}
    />
    <RaisedButton style={buttonStyle} label="1/2" onTouchTap={setBetSizeHalfPot} />
    <RaisedButton style={buttonStyle} label="1/1" onTouchTap={setBetSizePot} />
    <RaisedButton style={buttonStyle} label="all-in" onTouchTap={setBetSizeAllIn} />
    <RaisedButton style={buttonStyle} label="+10" onTouchTap={incrementBetSize10} />
    <RaisedButton style={buttonStyle} label="-10" onTouchTap={decrementBetSize10} />
    {player.betSize ? <RaisedButton style={buttonStyle} label={`${player.betSize} Bet`} primary={true} onTouchTap={bet} /> : ''}
  </div>
)

const onChangeBetAmountAction = (playerId, amount) => {
  return { type: "CHANGE_BET_AMOUNT", playerId: playerId, amount: amount };
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { player } = ownProps;

  return {
    handleBetAmountSliderChange: (event, value) => {
      dispatch(onChangeBetAmountAction(player.id, value));
    },
    setBetSizePot: () => {
      let amount = ownProps.pot;
      dispatch({ type: "SET_BET_SIZE", playerId: player.id, amount: amount })
    },
    setBetSizeHalfPot: () => {
      let amount = Math.round(ownProps.pot / 2);
      dispatch({ type: "SET_BET_SIZE", playerId: player.id, amount: amount })
    },
    setBetSizeAllIn: () => {
      let amount = player.stack;
      dispatch({ type: "SET_BET_SIZE", playerId: player.id, amount: amount })
    },
    incrementBetSize10: () => {
      let amount = 10;
      dispatch({ type: "INCREMENT_BET_SIZE", playerId: player.id, playerStack: player.stack, amount: amount })
    },
    decrementBetSize10: () => {
      let amount = 10;
      dispatch({ type: "DECREMENT_BET_SIZE", playerId: player.id, amount: amount })
    },
    bet: () => {
      let amount = player.betSize;
      dispatch(ownProps.onBetAction(player.id, amount));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BetControlField);
