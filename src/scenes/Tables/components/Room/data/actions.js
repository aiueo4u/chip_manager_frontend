export const addChip = (tableId, playerId, amount) => {
  return { type: "ADD_CHIP", tableId: tableId, playerId: playerId, amount: amount };
}

export const checkAction = (tableId, playerId) => {
  return { type: "CHECK_ACTION", tableId: tableId, playerId: playerId };
}

export const foldAction = (tableId, playerId) => {
  return { type: "FOLD_ACTION", tableId: tableId, playerId: playerId };
}

export const callAction = (tableId, playerId) => {
  return { type: "CALL_ACTION", tableId: tableId, playerId: playerId };
}

export const betAction = (tableId, playerId, amount) => {
  return { type: "BET_ACTION", tableId: tableId, playerId: playerId, amount: amount };
}

export const playerActionReceived = (data) => {
  const {
    pot,
    game_hand_state, players, current_seat_no, button_seat_no,
    last_aggressive_seat_no,
    undoable,
  } = data;

  return {
    type: "PLAYER_ACTION_RECEIVED",
    pot: pot,
    gameHandState: game_hand_state,
    round: game_hand_state, // TODO,
    currentSeatNo: current_seat_no,
    players: players,
    buttonSeatNo: button_seat_no,
    lastAggressiveSeatNo: last_aggressive_seat_no,
    undoable: undoable,
  };
}

export const gameHandFinishedReceived = () => {
  return { type: "GAME_HAND_FINISHED_RECEIVED" };
}

export const gameHandActionReceived = (pot, players) => {
  return { type: "GAME_HAND_ACTION_RECEIVED", pot: pot, players: players };
}
