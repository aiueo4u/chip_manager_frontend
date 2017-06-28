import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameTable from './components/GameTable';
import Player from './components/Player';
import {
  enteringRoom,
  addChip,
  betAction,
  callAction,
  foldAction,
  checkAction,
  takePotAction,
  playerActionReceived,
} from './data/actions.js';
import CircularProgress from 'material-ui/CircularProgress';
import Information from './components/Information';

import ActionCable from 'actioncable';

const gameStartButtonClicked = (tableId) => {
  return { type: "GAME_START_BUTTON_CLICKED", tableId: tableId };
}

class Room extends Component {
  componentDidMount() {
    const { match, onEnteredRoom, onPlayerActionReceived } = this.props;

    // action cable setup
    this.App = {}
    const jwt = localStorage.getItem('playerSession.jwt');
    this.App.cable = ActionCable.createConsumer(`ws://localhost:3001/cable?jwt=${jwt}`);

    let tableId = match.params.id;

    this.App.ChipChannel = this.App.cable.subscriptions.create({ channel: 'ChipChannel', tableId: tableId }, {
      connected() {
        console.log("Chip Channel connected")
        onEnteredRoom();
      },
      disconnected() { console.log("Chip Channel disconnected") },
      received(data) {
        console.log("Chip Channel received", data)
        onPlayerActionReceived(data);
      },
      rejected(data) { console.log("Chip Channel rejected", data) },
    });
  }

  componentWillUnmount() {
    this.App.ChipChannel.unsubscribe();
  }

  render() {
    const { onFoldAction, onCheckAction, currentSeatNo, gameHandState, onGameStart, players, tableId, tableName, onTakePotAction, onAddChip, onCallAction, onBetAction, pot, isReady, informationItems } = this.props

    return (!isReady) ? (
      <div>
        <CircularProgress />
      </div>
    ) : (
      <div>
        <GameTable
          tableName={tableName}
          tableId={tableId}
          pot={pot}
          onGameStart={onGameStart}
          gameHandState={gameHandState}
        />
        <Information informationItems={informationItems} tableId={tableId} />
        {players.map(player => (
          <Player
            key={player.id}
            player={player}
            onAddChip={onAddChip}
            onCheckAction={onCheckAction}
            onBetAction={onBetAction}
            onCallAction={onCallAction}
            onFoldAction={onFoldAction}
            onTakePotAction={onTakePotAction}
            yourTurn={currentSeatNo == player.seat_no}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { Room } = state.scenes.Tables;
  const tableId = ownProps.match.params.id;

  return {
    tableId: tableId,
    tableName: tableId, // TODO
    players: Room.Players,
    pot: Room.GameTable.pot,
    playerSession: state.data.playerSession,
    isReady: Room.GameTable.isReady,
    informationItems: state.scenes.Tables.Room.Information.informationItems,
    onAddChip: (playerId, amount) => {
      return addChip(tableId, playerId, amount);
    },
    onCheckAction: (playerId) => {
      return checkAction(tableId, playerId);
    },
    onFoldAction: (playerId) => {
      return foldAction(tableId, playerId);
    },
    onCallAction: (playerId) => {
      return callAction(tableId, playerId);
    },
    onBetAction: (playerId, amount) => {
      return betAction(tableId, playerId, amount);
    },
    onTakePotAction: (playerId) => {
      return takePotAction(tableId, playerId);
    },
    gameHandState: Room.GameTable.gameHandState,
    currentSeatNo: Room.GameTable.currentSeatNo,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const tableId = ownProps.match.params.id;

  return {
    onEnteredRoom: () => {
      let tableId = ownProps.match.params.id;
      dispatch(enteringRoom(tableId));
    },
    onPlayerActionReceived: (data) => {
       dispatch(playerActionReceived(data.pot, data.game_hand_state, data.players, data.current_seat_no));
    },
    onGameStart: () => {
       dispatch(gameStartButtonClicked(tableId));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
