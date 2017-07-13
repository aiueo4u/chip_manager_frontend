import React from 'react';
import Paper from 'material-ui/Paper';

const PlayerChipBetArea = ({ player, buttonSeatNo, seatNo, inGame }) => (
  <div>
    {inGame && player.seat_no === buttonSeatNo ? (<Paper circle={true}>B</Paper>) : (<div></div>)}
    {inGame && player.bet_amount_in_state > 0 ? (<Paper circle={true}>{player.bet_amount_in_state}</Paper>) : (<div></div>)}
  </div>
)

export default PlayerChipBetArea;
