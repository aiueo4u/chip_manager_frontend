import React, { Component } from 'react';
import { connect } from 'react-redux';
import { enteringRoom } from './data/actions.js';

class Room extends Component {
  componentDidMount() {
    const { onEnteredRoom } = this.props;
    onEnteredRoom();
  }

  render() {
    const { players } = this.props
    return (
      <div>
        <ul>
          {players.map(player => (
            <li key={player.playerId}>{player.nickname}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    players: state.data.tables.players,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onEnteredRoom: () => {
      let tableId = ownProps.match.params.id;
      dispatch(enteringRoom(tableId));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room);
