import React, { Component } from 'react';
//import CardbackImage from 'assets/cardback.gif';
import './card.css';

class Card extends Component {
  render() {
    const { rank, suit, invisible } = this.props;

    let rankValue = rank === 'T' ? 10 : rank;

    let suitMarkCode;
    switch(suit) {
      case 's':
        suitMarkCode = '%u2660';
        break;
      case 'h':
        suitMarkCode = '%u2665';
        break;
      case 'd':
        suitMarkCode = '%u2666';
        break;
      case 'c':
        suitMarkCode = '%u2663';
        break;
      default:
        break;
    }

    let suitColor = suit === 's' || suit === 'c' ? 'suitBlack' : 'suitRed';
    const frontStyle = {}
    if (invisible) {
      frontStyle.visibility = 'hidden';
    }

    return (
      <div className="card">
        <div className={"front " + suitColor} style={frontStyle}>
          <div className="index">{rankValue}<br />{unescape(suitMarkCode)}</div>
          <div style={{ position: 'absolute', left: '0.65em', top: '0.2em', fontSize: '2em' }}>{rankValue}</div>
          <div style={{ position: 'absolute', left: '0.65em', top: '1.1em', fontSize: '2em' }}>{unescape(suitMarkCode)}</div>
        </div>
      </div>
    );
  }
}

export default Card;
