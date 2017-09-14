import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import BetControlField from './components/BetControlField';

const buttonStyle = {
}

const waitingStyle = {
  'background': 'red',
  'height': '100%',
}

const yourTurnStyle = {
  'background': 'green',
  'height': '100%',
}


const PlayerActionArea = (
    {
      foldAction,
      callAction,
      checkAction,
      onBetAction,
      yourTurn,
      player,
      pot,
      inGame,
      aggressivePlayerExist,
      resetBetSize,
      dispatchBetAction,
      checkable,
      callable,
    }) => (
  <div style={yourTurn ? yourTurnStyle : waitingStyle }>
    {player.isFetching ? (
      <div>
        <CircularProgress />
      </div>
    ) : (
      <div style={{ 'height': '100%' }}>
        <div style={{ 'height': '70%' }}>
          <BetControlField player={player} pot={pot} onBetAction={onBetAction} />
        </div>
        {player.betSize > 0 ? (
          <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-around' }}>
            <RaisedButton style={buttonStyle} label="Bet" primary={true} onTouchTap={dispatchBetAction} />
            <RaisedButton style={buttonStyle} label="Reset" primary={true} onTouchTap={resetBetSize} />
          </div>
        ) : (
          <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'space-around' }}>
            <RaisedButton
              disabled={!checkable}
              style={buttonStyle}
              label="Check"
              primary={true}
              onTouchTap={checkAction}
            />
            <RaisedButton
              disabled={!callable}
              style={buttonStyle}
              label="Call"
              primary={true}
              onTouchTap={callAction}
            />
            <RaisedButton style={buttonStyle} label="Fold" primary={true} onTouchTap={foldAction} />
          </div>
        )}
      </div>
    )}
  </div>
)

const mapStateToProps = (state, ownProps) => {
  const { player } = ownProps;
  const gameTable = state.scenes.Tables.Room.GameTable
  const aggressivePlayerExist = gameTable.lastAggressiveSeatNo ? true : false
  //const checkable = !aggressivePlayerExist || player.bb_option_usable
  const checkable = !aggressivePlayerExist || gameTable.lastAggressiveSeatNo == player.seat_no
  const callable = !checkable
  return {
    aggressivePlayerExist: aggressivePlayerExist,
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
