import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import './style.css';

class PlayerPanel extends Component {
  render() {
    const { isSeated, player, openBuyInDialog } = this.props;

    if (!player.id) {
      return (
        <div>
          <Avatar>空{player.seat_no}</Avatar>
          {isSeated ? (<div></div>) : (<RaisedButton label="着席" onTouchTap={openBuyInDialog} />)}
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

    let className = `${player.state}-avatar`

    return (
      <div>
        <Avatar className={className} src={player.image_url} />
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
    openBuyInDialog: () => {
      ownProps.openBuyInDialog(player.seat_no)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPanel);
