import React from 'react';

const InformationLine = ({ type, time, nickname, amount, pot }) => {
  let content = '';

  switch (type) {
    case 'ENTER':
      content = `${nickname}が入室しました。`;
      break;
    case 'LEAVE':
      content = `${nickname}が退室しました。`;
      break;
    case 'GAME_START':
      content = `${nickname}がゲームを開始させました。`;
      break;
    case 'PLAYER_ACTION_ADD_CHIPS':
      content = `${nickname}がチップを追加しました。`;
      break;
    case 'PLAYER_ACTION_CHECK':
      content = `${nickname}はチェックしました。`;
      break;
    case 'PLAYER_ACTION_BET_CHIPS':
      content = `${nickname}が${amount}をベットしました。ポット: ${pot}`;
      break;
    case 'PLAYER_ACTION_CALL':
      content = `${nickname}が${amount}をコールしました。ポット: ${pot}`;
      break;
    case 'PLAYER_ACTION_FOLD':
      content = `${nickname}がフォールドしました。`;
      break;
    case 'GAME_HAND_TAKE_POT':
      content = `${nickname}がポット${amount}を獲得しました。`;
      break;
    default:
      break;
  }
  return (
    <div>[{time}] {content}</div>
  )
}

export default InformationLine;
