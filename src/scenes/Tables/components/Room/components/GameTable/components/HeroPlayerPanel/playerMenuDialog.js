import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class PlayerMenuDialog extends Component {
  render() {
    const {
      player,
      dialogOpen,
      onRequestClose,
      switchToBuyInDialog,
    } = this.props;

    return (
      <Dialog
        title={"Player " + player.nickname}
        modal={false}
        open={dialogOpen}
        onRequestClose={onRequestClose}
      >
        <div>Stack {player.stack}</div>
        <FlatButton label="Adjust chips" onTouchTap={switchToBuyInDialog} primary={true} />
      </Dialog>
    );
  }
}

const mapStateToProps = (state, ownProps) => { return {} }
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRequestClose: () => {
      dispatch({ type: "CLOSE_PLAYER_MENU_DIALOG" })
    },
    switchToBuyInDialog: () => {
      dispatch({ type: "CLOSE_PLAYER_MENU_DIALOG" })
      ownProps.openBuyInDialog();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerMenuDialog);
