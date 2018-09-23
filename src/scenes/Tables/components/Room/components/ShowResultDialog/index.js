import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';

import Candidate from './components/Candidate/index.js';

class ShowResultDialog extends Component {

  render() {
    const {
      open,
      players,
      onRequestClose,
      gameTable,
    } = this.props;

    return (
      <div>
        <Dialog
          open={open}
          onClose={onRequestClose}
        >
          <DialogTitle>
            ハンド{gameTable.gameHandCount}の結果
          </DialogTitle>
          <List>
            {players.map(player => (
              <Candidate
                key={player.id}
                player={player}
              />
            ))}
          </List>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { Room } = state.scenes.Tables;

  return {
    open: Room.ShowResultDialog.open,
    players: Room.ShowResultDialog.players,
  };
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRequestClose: () => {
      dispatch({ type: "SHOW_RESULT_DIALOG_CLOSE" })
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowResultDialog);
