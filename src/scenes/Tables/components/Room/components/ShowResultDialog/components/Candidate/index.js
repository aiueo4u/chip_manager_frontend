import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import './style.css';

class Candidate extends Component {
  render() {
    const { player } = this.props;

    let amount_diff_class = player.amount_diff > 0 ? 'show-result-dialog-amount-diff-plus' : 'show-result-dialog-amount-diff-minus';

    return (
      <ListItem dense>
        <Avatar src={player.image_url} />
        <ListItemText>
          <div className="show-result-dialog-user-nickname">{player.nickname}</div>
          <div>
            <span className="show-result-dialog-stack-after">{player.stack_after}</span>
            <span className={amount_diff_class}>
              ({player.amount_diff > 0 ? '+' : ''}{player.amount_diff})
            </span>
          </div>
        </ListItemText>
      </ListItem>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Candidate);
