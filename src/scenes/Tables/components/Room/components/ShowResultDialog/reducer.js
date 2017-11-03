const initialState = {
  open: false,
  players: [],
}

const ShowResultDialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_RESULT_DIALOG_CLOSE':
      return Object.assign({}, state, { open: false });
    case 'SHOW_RESULT_DIALOG_RECEIVED':
      return Object.assign({}, state, { open: true, players: action.players });
    case 'SHOW_RESULT_DIALOG_FINISHED_RECEIVED':
      return initialState;
    default:
      return state;
  }
}

export default ShowResultDialogReducer;
