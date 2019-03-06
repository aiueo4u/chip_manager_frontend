import React from 'react';
import Paper from '@material-ui/core/Paper';
import './style.css';

const PlayerChipBetArea = ({ player, buttonSeatNo, inGame, gameHandState, buttonDisable = false}) => (
  <div className="playerChipBetArea">
    {
      gameHandState === 'finished' && player.amount_diff && (
        <div>
          <span className={`${player.amount_diff > 0 ? 'resultChipAmountPlus' : 'resultChipAmountMinus'}`}>
            {
              player.amount_diff > 0 && <span>+</span>
            }
            {player.amount_diff}
          </span>
        </div>
      )
    }
    {
      inGame && player.seat_no === buttonSeatNo && !buttonDisable && (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Paper circle={true} className="buttonPlate">D</Paper>
        </div>
      )
    }
    {
      inGame && (player.bet_amount_in_state || player.betSize) && (
        <div>
          {
            player.betSize ? (
              <span className="betArea">
                {player.bet_amount_in_state || 0} -> {player.bet_amount_in_state + player.betSize}
              </span>
            ) : (
              <span className="betArea">
                {player.bet_amount_in_state > 0 ? player.bet_amount_in_state : ''}
              </span>
            )
          }
        </div>
      )
    }
  </div>
)

export default PlayerChipBetArea;
