import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button'

import PlayerPanel from './components/PlayerPanel';
import HeroPlayerPanel from './components/HeroPlayerPanel';
import PlayerChipBetArea from './components/PlayerChipBetArea';
import BuyInDialog from './components/BuyInDialog';
import './style.css';
import DealerButtonPlate from 'components/DealerButtonPlate';
import BoardCardArea from './components/BoardCardArea';

const roundToReadable = (round) => {
  switch (round) {
    case 'preflop':
      return "Preflop";
    case 'flop':
      return "Flop";
    case 'turn':
      return "Turn";
    case 'river':
      return "River";
    default:
      return round;
  }
}

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
      };
    };

    let playerChipBetAreaProps = (index) => {
      return {
        inGame: inGame,
        buttonSeatNo: gameTable.buttonSeatNo,
        player: sortedPlayers[index],
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
              <div className="flex-column-container" style={{ 'width': '20vw', height: '100%' }}>
                <div style={{ height: '16vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                  <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
                    <PlayerPanel {...playerPanelProps(3)} leftSideStyle={true} />
                  </div>
                </div>
                <div style={{ height: '16vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                  <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
                    <PlayerPanel {...playerPanelProps(2)} leftSideStyle={true} />
                  </div>
                </div>
                <div style={{ height: '16vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                  <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
                    <PlayerPanel {...playerPanelProps(1)} leftSideStyle={true} />
                  </div>
                </div>
              </div>
              <div className="flex-column-container" style={{ 'width': '10vw' }}>
              </div>
              <div
                className="flex-center-container"
                style={{ 'width': '25vw', 'position': 'relative' }}
              >
                {
                  !inGame && players.length < 2 ? (
                    <div>
                      {isSeated ? (
                        'Wait for other player...'
                      ) : (
                        'Touch any seat'
                      )}
                    </div>
                  ) : (
                    <div className="currentStateArea">
                      <div style={{
                        position: 'absolute',
                        top: '0',
                        borderRadius: '0.5em',
                        //background: 'rgba(200, 200, 200, 0.3)',
                        height: '30%',
                        width: '100%',
                      }}>
                        {!inGame ? (
                            <Button
                              variant="raised"
                              onClick={onGameStart}
                            >
                              Start
                            </Button>
                          ) : (<div />)
                        }
                        {gameTable.round !== 'init' ? (
                          <div style={{
                            display: 'flex',
                            'flexDirection': 'column',
                            'justifyContent': 'space-around',
                            height: '100%',
                          }}>
                            <div>Game {gameTable.gameHandCount}</div>
                            <div>
                              {roundToReadable(gameTable.round)}
                            </div>
                            <div style={{
                              fontSize: '1.4rem',
                              'fontWeight': 'bold',
                              color: 'white',
                              background: 'rgba(0, 0, 0, 0.7)',
                              borderRadius: '0.5rem',
                              padding: '0.5rem',
                            }}>
                              {gameTable.pot}
                            </div>
                            {
                              !gameTable.dealCards && (
                                <div>
                                  <Button variant="raised" color="primary" onClick={openUndoDialog}>
                                    Undo
                                  </Button>
                                </div>
                              )
                            }
                          </div>
                        ) : (<div />)
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
              <div className="flex-column-container" style={{ 'width': '10vw' }}>
              </div>
              <div className="flex-column-container" style={{ 'width': '20vw', height: '100%' }}>
                <div style={{ height: '16vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                  <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
                    <PlayerPanel {...playerPanelProps(6)} rightSideStyle={true} />
                  </div>
                </div>
                <div style={{ height: '16vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                  <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
                    <PlayerPanel {...playerPanelProps(7)} rightSideStyle={true} />
                  </div>
                </div>
                <div style={{ height: '16vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                  <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
                    <PlayerPanel {...playerPanelProps(8)} rightSideStyle={true} />
                  </div>
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

const mapStateToProps = (state, ownProps) => { return {} }
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
