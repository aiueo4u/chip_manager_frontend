const initialState = {
  openingPlayerMenuDialogPlayerId: null,
  isReady: false,
  pot: 0,
  reconnectingActionCable: false,
  isOpenedUndoDialog: false,
  dealtCards: [],
}

const GameTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DEALT_CARD_RECEIVED':
      let dealtCards = Object.assign({}, state.dealtCards);
      dealtCards[action.playerId] = action.cards;
      return Object.assign({}, state, {
        dealtCards: dealtCards,
      });
    case 'PLAYER_ACTION_RECEIVED':
      return Object.assign({}, state, {
        isReady: true,
        pot: action.pot,
        gameHandState: action.gameHandState,
        round: action.round,
        currentSeatNo: action.currentSeatNo,
        buttonSeatNo: action.buttonSeatNo,
        lastAggressiveSeatNo: action.lastAggressiveSeatNo,
        undoable: action.undoable,
        gameHandCount: action.gameHandCount,
        boardCards: action.boardCards,
        dealCards: action.dealCards,
        showOrMuck: action.showOrMuck,
      });
    case 'OPEN_PLAYER_MENU_DIALOG':
      return Object.assign({}, state, { openingPlayerMenuDialogPlayerId: action.playerId });
    case 'CLOSE_PLAYER_MENU_DIALOG':
      return Object.assign({}, state, { openingPlayerMenuDialogPlayerId: null });
    case 'OPEN_UNDO_DIALOG':
      return Object.assign({}, state, {
        isOpenedUndoDialog: true,
      });
    case 'CLOSE_UNDO_DIALOG':
      return Object.assign({}, state, {
        isOpenedUndoDialog: false,
      });
    case 'UNDO_PLAYER_ACTION_COMPLETED':
      return Object.assign({}, state, {
        isOpenedUndoDialog: false,
      });
    case 'UNDO_PLAYER_ACTION_FAILED':
      return Object.assign({}, state, {
        isOpenedUndoDialog: false,
      });
    case 'OPEN_BUY_IN_DIALOG':
      return Object.assign({}, state, {
        isOpenedBuyInDialog: true,
        selectingSeatNo: action.seatNo,
        buyInPlayerId: action.playerId,
      });
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
