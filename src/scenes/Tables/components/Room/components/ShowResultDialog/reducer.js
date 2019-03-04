const initialState = {
  open: false,
  players: [],
}

const ShowResultDialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_RESULT_DIALOG_CLOSE':
      return Object.assign({}, state, { open: false });
    case 'SHOW_RESULT_DIALOG_RECEIVED':
      return state
      //return Object.assign({}, state, { open: true, players: action.players });
    case 'SHOW_RESULT_DIALOG_FINISHED_RECEIVED':
      return initialState;
    case 'PLAYER_ACTION_RECEIVED':
      return Object.assign({}, state, { open: false });
    default:
      return state;
  }
}

export default ShowResultDialogReducer;
