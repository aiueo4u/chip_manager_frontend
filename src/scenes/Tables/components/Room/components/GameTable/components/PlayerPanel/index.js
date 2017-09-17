import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import PlayerMenuDialog from './playerMenuDialog';
import './style.css';

class PlayerPanel extends Component {
  render() {
    const { isSeated, player, openBuyInDialog } = this.props;

    const {
      currentPlayer,
      openPlayerMenuDialog,
      openingPlayerMenuDialogPlayerId,
    } = this.props;

    // 空席の場合
    if (!player.id) {
      // 自分が着席済みの場合
      if (isSeated) {
        return (<div></div>)
      // 自分が未着席の場合
      } else {
        let seat_label = "Seat " + player.seat_no;
        return (
          <RaisedButton label={seat_label} onTouchTap={openBuyInDialog} />
        )
      }
    }

    let className = "avatar-" + player.state;

    let panelClass;
    if (player.state === 1) {
      panelClass = 'foldedPanel';
    } else {
      panelClass = 'activePanel';
    }

    return (
      <div
        className={panelClass}
        onTouchTap={openPlayerMenuDialog}
      >
        <div style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'spaceAround', 'marginRight': '10px' }}>
          <Avatar className={className} src={player.image_url} style={{ 'boxShadow': '1px 1px 4px 2px #000000' }} />
        </div>
        <div style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'spaceAround' }}>
          <div className='nickname'>{player.nickname}</div>
          <div className='player-stack'>{player.betSize ? player.stack - player.betSize : player.stack}</div>
        </div>
        {currentPlayer && currentPlayer.betSize ? (
          <div>
            {currentPlayer.betSize}
          </div>
        ) : (<div></div>)}
        <PlayerMenuDialog
          dialogOpen={openingPlayerMenuDialogPlayerId == player.id}
          player={player}
          openBuyInDialog={openBuyInDialog}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => { return {} }
const mapDispatchToProps = (dispatch, ownProps) => {
  const { player } = ownProps;
  return {
    openBuyInDialog: () => {
      ownProps.openBuyInDialog(player.seat_no, player.id)
    },
    openPlayerMenuDialog: () => {
      ownProps.openPlayerMenuDialog(player.id)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPanel);
