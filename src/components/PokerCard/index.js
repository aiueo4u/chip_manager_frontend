import React, { Component } from 'react';
import './style.css';

class PokerCard extends Component {
  render() {
    const { rank, suit, invisible } = this.props;

    let suitString = suit === 's' ? 'spades' : suit === 'h' ? 'hearts' : suit === 'd' ? 'diamonds' : 'clubs';

    let rankString;
    switch(rank) {
      case 'T':
        rankString = 'rank10';
        break;
      case 'J':
        rankString = 'rank11';
        break;
      case 'Q':
        rankString = 'rank12';
        break;
      case 'K':
        rankString = 'rank13';
        break;
      case 'A':
        rankString = 'rank1';
        break;
      default:
        rankString = `rank${rank}`;
        break;
    }

    let faceOrBackClassName = invisible ? 'poker-card-back' : 'poker-card-face';

    return (
      <div>
        <div className={`poker-card ${suitString} ${rankString}`}>
          <div className={faceOrBackClassName}>
          </div>
        </div>
      </div>
    )
  }
}

export default PokerCard;
