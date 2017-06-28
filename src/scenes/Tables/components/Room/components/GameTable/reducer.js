const initialState = {
  isReady: false,
  pot: 0,
}

const GameTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ENTERING_ROOM_NEXT':
      return Object.assign({}, state, { pot: action.pot, gameHandState: action.gameHandState, currentSeatNo: action.currentSeatNo, isReady: true });
    case 'PLAYER_ACTION_RECEIVED':
      return Object.assign({}, state, { pot: action.pot, gameHandState: action.gameHandState, currentSeatNo: action.currentSeatNo });
    default:
      return state;
  }
}

export default GameTableReducer;
