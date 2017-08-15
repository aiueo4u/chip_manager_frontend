const initialState = {
  isReady: false,
  pot: 0,
  reconnectingActionCable: false,
}

const GameTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYER_ACTION_RECEIVED':
      return Object.assign({}, state, {
        isReady: true,
        pot: action.pot,
        gameHandState: action.gameHandState,
        round: action.round,
        currentSeatNo: action.currentSeatNo,
        buttonSeatNo: action.buttonSeatNo,
        lastAggressiveSeatNo: action.lastAggressiveSeatNo
      });
    case 'OPEN_BUY_IN_DIALOG':
      return Object.assign({}, state, { isOpenedBuyInDialog: true, selectingSeatNo: action.seatNo });
    case 'CLOSE_BUY_IN_DIALOG':
      return Object.assign({}, state, { isOpenedBuyInDialog: false, selectingSeatNo: null });
    case 'PLAYER_ACTION_TAKE_SEAT_COMPLETED':
      return Object.assign({}, state, { isOpenedBuyInDialog: false, selectingSeatNo: null });
    case 'PLAYER_ACTION_TAKE_SEAT_FAILED':
      return Object.assign({}, state, { isOpenedBuyInDialog: false, selectingSeatNo: null });
    case 'ACTION_CABLE_CONNECTED':
      return Object.assign({}, state, { reconnectingActionCable: false });
    case 'ACTION_CABLE_DISCONNECTED':
      return Object.assign({}, state, { reconnectingActionCable: true });
    default:
      return state;
  }
}

export default GameTableReducer;
