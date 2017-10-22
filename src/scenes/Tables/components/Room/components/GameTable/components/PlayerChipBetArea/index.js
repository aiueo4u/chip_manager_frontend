import React from 'react';
import Paper from 'material-ui/Paper';
import './style.css';

const PlayerChipBetArea = ({ player, buttonSeatNo, seatNo, inGame, buttonDisable = false}) => (
  <div className="playerChipBetArea">
    {inGame && player.seat_no === buttonSeatNo && !buttonDisable ? (
      <Paper circle={true} className="buttonPlate">D</Paper>
    ) : (<div></div>)}
    {inGame && (player.bet_amount_in_state || player.betSize) ? (
      <div>
        {player.betSize ? (
          <span className="betArea">
            {player.bet_amount_in_state || 0} -> {player.bet_amount_in_state + player.betSize}
          </span>
        ) : (
          <span className="betArea">
            {player.bet_amount_in_state > 0 ? player.bet_amount_in_state : ''}
          </span>
        )}
      </div>
    ) : (<div></div>)}
  </div>
)

export default PlayerChipBetArea;
