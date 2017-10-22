import React from 'react';
import { connect } from 'react-redux';
import BetAmountControlField from './components/BetAmountControlField';
import BetActionControlField from './components/BetActionControlField';
import ActionControlField from './components/ActionControlField';

const PlayerActionArea = (
    {
      foldAction,
      callAction,
      checkAction,
      player,
      resetBetSize,
      dispatchBetAction,
      checkable,
      callable,
    }) => (
  <div style={{ height: '100%' }}>
    <BetAmountControlField player={player} />
    {/*
    {player.betSize > 0 ? (
      <ActionControlField
        dispatchBetAction={dispatchBetAction}
        resetBetSize={resetBetSize}
      />
    ) : (
      <BetActionControlField
        checkAction={checkAction}
        foldAction={foldAction}
        callAction={callAction}
        checkable={checkable}
        callable={callable}
      />
    )}
    */}
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const { player } = ownProps;
  const gameTable = state.scenes.Tables.Room.GameTable
  const aggressivePlayerExist = gameTable.lastAggressiveSeatNo ? true : false
  const checkable = !aggressivePlayerExist || gameTable.lastAggressiveSeatNo === player.seat_no
  const callable = !checkable
  return {
    checkable: checkable,
    callable: callable,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { player, tableId } = ownProps;

  return {
    foldAction: () => {
      dispatch(ownProps.onFoldAction(player.id));
    },
    callAction: () => {
      dispatch(ownProps.onCallAction(player.id));
    },
    checkAction: () => {
      dispatch(ownProps.onCheckAction(player.id));
    },
    resetBetSize: () => {
      dispatch({
        type: "RESET_BET_SIZE",
        tableId: tableId,
        playerId: player.id
      });
    },
    dispatchBetAction: () => {
      dispatch({
        type: "BET_ACTION",
        tableId: tableId,
        playerId: player.id,
        amount: player.betSize,
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerActionArea);
