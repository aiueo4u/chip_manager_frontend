const initialState = {
  open: false,
  pot: 0,
  players: [],
}

const GameDialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GAME_DIALOG_CLOSE':
      return Object.assign({}, state, { open: false });
    case 'GAME_HAND_ACTION_RECEIVED':
      return Object.assign({}, state, { open: true, pot: action.pot, players: action.players });
    case 'GAME_HAND_FINISHED_RECEIVED':
      return initialState;
    default:
      return state;
  }
}

export default GameDialogReducer;
