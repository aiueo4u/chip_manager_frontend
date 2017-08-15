import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameTable from './components/GameTable';
import Player from './components/Player';
import {
  addChip,
  betAction,
  callAction,
  foldAction,
  checkAction,
  playerActionReceived,
  gameHandActionReceived,
  gameHandFinishedReceived,
} from './data/actions.js';
import CircularProgress from 'material-ui/CircularProgress';
import Information from './components/Information';
import GameDialog from './components/GameDialog';
import Dialog from 'material-ui/Dialog';
import ActionCable from 'actioncable';
import { WEBSOCKET_ENDPOINT } from './../../../../Configuration.js'; // TODO: 何とか良い感じに参照したい。。

const gameStartButtonClicked = (tableId) => {
  return { type: "GAME_START_BUTTON_CLICKED", tableId: tableId };
}

const gameStartable = (gameHandState) => {
  return !gameHandState || gameHandState === 'finished' || gameHandState === 'init'
}

class Room extends Component {
  componentDidMount() {
    const {
      onActionCableConnected,
      onActionCableDisconnected,
      match,
      onGameHandFinishedReceived,
      onGameHandActionReceived,
      onPlayerActionReceived
    } = this.props;

    // action cable setup
    this.App = {}
    const jwt = localStorage.getItem('playerSession.jwt');
    this.App.cable = ActionCable.createConsumer(`${WEBSOCKET_ENDPOINT}/cable?jwt=${jwt}`);

    let tableId = match.params.id;

    // TODO: create失敗のエラーハンドリングはどうやるんだろう。。
    this.App.ChipChannel = this.App.cable.subscriptions.create({ channel: 'ChipChannel', tableId: tableId }, {
      connected() {
        console.log("Chip Channel connected")
        onActionCableConnected();
      },
      disconnected() {
        console.log("Chip Channel disconnected")
        onActionCableDisconnected();
      },
      received(data) {
        console.log("Chip Channel received", data)
        if (data.type === 'player_action') {
          onPlayerActionReceived(data);
        } else if (data.type === 'game_hand') {
          onGameHandActionReceived(data);
        } else if (data.type === 'game_hand_finished') {
          onGameHandFinishedReceived(data)
        }
      },
      rejected(data) { console.log("Chip Channel rejected", data) },
    });
  }

  componentWillUnmount() {
    this.App.ChipChannel.unsubscribe();
  }

  render() {
    const {
      gameTable,
      playerSession,
      onFoldAction,
      onCheckAction,
      informationItems,
      onGameStart, players, tableId, tableName, onAddChip, onCallAction, onBetAction } = this.props

    let isSeated = players.find(player => player.id === playerSession.playerId) ? true : false
    const inGame = !gameStartable(gameTable.gameHandState);

    return (!gameTable.isReady) ? (
      <div>
        <CircularProgress />
      </div>
    ) : (
      <div>
        <Dialog
          title="ネットワーク再接続中・・・"
          modal={false}
          open={gameTable.reconnectingActionCable}
        >
          <CircularProgress />
        </Dialog>
        <GameDialog tableId={tableId} />
        <GameTable
          tableName={tableName}
          tableId={tableId}
          onGameStart={onGameStart}
          players={players}
          playerSession={playerSession}
          isSeated={isSeated}
          inGame={inGame}
          gameTable={gameTable}
        />
        <div style={{ 'display': 'flex', 'flexDirection': 'row' }}>
          <div style={{ 'display': 'flex', width: '50%' }}>
            {players.map(player => {
              return playerSession.playerId === player.id ? (
                <Player
                  key={player.id}
                  player={player}
                  onAddChip={onAddChip}
                  onCheckAction={onCheckAction}
                  onBetAction={onBetAction}
                  onCallAction={onCallAction}
                  onFoldAction={onFoldAction}
                  yourTurn={gameTable.currentSeatNo === player.seat_no}
                  pot={gameTable.pot}
                  inGame={inGame}
                />
              ) : (<div key={player.id}></div>)
            })}
          </div>
          <div style={{ 'display': 'flex', width: '50%' }}>
            <Information informationItems={informationItems} tableId={tableId} />
          </div>
        </div>
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
    playerSession: state.data.playerSession,
    informationItems: state.scenes.Tables.Room.Information.informationItems,
    gameTable: Room.GameTable,
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
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const tableId = ownProps.match.params.id;

  return {
    onGameHandFinishedReceived: (data) => {
      dispatch(gameHandFinishedReceived());
    },
    onGameHandActionReceived: (data) => {
      dispatch(gameHandActionReceived(data.pot, data.players));
    },
    onPlayerActionReceived: (data) => {
      dispatch(playerActionReceived(data));
    },
    onGameStart: () => {
       dispatch(gameStartButtonClicked(tableId));
    },
    onActionCableConnected: () => {
      dispatch({ "type": "ACTION_CABLE_CONNECTED" });
    },
    onActionCableDisconnected: () => {
      dispatch({ "type": "ACTION_CABLE_DISCONNECTED" });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
