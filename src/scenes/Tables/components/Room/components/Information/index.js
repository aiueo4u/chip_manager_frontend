import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionCable from 'actioncable';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import InformationLine from './components/InformationLine';
import { WEBSOCKET_ENDPOINT } from './../../../../../../Configuration.js'; // TODO: 何とか良い感じに参照したい。。

// Action Creators
export const informationPlayerAction = (data) => {
  const { nickname, time, player_action_type, amount, pot, round } = data;
  return { type: 'ROOM_INFORMATION_PLAYER_ACTION', time: time, round: round, nickname: nickname, playerActionType: player_action_type, amount: amount, pot: pot };
}

const clearInformationItems = () => {
  return { type: 'ROOM_INFORMATION_CLEAR' }
}

class Information extends Component {
  componentDidMount() {
    const { onInformationReceived, tableId } = this.props;

    this.App = {}
    const jwt = localStorage.getItem('playerSession.jwt');
    // TODO: 冗長？
    this.App.cable = ActionCable.createConsumer(`${WEBSOCKET_ENDPOINT}/cable?jwt=${jwt}`);

    this.App.ChipChannel = this.App.cable.subscriptions.create({ channel: 'InformationChannel', tableId: tableId }, {
      connected() { console.log("Information Channel connected") },
      disconnected() { console.log("Information Channel disconnected") },
      received(data) {
        console.log("Information Channel received", data)
        onInformationReceived(data);
      },
      rejected(data) { console.log("Information Channel rejected", data) },
    });
  }

  componentWillUnmount() {
    this.props.onWillUnmount();
    this.App.ChipChannel.unsubscribe();
  }

  render() {
    const { informationItems } = this.props;

    return (
      <div>
        <Table>
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Information</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {informationItems.map((item, i) => (
              <TableRow key={i}>
                <TableRowColumn>
                  <InformationLine {...item} />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => { return {} }
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInformationReceived: (data) => {
      switch (data.info_type) {
        case 'player_action':
          dispatch(informationPlayerAction(data));
          break;
        default:
          break;
      }
    },
    onWillUnmount: () => {
      dispatch(clearInformationItems());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Information);
