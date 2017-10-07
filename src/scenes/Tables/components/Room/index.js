import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameTable from './components/GameTable';
import PlayerActionArea from './components/PlayerActionArea';
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
// import Information from './components/Information';
import GameDialog from './components/GameDialog';
import Dialog from 'material-ui/Dialog';
import ActionCable from 'actioncable';
import { WEBSOCKET_ENDPOINT } from 'Configuration.js';

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
      // informationItems,
      onGameStart, players, tableId, tableName, onAddChip, onCallAction, onBetAction } = this.props

    let isSeated = players.find(player => player.id === playerSession.playerId) ? true : false
    const inGame = !gameStartable(gameTable.gameHandState);

    let currentPlayer = players.find(player => player.id === playerSession.playerId)

    return (!gameTable.isReady) ? (
      <div>
        <div style={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: '80%',
          height: '30%',
          position: 'fixed',
          margin: 'auto',
          textAlign: 'center',
        }}>
          <CircularProgress thickness={10} size={100} />
          <div>Initializing...</div>
        </div>
      </div>
    ) : (
      <div style={{
          'background': '#005500',
          'height': '100vh'
      }}>
        <Dialog
          title="ネットワーク再接続中・・・"
          modal={false}
          open={gameTable.reconnectingActionCable}
        >
          <CircularProgress />
        </Dialog>
        <GameDialog
          tableId={tableId}
        />
        <div
          style={{ 'height': '80vh' }}
        >
          <GameTable
            tableName={tableName}
            tableId={tableId}
            onGameStart={onGameStart}
            players={players}
            playerSession={playerSession}
            isSeated={isSeated}
            inGame={inGame}
            gameTable={gameTable}
            onBetAction={onBetAction}
          />
        </div>
        {/* プレイヤーのアクション操作エリア */}
        <div style={{ 'height': '20vh' }}>
          {currentPlayer && inGame && (gameTable.currentSeatNo === currentPlayer.seat_no) ? (
            <PlayerActionArea
              key={currentPlayer.id}
              tableId={tableId}
              player={currentPlayer}
              onAddChip={onAddChip}
              onCheckAction={onCheckAction}
              onBetAction={onBetAction}
              onCallAction={onCallAction}
              onFoldAction={onFoldAction}
              yourTurn={gameTable.currentSeatNo === currentPlayer.seat_no}
              pot={gameTable.pot}
              inGame={inGame}
            />
          ) : (
            <div></div>
          )}
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
    // informationItems: state.scenes.Tables.Room.Information.informationItems,
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
