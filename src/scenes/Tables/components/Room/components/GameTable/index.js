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
      return "プリフロップ";
    case 'flop':
      return "フロップ";
    case 'turn':
      return "ターン";
    case 'river':
      return "リバー";
    default:
      return round;
  }
}

class GameTable extends Component {
  render() {
    const {
      undoPlayerAction,
      tableId,
      openBuyInDialog,
      gameTable,
      isSeated,
      playerSession,
      players,
      inGame,
      onGameStart
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

    return (
      <div>
        <BuyInDialog
          tableId={tableId}
          gameTable={gameTable}
          playerSession={playerSession}
        />
        <div className="flex-container">
          <div className="flex-up-container">
            {[3,4,5,6,7].map(playerIndex => (
              <PlayerPanel
                key={playerIndex}
                isOpenedBuyInDialog={gameTable.isOpenedBuyInDialog}
                isSeated={isSeated}
                inGame={inGame}
                player={sortedPlayers[playerIndex]}
                currentSeatNo={gameTable.currentSeatNo}
                openBuyInDialog={openBuyInDialog}
              />
            ))}
          </div>
          <div className="flex-up-container">
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={gameTable.buttonSeatNo} player={sortedPlayers[3]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={gameTable.buttonSeatNo} player={sortedPlayers[4]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={gameTable.buttonSeatNo} player={sortedPlayers[5]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={gameTable.buttonSeatNo} player={sortedPlayers[6]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={gameTable.buttonSeatNo} player={sortedPlayers[7]} />
          </div>
          <div className="flex-center-container">
            {
              !inGame ? (
                <div>
                  <RaisedButton label="Game Start" primary={true} onTouchTap={onGameStart} />
                </div>
              ) : (
                <div>
                  <div>
                    フェーズ: {roundToReadable(gameTable.round)}
                  </div>
                  <div>
                    ポット: {gameTable.pot}
                  </div>
                  <div>
                    <RaisedButton label="Undo" primary={true} onTouchTap={undoPlayerAction} />
                  </div>
                </div>
              )
            }
          </div>
          <div className="flex-down-container">
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={gameTable.buttonSeatNo} player={sortedPlayers[2]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={gameTable.buttonSeatNo} player={sortedPlayers[1]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={gameTable.buttonSeatNo} player={sortedPlayers[0]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={gameTable.buttonSeatNo} player={sortedPlayers[9]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={gameTable.buttonSeatNo} player={sortedPlayers[8]} />
          </div>
          <div className="flex-down-container">
            {[2,1,0,9,8].map(playerIndex => (
              <PlayerPanel
                key={playerIndex}
                isOpenedBuyInDialog={gameTable.isOpenedBuyInDialog}
                isSeated={isSeated}
                inGame={inGame}
                player={sortedPlayers[playerIndex]}
                currentSeatNo={gameTable.currentSeatNo}
                openBuyInDialog={openBuyInDialog}
              />
            ))}
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
    openBuyInDialog: (seatNo) => {
      dispatch({ type: "OPEN_BUY_IN_DIALOG", tableId: tableId, playerId: playerSession.playerId, seatNo: seatNo })
    },
    undoPlayerAction: () => {
      dispatch({ type: 'UNDO_PLAYER_ACTION', tableId: tableId });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameTable);
