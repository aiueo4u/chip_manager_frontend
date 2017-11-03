import React from 'react';
import PokerCard from 'components/PokerCard';

const BoardCardArea = ({ gameTable }) => (
  <div>
    <div style={{ position: 'absolute', left: '-1rem' }}>
      {gameTable.boardCards && gameTable.boardCards[0] ? (
        <PokerCard
          rank={gameTable.boardCards[0][0]}
          suit={gameTable.boardCards[0][1]}
        />
      ) : (
        <PokerCard invisible={true} />
      )}
    </div>
    <div style={{ position: 'absolute', left: '3rem' }}>
      {gameTable.boardCards && gameTable.boardCards[1] ? (
        <PokerCard
          rank={gameTable.boardCards[1][0]}
          suit={gameTable.boardCards[1][1]}
        />
      ) : (
        <PokerCard invisible={true} />
      )}
    </div>
    <div style={{ position: 'absolute', left: '7rem' }}>
      {gameTable.boardCards && gameTable.boardCards[2] ? (
        <PokerCard
          rank={gameTable.boardCards[2][0]}
          suit={gameTable.boardCards[2][1]}
        />
      ) : (
        <PokerCard invisible={true} />
      )}
    </div>
    <div style={{ position: 'absolute', left: '1rem', bottom: '5rem' }}>
      {gameTable.boardCards && gameTable.boardCards[3] ? (
        <PokerCard
          rank={gameTable.boardCards[3][0]}
          suit={gameTable.boardCards[3][1]}
        />
      ) : (
        <PokerCard invisible={true} />
      )}
    </div>
    <div style={{ position: 'absolute', left: '5rem', bottom: '5rem' }}>
      {gameTable.boardCards && gameTable.boardCards[4] ? (
        <PokerCard
          rank={gameTable.boardCards[4][0]}
          suit={gameTable.boardCards[4][1]}
        />
      ) : (
        <PokerCard invisible={true} />
      )}
    </div>
  </div>
)

export default BoardCardArea;
