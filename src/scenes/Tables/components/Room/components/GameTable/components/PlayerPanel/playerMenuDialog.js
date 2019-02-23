import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'

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
        <DialogContent>
          <div>Stack {player.stack}</div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={switchToBuyInDialog}>
            チップ量調整
          </Button>
        </DialogActions>
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
