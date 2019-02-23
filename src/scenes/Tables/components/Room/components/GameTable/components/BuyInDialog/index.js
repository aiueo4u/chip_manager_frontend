import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class BuyInDialog extends Component {
  render() {
    const {
      gameTable,
      onRequestClose,
      onSubmitTakeSeat,
      onChangeBuyInAmount,
      buyInAmount,
    } = this.props;

    return (
      <Dialog
        open={gameTable.isOpenedBuyInDialog || false}
        onClose={onRequestClose}
      >
        <DialogTitle>シートNo. {gameTable.selectingSeatNo}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            持ち込むチップ量を入力してください。
          </DialogContentText>
          <div>
            <TextField
              placeholder="10000"
              onChange={onChangeBuyInAmount}
              value={buyInAmount}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div style={{ textAlign: 'right' }}>
            <Button onClick={onRequestClose}>
              キャンセル
            </Button>
            <Button variant="contained" color="primary" onClick={() => onSubmitTakeSeat(buyInAmount)}>
              着席
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const subState = state.scenes.Tables.Room.GameTable
  return {
    buyInAmount: subState.buyInAmount,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const { tableId, gameTable } = ownProps;

  return {
    onSubmitTakeSeat: (buyInAmount) => {
      const seatNo = gameTable.selectingSeatNo;
      const buyInPlayerId = gameTable.buyInPlayerId;
      dispatch({ type: 'PLAYER_TAKE_SEAT', tableId: tableId, playerId: buyInPlayerId, seatNo: seatNo, buyInAmount: buyInAmount })
    },
    onRequestClose: () => {
      dispatch({ type: "CLOSE_BUY_IN_DIALOG" })
    },
    onChangeBuyInAmount: (event) => {
      const amount = event.target.value
      dispatch({ type: "ON_CHANGE_BUY_IN_AMOUNT", amount })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyInDialog);
