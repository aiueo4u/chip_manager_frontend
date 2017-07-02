import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';

class Candidate extends Component {
  render() {
    const { player, handleTakePot } = this.props;

    return (
      <div>
        player: {player.nickname}
        <FlatButton label="Winner" primary={true} onTouchTap={handleTakePot} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const playerId = ownProps.player.id;

  return {
    handleTakePot: () => {
      dispatch(ownProps.takePotAction(playerId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Candidate);
