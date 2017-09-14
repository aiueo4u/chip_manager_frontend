import React from 'react';
import Paper from 'material-ui/Paper';
import './style.css';

const PlayerChipBetArea = ({ player, buttonSeatNo, seatNo, inGame }) => (
  <div className="playerChipBetArea">
    {inGame && player.seat_no === buttonSeatNo ? (
      <div className="buttonPlateWrapper">
        <Paper circle={true} className="buttonPlate">B</Paper>
      </div>
    ) : (<div></div>)}
    {inGame && player.bet_amount_in_state > 0 ? (
      <div className="betArea">
        {player.bet_amount_in_state}
      </div>
    ) : (<div></div>)}
  </div>
)

export default PlayerChipBetArea;
