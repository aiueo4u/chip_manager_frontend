import React, { Component } from 'react';
import { connect } from 'react-redux';
import GameTable from './components/GameTable';
import PlayerActionArea from './components/PlayerActionArea';
import {
  betAction,
  callAction,
  foldAction,
  checkAction,
  playerActionReceived,
  gameHandActionReceived,
  gameHandFinishedReceived,
  dealtCardsReceived,
} from './data/actions.js';
import CircularProgress from 'material-ui/CircularProgress';
import CustomCircularProgress from 'components/CustomCircularProgress';
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
      onPlayerActionReceived,
      onDealtCardsReceived,
    } = this.props;

    // action cable setup
    this.App = {}
    const jwt = localStorage.getItem('playerSession.jwt');
    this.App.cable = ActionCable.createConsumer(`${WEBSOCKET_ENDPOINT}/cable?jwt=${jwt}`);

    let tableId = match.params.id;

    // TODO: create失敗のエラーハンドリングはどうやるんだろう。。
    this.App.ChipChannel = this.App.cable.subscriptions.create({ channel: 'ChipChannel', tableId: tableId }, {
      connected() {
        console.debug("Chip Channel connected")
        onActionCableConnected();
      },
      disconnected() {
        console.debug("Chip Channel disconnected")
        onActionCableDisconnected();
      },
      received(data) {
        console.debug("Chip Channel received", data)
        if (data.type === 'player_action') {
          onPlayerActionReceived(data);
        } else if (data.type === 'game_hand') {
          onGameHandActionReceived(data);
        } else if (data.type === 'game_hand_finished') {
          onGameHandFinishedReceived(data)
        }
      },
      rejected(data) { console.debug("Chip Channel rejected", data) },
    });

    // 配られるカード専用のチャンネル
    this.App.cable_for_dealt_card = ActionCable.createConsumer(`${WEBSOCKET_ENDPOINT}/cable?jwt=${jwt}`);
    this.App.DealtCardChannel = this.App.cable_for_dealt_card.subscriptions.create(
      {
        channel: 'DealtCardChannel',
        tableId: tableId,
      }, {
        connected() {
          console.debug("DealtCardChannel connected");
        },
        disconnected() {
          console.debug("DealtCardChannel disconnected");
        },
        received(data) {
          console.debug("DealtCardChannel received: ", data);
          onDealtCardsReceived(data);
        },
        rejected(data) { console.debug("DealtCardChannel rejected", data) },
      }
    );
  }

  componentWillUnmount() {
    this.App.ChipChannel.unsubscribe();
    this.App.DealtCardChannel.unsubscribe();
  }

  render() {
    const {
      gameTable,
      playerSession,
      onFoldAction,
      onCheckAction,
      // informationItems,
      onGameStart, players, tableId, tableName, onCallAction, onBetAction } = this.props

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
          'background': '#003300',
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
          style={{ 'height': '100vh' }}
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
        <div style={{ 'height': '15vh', width: '100%', position: 'absolute', bottom: 0, zIndex: 1000 }}>
          {currentPlayer && inGame && (gameTable.currentSeatNo === currentPlayer.seat_no) ?
            currentPlayer.isFetching ? (
              <CustomCircularProgress />
            ) : (
              <PlayerActionArea
                key={currentPlayer.id}
                tableId={tableId}
                player={currentPlayer}
                onCheckAction={onCheckAction}
                onBetAction={onBetAction}
                onCallAction={onCallAction}
                onFoldAction={onFoldAction}
                yourTurn={gameTable.currentSeatNo === currentPlayer.seat_no}
                pot={gameTable.pot}
                inGame={inGame}
              />
            )
          : (
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
    onDealtCardsReceived: (data) => {
      dispatch(dealtCardsReceived(data));
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
