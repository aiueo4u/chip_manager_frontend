import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class UndoDialog extends Component {
  render() {
    const {
      gameTable,
      onRequestClose,
      undoPlayerAction
    } = this.props;

    return (
      <Dialog
        title="Undo?"
        modal={false}
        open={gameTable.isOpenedUndoDialog || false}
        onRequestClose={onRequestClose}
      >
        <form name="UndoForm" onSubmit={undoPlayerAction}>
          <div style={{ textAlign: 'right' }}>
            <FlatButton
              label="Cancel"
              primary={true}
              onTouchTap={onRequestClose}
            />
            <FlatButton
              type="submit"
              label="Undo!"
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
  const { tableId, playerSession } = ownProps;

  return {
    onRequestClose: () => {
      dispatch({ type: "CLOSE_UNDO_DIALOG" })
    },
    undoPlayerAction: (event) => {
      event.preventDefault();
      dispatch({ type: 'UNDO_PLAYER_ACTION', tableId: tableId, playerId: playerSession.playerId });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UndoDialog);
