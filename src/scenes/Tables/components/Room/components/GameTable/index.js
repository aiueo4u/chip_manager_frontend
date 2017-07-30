import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import PlayerPanel from './components/PlayerPanel';
import PlayerChipBetArea from './components/PlayerChipBetArea';
import BuyInDialog from './components/BuyInDialog';
import './style.css';

const gameHandStateToReadable = (gameHandState) => {
  switch (gameHandState) {
    case 'preflop':
      return "プリフロップ";
    case 'flop':
      return "フロップ";
    case 'turn':
      return "ターン";
    case 'river':
      return "リバー";
    case 'finished':
      return "終了しました。";
    default:
      return gameHandState;
  }
}

class GameTable extends Component {
  render() {
    const { tableId, openBuyInDialog, gameTable, isSeated, playerSession, players, inGame, gameHandState, buttonSeatNo, onGameStart, currentSeatNo, pot = 0 } = this.props

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
                currentSeatNo={currentSeatNo}
                openBuyInDialog={openBuyInDialog}
              />
            ))}
          </div>
          <div className="flex-up-container">
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={buttonSeatNo} player={sortedPlayers[3]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={buttonSeatNo} player={sortedPlayers[4]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={buttonSeatNo} player={sortedPlayers[5]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={buttonSeatNo} player={sortedPlayers[6]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={buttonSeatNo} player={sortedPlayers[7]} />
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
                    フェーズ: {gameHandStateToReadable(gameHandState)}
                  </div>
                  <div>
                    ポット: {pot}
                  </div>
                </div>
              )
            }
          </div>
          <div className="flex-down-container">
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={buttonSeatNo} player={sortedPlayers[2]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={buttonSeatNo} player={sortedPlayers[1]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={buttonSeatNo} player={sortedPlayers[0]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={buttonSeatNo} player={sortedPlayers[9]} />
            <PlayerChipBetArea inGame={inGame} buttonSeatNo={buttonSeatNo} player={sortedPlayers[8]} />
          </div>
          <div className="flex-down-container">
            {[2,1,0,9,8].map(playerIndex => (
              <PlayerPanel
                key={playerIndex}
                isOpenedBuyInDialog={gameTable.isOpenedBuyInDialog}
                isSeated={isSeated}
                inGame={inGame}
                player={sortedPlayers[playerIndex]}
                currentSeatNo={currentSeatNo}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameTable);
