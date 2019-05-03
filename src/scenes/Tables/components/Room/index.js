import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChipAmountControlContainer from './components/ChipAmountControlContainer';
import './style.css'
import {
  betAction,
  playerActionReceived,
  gameHandActionReceived,
  gameHandFinishedReceived,
  dealtCardsReceived,
  showResultDialogReceived,
} from './data/actions.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import CustomCircularProgress from 'components/CustomCircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import ActionCable from 'actioncable';
import { WEBSOCKET_ENDPOINT } from 'Configuration.js';

import GameTable from './components/GameTable';
import Loading from './components/Loading'
import ShowResultDialog from './components/ShowResultDialog';
import TopInfobar from './components/TopInfobar'

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
      onShowResultDialogReceived,
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
        } else if (data.type === 'show_result_dialog') {
          onShowResultDialogReceived(data)
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

    // iOS Safariのボトムバー対応
    window.addEventListener('resize', () => {
      let vh = window.innerHeight * 0.01;
      window.document.documentElement.style.setProperty('--vh', `${vh}px`);
    })
    let vh = window.innerHeight * 0.01;
    window.document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  componentWillUnmount() {
    this.App.ChipChannel.unsubscribe();
    this.App.DealtCardChannel.unsubscribe();
  }

  render() {
    const {
      gameTable,
      playerSession,
      // informationItems,
      onGameStart, players, tableId, tableName, onBetAction } = this.props

    let isSeated = players.find(player => player.id === playerSession.playerId) ? true : false
    const inGame = !gameStartable(gameTable.gameHandState);

    let currentPlayer = players.find(player => player.id === playerSession.playerId)

    let playerOnTurn = players.find(player => player.seat_no === gameTable.currentSeatNo)

    /* ゲームデータのローディング */
    if (!gameTable.isReady) {
      return <Loading />
    }

    return (
      <div id="baseWrapper" style={{
          'background': '#003300',
      }}>
        {/* ネットワーク接続中のダイアログ */}
        <Dialog
          open={gameTable.reconnectingActionCable}
        >
          <DialogTitle>
            Network connecting...
          </DialogTitle>
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        </Dialog>

        <ShowResultDialog tableId={tableId} onGameStart={onGameStart} gameTable={gameTable} />

        { /* 画面右上部の情報バー */
          (inGame || players.length > 1) && gameTable.round !== 'init' && (
            <TopInfobar
              handCount={gameTable.gameHandCount}
              round={gameTable.round}
            />
          )
        }

        <div style={{ 'height': '100%' }}>
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

        {/* チップ量調整エリア */}
        <div style={{ 'height': '15vh', width: '100%', position: 'absolute', bottom: 0,
            zIndex: 1000 }}>
          {
            /* TODO: ほかプレイヤー操作 */
            currentPlayer && inGame && !gameTable.showOrMuck && (gameTable.currentSeatNo === currentPlayer.seat_no) ?
            /*currentPlayer && inGame && !gameTable.showOrMuck ?*/

            currentPlayer.isFetching ? (
              <CustomCircularProgress />
            ) : currentPlayer.isHiddenPanel ? (
              <div />
            ) : (
              <ChipAmountControlContainer
                key={currentPlayer.id}
                playerOnTurn={playerOnTurn}
                operatingPlayer={currentPlayer}
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
    gameTable: Room.GameTable,
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
    onShowResultDialogReceived: (data) => {
      dispatch(showResultDialogReceived(data))
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
