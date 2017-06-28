import React from 'react';

const InformationLine = ({ type, time, nickname, amount }) => {
  let content = '';

  switch (type) {
    case 'ENTER':
      content = `${nickname}が着席しました。`;
      break;
    case 'LEAVE':
      content = `${nickname}が退席しました。`;
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
      content = `${nickname}が${amount}をベットしました。`;
      break;
    case 'PLAYER_ACTION_TAKE_POT':
      content = `${nickname}がポットを獲得しました。`;
      break;
    default:
      break;
  }
  return (
    <div>[{time}] {content}</div>
  )
}

export default InformationLine;
