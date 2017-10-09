import React from 'react';
import Paper from 'material-ui/Paper';
import './style.css';

const PlayerChipBetArea = ({ player, buttonSeatNo, seatNo, inGame }) => (
  <div className="playerChipBetArea">
    {inGame && player.seat_no === buttonSeatNo ? (
      <Paper circle={true} className="buttonPlate">D</Paper>
    ) : (<div></div>)}
    {inGame && (player.bet_amount_in_state || player.betSize) ? (
      <div className="betArea">
        {player.betSize ? (
          <div>
            {player.bet_amount_in_state || 0} -> {player.bet_amount_in_state + player.betSize}
          </div>
        ) : (
          <div>{player.bet_amount_in_state > 0 ? player.bet_amount_in_state : ''}</div>
        )}
      </div>
    ) : (<div></div>)}
  </div>
)

export default PlayerChipBetArea;
