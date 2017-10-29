import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import PlayerPanel from './components/PlayerPanel';
import HeroPlayerPanel from './components/HeroPlayerPanel';
import PlayerChipBetArea from './components/PlayerChipBetArea';
import BuyInDialog from './components/BuyInDialog';
import UndoDialog from './components/UndoDialog';
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
        enabledWithCard: gameTable.dealCards,
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
        <UndoDialog
          tableId={tableId}
          gameTable={gameTable}
          playerSession={playerSession}
        />
        <div className="flex-container">
          <div className="game-table">
            <div className="topPlayerContainer">
              <div className="topPlayerPanel">
                <div style={{ height: '12vh', width: '100%' }}>
                  <div style={{ height: '15vw', width: '15vw', margin: 'auto' }}>
                    <PlayerPanel {...playerPanelProps(5)} />
                  </div>
                </div>
                <div style={{ height: '3vh', width: '15vw', margin: 'auto' }}>
                  <PlayerChipBetArea {...playerChipBetAreaProps(5) } />
                </div>
              </div>
            </div>

            <div className="middlePlayerContainer">
              <div className="flex-column-container" style={{ 'width': '20vw', height: '100%' }}>
                <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
                  <PlayerPanel {...playerPanelProps(4)} />
                </div>
                <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
                  <PlayerPanel {...playerPanelProps(3)} />
                </div>
                <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
                  <PlayerPanel {...playerPanelProps(2)} />
                </div>
                <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
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
                style={{ 'width': '25vw', 'position': 'relative' }}
              >
                {
                  !inGame && (players.length >= 2) && isSeated ? (
                    <div>
                      <RaisedButton
                        label="Start"
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
                      <BoardCardArea gameTable={gameTable} />
                      <div>
                        <RaisedButton label="Undo" primary={true} onTouchTap={openUndoDialog} buttonStyle={buttonStyle} />
                      </div>
                    </div>
                  )
                }
                <div className="heroDealerButtonArea">
                  <div className="heroDealerButtonWrapper">
                    {
                      inGame && currentPlayer.seat_no === gameTable.buttonSeatNo ? (
                        <DealerButtonPlate />
                      ) : (
                        <div />
                      )
                    }
                  </div>
                </div>
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
                <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
                  <PlayerPanel {...playerPanelProps(6)} />
                </div>
                <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
                  <PlayerPanel {...playerPanelProps(7)} />
                </div>
                <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
                  <PlayerPanel {...playerPanelProps(8)} />
                </div>
                <div style={{ width: '15vw', height: '15vw', margin: '0 auto' }}>
                  <PlayerPanel {...playerPanelProps(9)} />
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
