import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button';

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
        open={dialogOpen}
        onClose={onRequestClose}
      >
        <DialogTitle>
          {"Player " + player.nickname}
        </DialogTitle>
        <div>Stack {player.stack}</div>
        <Button variant="flat" color="primary" onClick={switchToBuyInDialog}>
          チップ量調整
        </Button>
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
