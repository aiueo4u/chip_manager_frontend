const initialState = {
  betSize: 0
}

const PlayerReducer = (state = initialState, action) => {
  const player = state;
  if (player.id !== action.playerId) {
    return player;
  }

  let betSize = 0;

  switch (action.type) {
    case 'CHANGE_BET_AMOUNT':
      return Object.assign({}, player, { betSize: action.amount });
    case 'SET_BET_SIZE':
      betSize = action.amount;
      return Object.assign({}, player, { betSize: betSize });
    case 'RESET_BET_SIZE':
      return Object.assign({}, player, { betSize: 0 });
    case 'INCREMENT_BET_SIZE':
      betSize = (player.betSize || 0) + action.amount;
      if (action.playerStack < betSize) {
        betSize = action.playerStack;
      }
      return Object.assign({}, player, { betSize: betSize });
    case 'DECREMENT_BET_SIZE':
      betSize = (player.betSize || 0) - action.amount;
      if (betSize < 0) {
        betSize = 0;
      }
      return Object.assign({}, player, { betSize: betSize });
    case 'ADD_CHIP':
      return Object.assign({}, player, { isFetching: true });
    case 'ADD_CHIP_COMPLETED':
      return Object.assign({}, player, { isFetching: false });
    case 'ADD_CHIP_FAILED':
      return Object.assign({}, player, { isFetching: false });
    case 'CHECK_ACTION':
      return Object.assign({}, player, { isFetching: true });
    case 'CHECK_ACTION_COMPLETED':
      return Object.assign({}, player, { isFetching: false });
    case 'CHECK_ACTION_FAILED':
      return Object.assign({}, player, { isFetching: false });
    case 'BET_ACTION':
      return Object.assign({}, player, { isFetching: true });
    case 'BET_ACTION_FAILED':
      return Object.assign({}, player, { isFetching: false });
    default:
      return player;
  }
}

const PlayersReducer = (state = [], action) => {
  switch (action.type) {
    case 'PLAYER_ACTION_RECEIVED':
      return action.players;
    case 'CHANGE_BET_AMOUNT':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'SET_BET_SIZE':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'RESET_BET_SIZE':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'INCREMENT_BET_SIZE':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'DECREMENT_BET_SIZE':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'ADD_CHIP':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'ADD_CHIP_COMPLETED':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'ADD_CHIP_FAILED':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'CHECK_ACTION':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'CHECK_ACTION_COMPLETED':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'CHECK_ACTION_FAILED':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'BET_ACTION':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'BET_ACTION_COMPLETED':
      return state;
    case 'BET_ACTION_FAILED':
      return state.map((player) => { return PlayerReducer(player, action) });
    default:
      return state;
  }
}

export default PlayersReducer;
