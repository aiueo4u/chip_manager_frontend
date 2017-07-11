import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardText,
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import BetControlField from './components/BetControlField';
import Dialog from 'material-ui/Dialog';

const Player = (
    {
      foldAction,
      callAction,
      checkAction,
      onBetAction,
      yourTurn,
      player,
      add,
      pot
    }) => (
  <Card>
    <CardText>
      <div>
        <div>{player.stack}</div>
        <RaisedButton label="チップ追加" primary={true} onTouchTap={add} />
        <RaisedButton label="Check" primary={true} onTouchTap={checkAction} />
        <RaisedButton label="Call" primary={true} onTouchTap={callAction} />
        <RaisedButton label="Fold" primary={true} onTouchTap={foldAction} />
        <BetControlField player={player} pot={pot} onBetAction={onBetAction} />
        <div>
          State: {player.state}
        </div>
        <div>
          Bet size in this state: {player.bet_amount_in_state}
        </div>
        <div>
          Total Bet size: {player.total_bet_amount}
        </div>
      </div>
    </CardText>
    {player.isFetching ? (
      <div>
        <CircularProgress />
      </div>
    ) : (<div></div>)}
  </Card>
)

const mapStateToProps = (state, ownProps) => {
  return {
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
