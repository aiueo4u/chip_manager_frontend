import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PlayerPanel from './components/PlayerPanel';
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
    const { playerSession, players, gameHandState, onGameStart, currentSeatNo, tableName, tableId, pot = 0 } = this.props

    // TODO: リファクタしたい。。。自分を中心に並び替えてる
    let currentPlayer = players.find(e => e.nickname == playerSession.nickname)
    let sortedPlayers = []
    for (let i = 0; i < 10; i++) {
      let player = players.find(e => e.seat_no == i + 1)
      if (player) {
        sortedPlayers.push(player)
      } else {
        sortedPlayers.push({ 'seat_no': i + 1 })
      }
    }
    sortedPlayers = sortedPlayers.slice(currentPlayer.seat_no - 1, 10).concat(sortedPlayers.slice(0, currentPlayer.seat_no - 1))

    return (
      <div>
        <div className="flex-container">
          <div className="flex-up-container">
            <PlayerPanel seatNo={sortedPlayers[3].seat_no} player={sortedPlayers[3]} currentSeatNo={currentSeatNo} playerSession={playerSession} />
            <PlayerPanel seatNo={sortedPlayers[4].seat_no} player={sortedPlayers[4]} currentSeatNo={currentSeatNo} playerSession={playerSession} />
            <PlayerPanel seatNo={sortedPlayers[5].seat_no} player={sortedPlayers[5]} currentSeatNo={currentSeatNo} playerSession={playerSession} />
            <PlayerPanel seatNo={sortedPlayers[6].seat_no} player={sortedPlayers[6]} currentSeatNo={currentSeatNo} playerSession={playerSession} />
            <PlayerPanel seatNo={sortedPlayers[7].seat_no} player={sortedPlayers[7]} currentSeatNo={currentSeatNo} playerSession={playerSession} />
          </div>
          <div>
            <div>Pot: {pot} {gameHandStateToReadable(gameHandState)}</div>
          </div>
          <div className="flex-down-container">
            <PlayerPanel seatNo={sortedPlayers[8].seat_no} player={sortedPlayers[8]} currentSeatNo={currentSeatNo} playerSession={playerSession} />
            <PlayerPanel seatNo={sortedPlayers[9].seat_no} player={sortedPlayers[9]} currentSeatNo={currentSeatNo} playerSession={playerSession} />
            <PlayerPanel seatNo={sortedPlayers[0].seat_no} player={sortedPlayers[0]} currentSeatNo={currentSeatNo} playerSession={playerSession} />
            <PlayerPanel seatNo={sortedPlayers[1].seat_no} player={sortedPlayers[1]} currentSeatNo={currentSeatNo} playerSession={playerSession} />
            <PlayerPanel seatNo={sortedPlayers[2].seat_no} player={sortedPlayers[2]} currentSeatNo={currentSeatNo} playerSession={playerSession} />
          </div>
        </div>
        <div>
          <RaisedButton label="Game Start" primary={true} onTouchTap={onGameStart} />
        </div>
      </div>
    )
  }
}

export default GameTable;
