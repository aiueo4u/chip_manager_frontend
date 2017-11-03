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

export const dealtCardsReceived = (data) => {
  const { cards, player_id } = data;
  return {
    type: "DEALT_CARD_RECEIVED",
    cards: cards,
    playerId: player_id,
  }
}

export const playerActionReceived = (data) => {
  const {
    pot,
    game_hand_state,
    players,
    current_seat_no,
    button_seat_no,
    last_aggressive_seat_no,
    undoable,
    game_hand_count,
    board_cards,
    deal_cards,
    show_or_muck,
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
    gameHandCount: game_hand_count,
    boardCards: board_cards,
    dealCards: deal_cards,
    showOrMuck: show_or_muck,
  };
}

export const gameHandFinishedReceived = () => {
  return { type: "GAME_HAND_FINISHED_RECEIVED" };
}

export const gameHandActionReceived = (pot, players) => {
  return { type: "GAME_HAND_ACTION_RECEIVED", pot: pot, players: players };
}

export const showResultDialogReceived = (data) => {
  return { type: "SHOW_RESULT_DIALOG_RECEIVED", players: data.players }
}
