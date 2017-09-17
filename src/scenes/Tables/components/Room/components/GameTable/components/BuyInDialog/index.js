import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class BuyInDialog extends Component {
  render() {
    const {
      gameTable,
      onRequestClose,
      onSubmitTakeSeat,
    } = this.props;

    return (
      <Dialog
        title="バイイン額を設定してください。"
        modal={false}
        open={gameTable.isOpenedBuyInDialog || false}
        onRequestClose={onRequestClose}
      >
        <div>シート番号: {gameTable.selectingSeatNo}</div>
        <form name="BuyInForm" onSubmit={onSubmitTakeSeat}>
          <div>
            <TextField
              name="buyInAmount"
              hintText="10000"
              floatingLabelFixed={true}
              floatingLabelText="バイイン額"
            />
          </div>
          <div style={{ textAlign: 'right' }}>
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={onRequestClose}
            />
            <FlatButton
              type="submit"
              label="Buy-In"
              primary={true}
            />
          </div>
        </form>
      </Dialog>
    )
  }
}

const mapStateToProps = (state, ownProps) => { return {} }
const mapDispatchToProps = (dispatch, ownProps) => {
  const { tableId, playerSession, gameTable } = ownProps;

  return {
    onSubmitTakeSeat: (event) => {
      event.preventDefault();
      let seatNo = gameTable.selectingSeatNo;
      let buyInPlayerId = gameTable.buyInPlayerId;
      let buyInAmount = event.target.buyInAmount.value.trim();;
      dispatch({ type: 'PLAYER_TAKE_SEAT', tableId: tableId, playerId: buyInPlayerId, seatNo: seatNo, buyInAmount: buyInAmount })
    },
    onRequestClose: () => {
      dispatch({ type: "CLOSE_BUY_IN_DIALOG" })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyInDialog);
