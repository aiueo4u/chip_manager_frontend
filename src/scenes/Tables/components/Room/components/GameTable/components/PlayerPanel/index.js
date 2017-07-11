import React, { Component } from 'react';
import './style.css';

class PlayerPanel extends Component {
  render() {
    const { seatNo, player, currentSeatNo, playerSession } = this.props;

    // TODO: nicknameがID代わりになっているのなんとかしたい。。
    if (!player.nickname) {
      // TODO: empty panel
      return (
        <div>
          <div>---</div>
          <div>Seat {seatNo}</div>
        </div>
      );
    }

    let myTurn = currentSeatNo === player.seat_no;
    let isMe = playerSession.nickname === player.nickname;

    return (
      <div className={myTurn ? 'my-turn' : ''}>
        <div className={isMe ? 'is-me' : ''}>{player.nickname}</div>
        <div>Seat {seatNo}</div>
        <div>Stack {player.stack}</div>
        <div>Chip {player.bet_amount_in_state}</div>
      </div>
    )
  }
}

export default PlayerPanel;
