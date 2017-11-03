import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import Candidate from './components/Candidate/index.js';
import List from 'material-ui/List/List';
import RaisedButton from 'material-ui/RaisedButton';

class ShowResultDialog extends Component {

  render() {
    const {
      open,
      players,
      onRequestClose,
      onGameStartAndClose,
    } = this.props;

    return (
      <div>
        <Dialog
          title="Result"
          modal={false}
          open={open}
          onRequestClose={onRequestClose}
        >
          <List>
            {players.map(player => (
              <Candidate
                key={player.id}
                player={player}
              />
            ))}
          </List>
          {/* TODO: 同期対応 */}
          {/*<RaisedButton label="Next game" onTouchTap={onGameStartAndClose} />*/}
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
    onGameStartAndClose: () => {
      ownProps.onGameStart();
      dispatch({ type: "SHOW_RESULT_DIALOG_CLOSE" })
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowResultDialog);
