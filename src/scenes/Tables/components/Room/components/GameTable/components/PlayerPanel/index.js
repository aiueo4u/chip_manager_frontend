import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import './style.css';

class PlayerPanel extends Component {
  render() {
    const { isSeated, player, openBuyInDialog } = this.props;

    const { currentPlayer } = this.props;

    if (!player.id) {
      return (
        <div>
          {isSeated ? (<div></div>) : (<RaisedButton label={`Seat ${player.seat_no}`} onTouchTap={openBuyInDialog} />)}
          <Dialog
            title="Buy-in"
            modal={false}
            open={false}
          >
            <p>aiueo</p>
          </Dialog>
        </div>
      );
    }

    let className = `avatar-${player.state}`

    let panelClass;
    if (player.state == 1) {
      panelClass = 'foldedPanel';
    } else {
      panelClass = 'activePanel';
    }

    return (
      <div className={panelClass}>
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
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => { return {} }
const mapDispatchToProps = (dispatch, ownProps) => {
  const { player } = ownProps;
  return {
    openBuyInDialog: () => {
      ownProps.openBuyInDialog(player.seat_no)
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPanel);
