import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';

class PlayerPanel extends Component {
  render() {
    const { isSeated, player, inGame, currentSeatNo, onTakeSeat } = this.props;

    if (!player.id) {
      return (
        <div>
          <Avatar>空{player.seat_no}</Avatar>
          {isSeated ? (<div></div>) : (<RaisedButton label="着席" onTouchTap={onTakeSeat} />)}
        </div>
      );
    }

    let myTurn = currentSeatNo === player.seat_no;

    let className = `${player.state}-avatar`

    return (
      <div>
        <Avatar className={className} src="https://pbs.twimg.com/profile_images/802939485017079808/NdbKiaEp_400x400.jpg" />
        <div className='nickname'>{player.nickname}</div>
        <div className='player-stack'>{player.stack}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => { return {} }
const mapDispatchToProps = (dispatch, ownProps) => {
  const { player } = ownProps;
  return {
    onTakeSeat: () => {
      ownProps.onTakeSeat(player.seat_no)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPanel);
