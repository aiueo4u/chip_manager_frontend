import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';

class Candidate extends Component {
  render() {
    const { player, handleTakePot } = this.props;

    return (
      <ListItem
        leftAvatar={
          <Avatar src={player.image_url} />
        }
        onTouchTap={handleTakePot}
      >
        {player.nickname}
      </ListItem>
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
