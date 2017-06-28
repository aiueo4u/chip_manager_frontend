import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

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

const GameTable = ({ gameHandState, onGameStart, tableName, tableId, pot = 0 }) => (
  <div>
    <div>
      Pot: {pot}
    </div>
    <div>
      gameHandState: {gameHandStateToReadable(gameHandState)}
    </div>
    <div>
    <RaisedButton label="Game Start" primary={true} onTouchTap={onGameStart} />
    </div>
  </div>
)

export default GameTable;
