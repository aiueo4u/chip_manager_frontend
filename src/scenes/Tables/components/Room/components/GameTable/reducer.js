const initialState = {
  isReady: false,
  pot: 0,
}

const GameTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYER_ACTION_RECEIVED':
      return Object.assign({}, state, { isReady: true, pot: action.pot, gameHandState: action.gameHandState, currentSeatNo: action.currentSeatNo, buttonSeatNo: action.buttonSeatNo, lastAggressiveSeatNo: action.lastAggressiveSeatNo });
    default:
      return state;
  }
}

export default GameTableReducer;
