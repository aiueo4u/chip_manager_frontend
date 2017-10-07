import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import PlayerPanel from './components/PlayerPanel';
import PlayerChipBetArea from './components/PlayerChipBetArea';
import BuyInDialog from './components/BuyInDialog';
import './style.css';

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
      undoPlayerAction,
      tableId,
      openBuyInDialog,
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
        <div className="flex-container">
          <div className="game-table">

            <div className="topPlayerContainer">
              <div className="flex-column-container">
                <PlayerPanel {...playerPanelProps(5)} />
                <PlayerChipBetArea {...playerChipBetAreaProps(5) } />
              </div>
            </div>

            <div className="middlePlayerContainer">
              <div className="flex-column-container" style={{ 'width': '25vw' }}>
                <div className="flex-row-container">
                  <PlayerPanel {...playerPanelProps(4)} />
                  <PlayerChipBetArea {...playerChipBetAreaProps(4) } />
                </div>
                <div className="flex-row-container">
                  <PlayerPanel {...playerPanelProps(3)} />
                  <PlayerChipBetArea {...playerChipBetAreaProps(3) } />
                </div>
                <div className="flex-row-container">
                  <PlayerPanel {...playerPanelProps(2)} />
                  <PlayerChipBetArea {...playerChipBetAreaProps(2) } />
                </div>
                <div className="flex-row-container">
                  <PlayerPanel {...playerPanelProps(1)} />
                  <PlayerChipBetArea {...playerChipBetAreaProps(1) } />
                </div>
              </div>
              <div
                className="flex-center-container"
                style={{ 'width': '40vw' }}
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
                          <RaisedButton label="Undo" primary={true} onTouchTap={undoPlayerAction} buttonStyle={buttonStyle} />
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
                      <div>
                        {roundToReadable(gameTable.round)}
                      </div>
                      <div>
                        {gameTable.pot}
                      </div>
                      <div>
                        <RaisedButton label="Undo" primary={true} onTouchTap={undoPlayerAction} buttonStyle={buttonStyle} />
                      </div>
                    </div>
                  )
                }
              </div>
              <div className="flex-column-container" style={{ 'width': '25vw' }}>
                <div className="flex-row-container">
                  <PlayerChipBetArea {...playerChipBetAreaProps(6) } />
                  <PlayerPanel {...playerPanelProps(6)} />
                </div>
                <div className="flex-row-container">
                  <PlayerChipBetArea {...playerChipBetAreaProps(7) } />
                  <PlayerPanel {...playerPanelProps(7)} />
                </div>
                <div className="flex-row-container">
                  <PlayerChipBetArea {...playerChipBetAreaProps(8) } />
                  <PlayerPanel {...playerPanelProps(8)} />
                </div>
                <div className="flex-row-container">
                  <PlayerChipBetArea {...playerChipBetAreaProps(9) } />
                  <PlayerPanel {...playerPanelProps(9)} />
                </div>
              </div>
            </div>
            <div className="lowPlayerContainer">
              <div className="test">
                <PlayerChipBetArea {...playerChipBetAreaProps(0) } />
                <PlayerPanel {...playerPanelProps(0)} currentPlayer={currentPlayer} />
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
    openBuyInDialog: (seatNo, playerId) => {
      dispatch({ type: "OPEN_BUY_IN_DIALOG", tableId: tableId, seatNo: seatNo, playerId: playerId })
    },
    openPlayerMenuDialog: (playerId) => {
      dispatch({ type: "OPEN_PLAYER_MENU_DIALOG", tableId: tableId, playerId: playerId })
    },
    undoPlayerAction: () => {
      dispatch({ type: 'UNDO_PLAYER_ACTION', tableId: tableId, playerId: playerSession.playerId });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameTable);
