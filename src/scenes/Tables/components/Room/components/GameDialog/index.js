import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import Candidate from './components/Candidate/index.js';

class GameDialog extends Component {

  render() {
    const { open, pot, players, takePotAction } = this.props;

    return (
      <div>
        <Dialog
          title="Game Dialog"
          modal={false}
          open={open}
        >
          <div>pot: {pot}</div>
          {players.map(player => (
            <Candidate
              key={player.id}
              player={player}
              takePotAction={takePotAction}
            />
          ))}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { Room } = state.scenes.Tables;

  return {
    open: Room.GameDialog.open,
    pot: Room.GameDialog.pot,
    players: Room.GameDialog.players,
  };
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const tableId = ownProps.tableId;

  return {
    takePotAction: (playerId) => {
      return { type: "TAKE_POT_ACTION", tableId: tableId, playerId: playerId };
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDialog);
