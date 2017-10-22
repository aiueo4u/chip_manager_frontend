import React, { Component } from 'react';
import PokerCard from 'components/poker_card';

const BoardCardArea = ({ gameTable }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    height: '5em',
    position: 'relative',
  }}>
    <div style={{ position: 'absolute', left: '0px' }}>
      {gameTable.boardCards && gameTable.boardCards[0] ? (
        <PokerCard
          rank={gameTable.boardCards[0][0]}
          suit={gameTable.boardCards[0][1]}
        />
      ) : (
        <PokerCard invisible={true} />
      )}
    </div>
    <div style={{ position: 'absolute', left: '20px' }}>
      {gameTable.boardCards && gameTable.boardCards[1] ? (
        <PokerCard
          rank={gameTable.boardCards[1][0]}
          suit={gameTable.boardCards[1][1]}
        />
      ) : (
        <PokerCard invisible={true} />
      )}
    </div>
    <div style={{ position: 'absolute', left: '40px' }}>
      {gameTable.boardCards && gameTable.boardCards[2] ? (
        <PokerCard
          rank={gameTable.boardCards[2][0]}
          suit={gameTable.boardCards[2][1]}
        />
      ) : (
        <PokerCard invisible={true} />
      )}
    </div>
    <div style={{ position: 'absolute', left: '60px' }}>
      {gameTable.boardCards && gameTable.boardCards[3] ? (
        <PokerCard
          rank={gameTable.boardCards[3][0]}
          suit={gameTable.boardCards[3][1]}
        />
      ) : (
        <PokerCard invisible={true} />
      )}
    </div>
    <div style={{ position: 'absolute', left: '80px' }}>
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
