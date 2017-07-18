import React from 'react';
import { connect } from 'react-redux';
/*
import {
  Card,
  CardText,
} from 'material-ui/Card';
*/
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import BetControlField from './components/BetControlField';

const buttonStyle = {
  width: '30px',
  height: '30px',
  margin: '5px',
}

const Player = (
    {
      foldAction,
      callAction,
      checkAction,
      onBetAction,
      yourTurn,
      player,
      add,
      pot,
      inGame,
      aggressivePlayerExist
    }) => (
  <div>
    <div>
      {yourTurn ? (
        <div>
          <RaisedButton style={buttonStyle} label="チップ追加" primary={true} onTouchTap={add} />
          <RaisedButton style={buttonStyle} label="Check" primary={true} onTouchTap={checkAction} />
          <RaisedButton style={buttonStyle} label="Call" primary={true} onTouchTap={callAction} />
          <RaisedButton style={buttonStyle} label="Fold" primary={true} onTouchTap={foldAction} />
          {player.stack > 0 ? (<BetControlField player={player} pot={pot} onBetAction={onBetAction} />) : (<div></div>)}
        </div>
      ) : (<div></div>)
      }
    {player.isFetching ? (
      <div>
        <CircularProgress />
      </div>
    ) : (<div></div>)}
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  return {
    aggressivePlayerExist: state.scenes.Tables.Room.GameTable.lastAggressiveSeatNo ? true : false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { player } = ownProps;

  return {
    add: () => {
      let amount = 10;
      dispatch(ownProps.onAddChip(player.id, amount));
    },
    foldAction: () => {
      dispatch(ownProps.onFoldAction(player.id));
    },
    callAction: () => {
      dispatch(ownProps.onCallAction(player.id));
    },
    checkAction: () => {
      dispatch(ownProps.onCheckAction(player.id));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
