import React from 'react';

const InformationLine = ({ type, time, nickname, amount, pot, round }) => {
  let content = '';

  switch (type) {
    case 'GAME_START':
      content = `${nickname} starts the game.`;
      break;
    case 'PLAYER_ACTION_ADD_CHIPS':
      content = `${nickname} add chips.`;
      break;
    case 'PLAYER_ACTION_CHECK':
      content = `${nickname} checked.`;
      break;
    case 'PLAYER_ACTION_BET_CHIPS':
      content = `${nickname} bets ${amount}. pot: ${pot}`;
      break;
    case 'PLAYER_ACTION_CALL':
      content = `${nickname} calls ${amount}. pot: ${pot}`;
      break;
    case 'PLAYER_ACTION_FOLD':
      content = `${nickname} folded`;
      break;
    case 'GAME_HAND_TAKE_POT':
      content = `${nickname} took pot ${amount}.`;
      break;
    case 'UNDO_PLAYER_ACTION':
      content = `undo`;
      break;
    default:
      break;
  }

  return (
    <div>
      [{time}][{round}] {content}
    </div>
  )
}

export default InformationLine;
