import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardText,
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

const Player = ({ foldAction, callAction, checkAction, yourTurn, player, add, bet, incrementBetSize, takePot }) => (
  <Card>
    <CardText>
      {yourTurn ? (<div>YourTurn</div>) : (<div></div>)}
      <div>
        [Seat {player.seat_no}][Pos {player.position}] {player.nickname},{player.stack}
        <RaisedButton label="追加" primary={true} onTouchTap={add} />
        <RaisedButton label="Check" primary={true} onTouchTap={checkAction} />
        <RaisedButton label="Bet" primary={true} onTouchTap={bet} />
        <RaisedButton label="BetSize++" primary={true} onTouchTap={incrementBetSize} />
        <RaisedButton label="Call" primary={true} onTouchTap={callAction} />
        <RaisedButton label="Fold" primary={true} onTouchTap={foldAction} />

        <RaisedButton label="Take pot" primary={true} onTouchTap={takePot} />
        <div>
          State: {player.state}
        </div>
        <div>
          Bet size: {player.betSize}
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
    bet: () => {
      let amount = player.betSize;
      dispatch(ownProps.onBetAction(player.id, amount));
    },
    incrementBetSize: () => {
      let amount = 10; // TODO
      dispatch({ type: "INCREMENT_BET_SIZE", playerId: player.id, amount: amount })
    },
    takePot: () => {
      dispatch(ownProps.onTakePotAction(player.id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
