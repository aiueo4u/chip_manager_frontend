import React, { Component } from 'react';
import CardbackImage from 'assets/cardback.gif';
import './card.css';

class Card extends Component {
  render() {
    return (
      <div className="card">
        <div className="front red">
          <div className="index">10<br />&hearts;</div>
          <div className="spotA1">&hearts;</div>
          <div className="spotA2">&hearts;</div>
          <div className="spotA4">&hearts;</div>
          <div className="spotA5">&hearts;</div>
          <div className="spotB2">&hearts;</div>
          <div className="spotB4">&hearts;</div>
          <div className="spotC1">&hearts;</div>
          <div className="spotC2">&hearts;</div>
          <div className="spotC4">&hearts;</div>
          <div className="spotC5">&hearts;</div>
        </div>
      </div>
    );
  }
}

export default Card;
