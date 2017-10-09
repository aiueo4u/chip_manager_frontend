import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import PlayerPanel from './components/PlayerPanel';
import PlayerChipBetArea from './components/PlayerChipBetArea';
import BuyInDialog from './components/BuyInDialog';
import UndoDialog from './components/UndoDialog';
import './style.css';
import PokerCard from 'components/poker_card';

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

const buttonStyle = {
  'backgroundColor': '#bb4444',
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

    for (let i = 0; i < 10; i++) {
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
      };
    };

    let playerChipBetAreaProps = (index) => {
      return {
        inGame: inGame,
        buttonSeatNo: gameTable.buttonSeatNo,
        player: sortedPlayers[index],
      };
    }

    return (
      <div style={{ 'height': '100%' }}>
        <BuyInDialog
          tableId={tableId}
          gameTable={gameTable}
          playerSession={playerSession}
        />
        <UndoDialog
          tableId={tableId}
          gameTable={gameTable}
          playerSession={playerSession}
        />
        <div className="flex-container">
          <div className="game-table">
            <div className="topPlayerContainer">
              <div className="flex-column-container" style={{ width: '30vw' }}>
                <PlayerPanel {...playerPanelProps(5)} />
                <PlayerChipBetArea {...playerChipBetAreaProps(5) } />
              </div>
            </div>

            <div className="middlePlayerContainer">
              <div className="flex-column-container" style={{ 'width': '20vw', height: '100%' }}>
                <div style={{ width: '15vw', height: '15vw' }}>
                  <PlayerPanel {...playerPanelProps(4)} />
                </div>
                <div style={{ width: '15vw', height: '15vw' }}>
                  <PlayerPanel {...playerPanelProps(3)} />
                </div>
                <div style={{ width: '15vw', height: '15vw' }}>
                  <PlayerPanel {...playerPanelProps(2)} />
                </div>
                <div style={{ width: '15vw', height: '15vw' }}>
                  <PlayerPanel {...playerPanelProps(1)} />
                </div>
              </div>
              <div className="flex-column-container" style={{ 'width': '10vw' }}>
                <div style={{ width: '9vw', height: '9vw' }}>
                  <PlayerChipBetArea {...playerChipBetAreaProps(4) } />
                </div>
                <div style={{ width: '9vw', height: '9vw' }}>
                  <PlayerChipBetArea {...playerChipBetAreaProps(3) } />
                </div>
                <div style={{ width: '9vw', height: '9vw' }}>
                  <PlayerChipBetArea {...playerChipBetAreaProps(2) } />
                </div>
                <div style={{ width: '9vw', height: '9vw' }}>
                  <PlayerChipBetArea {...playerChipBetAreaProps(1) } />
                </div>
              </div>
              <div
                className="flex-center-container"
                style={{ 'width': '25vw' }}
              >
                {
                  !inGame && (players.length >= 2) && isSeated ? (
                    <div>
                      <RaisedButton
                        label="Game Start"
                        onTouchTap={onGameStart}
                      />
                      {gameTable.undoable && isSeated ? (
                        <div>
                          <RaisedButton label="Undo" primary={true} onTouchTap={openUndoDialog} buttonStyle={buttonStyle} />
                        </div>
                        ) : (<div></div>)
                      }
                    </div>
                  ) : !inGame ? (
                    <div>
                      {isSeated ? (
                        'Wait for other player...'
                      ) : (
                        'Touch any seat'
                      )}
                    </div>
                  ) : (
                    <div className="currentStateArea">
                      <div>Game {gameTable.gameHandCount}</div>
                      <div>
                        {roundToReadable(gameTable.round)}
                      </div>
                      <div>
                        {gameTable.pot}
                      </div>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        height: '5em',
                        position: 'relative',
                      }}
                      >
                        <div style={{ position: 'absolute', left: '0em' }}>
                          {gameTable.boardCards && gameTable.boardCards[0] ? (
                            <PokerCard
                              rank={gameTable.boardCards[0][0]}
                              suit={gameTable.boardCards[0][1]}
                            />
                          ) : (
                            <PokerCard invisible={true} />
                          )}
                        </div>
                        <div style={{ position: 'absolute', left: '1em' }}>
                          {gameTable.boardCards && gameTable.boardCards[1] ? (
                            <PokerCard
                              rank={gameTable.boardCards[1][0]}
                              suit={gameTable.boardCards[1][1]}
                            />
                          ) : (
                            <PokerCard invisible={true} />
                          )}
                        </div>
                        <div style={{ position: 'absolute', left: '2em' }}>
                          {gameTable.boardCards && gameTable.boardCards[2] ? (
                            <PokerCard
                              rank={gameTable.boardCards[2][0]}
                              suit={gameTable.boardCards[2][1]}
                            />
                          ) : (
                            <PokerCard invisible={true} />
                          )}
                        </div>
                        <div style={{ position: 'absolute', left: '3em' }}>
                          {gameTable.boardCards && gameTable.boardCards[3] ? (
                            <PokerCard
                              rank={gameTable.boardCards[3][0]}
                              suit={gameTable.boardCards[3][1]}
                            />
                          ) : (
                            <PokerCard invisible={true} />
                          )}
                        </div>
                        <div style={{ position: 'absolute', left: '4em' }}>
                          {gameTable.boardCards && gameTable.boardCards[4] ? (
                            <PokerCard
                              rank={gameTable.boardCards[4][0]}
                              suit={gameTable.boardCards[4][1]}
                            />
                          ) : (
                            <PokerCard invisible={true} />
                          )}
                        </div>
                      </div>
                      <div>
                        <RaisedButton label="Undo" primary={true} onTouchTap={openUndoDialog} buttonStyle={buttonStyle} />
                      </div>
                    </div>
                  )
                }
              </div>
              <div className="flex-column-container" style={{ 'width': '10vw' }}>
                <div style={{ width: '9vw', height: '9vw' }}>
                  <PlayerChipBetArea {...playerChipBetAreaProps(6) } />
                </div>
                <div style={{ width: '9vw', height: '9vw' }}>
                  <PlayerChipBetArea {...playerChipBetAreaProps(7) } />
                </div>
                <div style={{ width: '9vw', height: '9vw' }}>
                  <PlayerChipBetArea {...playerChipBetAreaProps(8) } />
                </div>
                <div style={{ width: '9vw', height: '9vw' }}>
                  <PlayerChipBetArea {...playerChipBetAreaProps(9) } />
                </div>
              </div>
              <div className="flex-column-container" style={{ 'width': '20vw', height: '100%' }}>
                <div style={{ width: '15vw', height: '15vw' }}>
                  <PlayerPanel {...playerPanelProps(6)} />
                </div>
                <div style={{ width: '15vw', height: '15vw' }}>
                  <PlayerPanel {...playerPanelProps(7)} />
                </div>
                <div style={{ width: '15vw', height: '15vw' }}>
                  <PlayerPanel {...playerPanelProps(8)} />
                </div>
                <div style={{ width: '15vw', height: '15vw' }}>
                  <PlayerPanel {...playerPanelProps(9)} />
                </div>
              </div>
            </div>
            <div className="lowPlayerContainer">
              <div className="test">
                <PlayerChipBetArea {...playerChipBetAreaProps(0) } />
                <div style={{ height: '20vw' }}>
                  <PlayerPanel {...playerPanelProps(0)} currentPlayer={currentPlayer} />
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
