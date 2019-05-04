import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button'
import {
  Typography,
} from '@material-ui/core'

import PlayerPanel from './components/PlayerPanel';
import HeroPlayerPanel from './components/HeroPlayerPanel';
import PlayerChipBetArea from './components/PlayerChipBetArea';
import BuyInDialog from './components/BuyInDialog';
import './style.css';
import DealerButtonPlate from 'components/DealerButtonPlate';
import BoardCardArea from './components/BoardCardArea';
import GameStartCountdown from './components/GameStartCountdown'


class GameTable extends Component {
  render() {
    const {
      tableId,
      openBuyInDialog,
      openUndoDialog,
      openPlayerMenuDialog,
      gameTable,
      isSeated,
      playerSession,
      players,
      inGame,
      onGameStart,
      isOpenGameStartCountdown,
      timeToStart,
    } = this.props

    // TODO: リファクタしたい。。。自分を中心に並び替えてる
    let currentPlayer = players.find(e => e.nickname === playerSession.nickname)
    let sortedPlayers = []

    /* 9 MAX */
    for (let i = 0; i < 9; i++) {
      let player = players.find(e => e.seat_no === i + 1)
      if (player) {
        sortedPlayers.push(player)
      } else {
        sortedPlayers.push({ 'seat_no': i + 1 })
      }
    }
    if (currentPlayer) {
      sortedPlayers = sortedPlayers.slice(currentPlayer.seat_no - 1, 10).concat(sortedPlayers.slice(0, currentPlayer.seat_no - 1))
    }

    let playerPanelProps = (index) => {
      let playerId = sortedPlayers[index].id;
      return {
        isOpenedBuyInDialog: gameTable.isOpenedBuyInDialog,
        openingPlayerMenuDialogPlayerId: gameTable.openingPlayerMenuDialogPlayerId,
        isSeated: isSeated,
        inGame: inGame,
        player: sortedPlayers[index],
        currentSeatNo: gameTable.currentSeatNo,
        openBuyInDialog: openBuyInDialog,
        openPlayerMenuDialog: openPlayerMenuDialog,
        tableId: tableId,
        cards: gameTable.dealtCards[playerId],
        enabledWithCard: gameTable.dealCards,
        buttonSeatNo: gameTable.buttonSeatNo,
        gameHandState: gameTable.gameHandState,
      };
    };

    let playerChipBetAreaProps = (index) => {
      return {
        inGame: inGame,
        buttonSeatNo: gameTable.buttonSeatNo,
        player: sortedPlayers[index],
        gameHandState: gameTable.gameHandState,
      };
    }

    let playerOnTurn = players.find(player => player.seat_no === gameTable.currentSeatNo)

    return (
      <div style={{ 'height': '100%' }}>
        <BuyInDialog
          tableId={tableId}
          gameTable={gameTable}
          playerSession={playerSession}
        />
        <div className="flex-container">
          <div className="game-table">
            <div className="topPlayerContainer">
              {/* 上部の左プレイヤー */}
              <div className="topPlayerArea">
                <div className="topPlayerPanel">
                  <div style={{ height: '15vw', width: '15vw', margin: 'auto' }}>
                    <PlayerPanel {...playerPanelProps(4)} topLeftSideStyle={true} />
                  </div>
                </div>
              </div>

              {/* 上部の右プレイヤー */}
              <div className="topPlayerArea">
                <div className="topPlayerPanel">
                  <div style={{ height: '15vw', width: '15vw', margin: 'auto' }}>
                    <PlayerPanel {...playerPanelProps(5)} topRightSideStyle={true} />
                  </div>
                </div>
              </div>
            </div>

            <div className="middlePlayerContainer">
              <div className="flex-column-container" style={{ 'width': '25vw', maxWidth: '200px', height: '100%' }}>
                <div style={{ height: '16vh', width: '15vw' }}>
                  <PlayerPanel {...playerPanelProps(3)} leftSideStyle={true} />
                </div>
                <div style={{ height: '16vh', width: '15vw' }}>
                  <PlayerPanel {...playerPanelProps(2)} leftSideStyle={true} />
                </div>
                <div style={{ height: '16vh', width: '15vw' }}>
                  <PlayerPanel {...playerPanelProps(1)} leftSideStyle={true} />
                </div>
              </div>
              <div
                className="flex-center-container"
                style={{ 'width': '45vw', 'position': 'relative' }}
              >
                {
                  !inGame && players.length < 2 ? (
                    <div>
                      {isSeated ? (
                        '他のプレイヤーを待っています・・・'
                      ) : (
                        'シートをタッチしてください'
                      )}
                    </div>
                  ) : (
                    <div className="currentStateArea">
                      <div style={{
                        position: 'absolute',
                        top: '0',
                        borderRadius: '0.5em',
                        height: '30%',
                        width: '100%',
                      }}>
                        { /* 次のハンド開始ボタン */
                          !inGame && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={onGameStart}
                              style={{ textTransform: 'none' }}
                            >
                              Start
                            </Button>
                          )
                        }

                        { /* 次のハンド自動開始までのカウントダウン */
                          isOpenGameStartCountdown && (
                            <GameStartCountdown count={timeToStart}/>
                          )
                        }

                        {
                          gameTable.round !== 'init' && (
                            <div style={{
                              display: 'flex',
                              'flexDirection': 'column',
                              'justifyContent': 'space-around',
                              height: '100%',
                            }}>
                              <div style={{
                                background: 'rgba(0, 0, 0, 0.7)',
                                borderRadius: '4px',
                                padding: '4px',
                                marginLeft: '32px',
                                marginRight: '32px',
                              }}>
                                <Typography style={{ color: 'white' }}>
                                  {gameTable.pot}
                                </Typography>
                              </div>
                              {
                                !gameTable.dealCards && (
                                  <div>
                                    <Button variant="contained" color="primary" onClick={openUndoDialog}>
                                      Undo
                                    </Button>
                                  </div>
                                )
                              }
                            </div>
                          )
                        }
                      </div>
                      {gameTable.round !== 'init' ? (
                        <BoardCardArea gameTable={gameTable} />
                      ) : (<div />)
                      }
                    </div>
                  )
                }
                <div className="heroDealerButtonArea">
                  <div className="heroDealerButtonWrapper">
                    {
                      inGame && currentPlayer && currentPlayer.seat_no === gameTable.buttonSeatNo ? (
                        <DealerButtonPlate />
                      ) : (
                        <div />
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="flex-column-container" style={{ 'width': '25vw', maxWidth: '200px', height: '100%' }}>
                <div style={{ height: '16vh', width: '75%', marginLeft: 'auto' }}>
                  <PlayerPanel {...playerPanelProps(6)} rightSideStyle={true} />
                </div>
                <div style={{ height: '16vh', width: '75%', marginLeft: 'auto' }}>
                  <PlayerPanel {...playerPanelProps(7)} rightSideStyle={true} />
                </div>
                <div style={{ height: '16vh', width: '75%', marginLeft: 'auto' }}>
                  <PlayerPanel {...playerPanelProps(8)} rightSideStyle={true} />
                </div>
              </div>
            </div>
            <div className="heroPlayerContainer">
              <div className="test">
                <div style={{ height: '20%' }}>
                  <PlayerChipBetArea {...playerChipBetAreaProps(0)} buttonDisable={true} />
                </div>
                <div style={{ height: '80%', width: '100%', textAlign: 'center' }}>
                  <HeroPlayerPanel
                    {...playerPanelProps(0)}
                    currentPlayer={currentPlayer}
                    tableId={tableId}
                    playerOnTurn={playerOnTurn}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const subState = state.scenes.Tables.Room.GameTable
  return {
    isOpenGameStartCountdown: subState.isOpenGameStartCountdown,
    timeToStart: subState.timeToStart,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { tableId, playerSession } = ownProps;

  return {
    openUndoDialog: () => {
      dispatch({ type: "OPEN_UNDO_DIALOG", tableId: tableId, playerId: playerSession.playerId })
    },
    openBuyInDialog: (seatNo, playerId) => {
      dispatch({ type: "OPEN_BUY_IN_DIALOG", tableId: tableId, seatNo: seatNo, playerId: playerId })
    },
    openPlayerMenuDialog: (playerId) => {
      dispatch({ type: "OPEN_PLAYER_MENU_DIALOG", tableId: tableId, playerId: playerId })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameTable);
