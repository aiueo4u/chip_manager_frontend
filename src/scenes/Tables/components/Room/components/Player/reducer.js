const PlayerReducer = (state = {}, action) => {
  const player = state;
  if (player.id !== action.playerId) {
    return player;
  }
    
  switch (action.type) {
    case 'INCREMENT_BET_SIZE':
      let betSize = (player.betSize || 0) + action.amount;
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
    case 'ENTERED_ROOM':
      return action.players;
    case 'PLAYER_ACTION_RECEIVED':
      return action.players;
    case 'INCREMENT_BET_SIZE':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'ADD_CHIP':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'ADD_CHIP_COMPLETED':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'ADD_CHIP_FAILED':
      return state.map((player) => { return PlayerReducer(player, action) });
    case 'TAKE_POT_COMPLETED':
      return state;
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
