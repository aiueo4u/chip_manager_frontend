import { eventChannel, END } from 'redux-saga'
import { call, put, take, takeEvery } from 'redux-saga/effects'
import {
  tableCreate,
  submitLogin,
  tables,
  initialLogin,
  actionToGameDealer,
  startToGameDealer,
  takeSeatToGameDealer,
  addNpcPlayer,
} from './api';

function *handleRequestTableCreate(action) {
  try {
    console.log(action);
    const { json } = yield call(tableCreate, action.tableName, action.sb, action.bb, action.withCards);
    yield put({ type: 'CREATE_TABLE_FORM_ON_SUCCESS', tableId: json.table_id })
  } catch (error) {
    yield put({ type: "CREATE_TABLE_FORM_ON_FAILURE" });
  }
}

function *handleRequestLogin(action) {
  const { json, error } = yield call(submitLogin, action.nickname);
  if (json && !error) {
    localStorage.setItem('playerSession.jwt', json.jwt)
    yield put({ type: 'LOGIN_FORM_ON_SUCCESS', nickname: json.nickname, playerId: json.player_id })
  } else {
    // TODO
  }
}

function *handleRequestTables() {
  const { json, error } = yield call(tables);
  if (json && !error) {
    let tables = json.tables.map(table => {
      return {
        id: table.id,
        name: table.name,
        players: table.players.map(player => {
          return { id: player.id, nickname: player.nickname };
        }),
      }
    }) ;
    yield put({ type: 'LOADING_TABLES_DATA_ON_SUCCESS', tables: tables })
  } else {
    // TODO
  }
}

function *handleCheckAction(action) {
  let params = {
    type: "PLAYER_ACTION_CHECK",
    table_id: action.tableId,
    player_id: action.playerId,
  }
  try {
    yield call(actionToGameDealer, params)
    yield put({ type: "CHECK_ACTION_COMPLETED", tableId: action.tableId, playerId: action.playerId });
  } catch (error) {
    console.log(error);
    yield put({ type: "CHECK_ACTION_FAILED", tableId: action.tableId, playerId: action.playerId });
  }
}

function *handleMuckHandAction(action) {
  let params = {
    type: "PLAYER_ACTION_MUCK_HAND",
    table_id: action.tableId,
    player_id: action.playerId,
  }
  try {
    yield call(actionToGameDealer, params)
    yield put({ type: "MUCK_HAND_ACTION_COMPLETED", tableId: action.tableId, playerId: action.playerId });
  } catch (error) {
    console.log(error);
    yield put({ type: "MUCK_HAND_ACTION_FAILED", tableId: action.tableId, playerId: action.playerId });
  }
}

function *handleShowHandAction(action) {
  let params = {
    type: "PLAYER_ACTION_SHOW_HAND",
    table_id: action.tableId,
    player_id: action.playerId,
  }
  try {
    yield call(actionToGameDealer, params)
    yield put({ type: "SHOW_HAND_ACTION_COMPLETED", tableId: action.tableId, playerId: action.playerId });
  } catch (error) {
    console.log(error);
    yield put({ type: "SHOW_HAND_ACTION_FAILED", tableId: action.tableId, playerId: action.playerId });
  }
}

function *handleFoldAction(action) {
  let params = {
    type: "PLAYER_ACTION_FOLD",
    table_id: action.tableId,
    player_id: action.playerId,
  }
  try {
    yield call(actionToGameDealer, params)
    yield put({ type: "FOLD_ACTION_COMPLETED", tableId: action.tableId, playerId: action.playerId })
  } catch(error) {
    console.log(error)
    yield put({ type: "FOLD_ACTION_FAILED", tableId: action.tableId, playerId: action.playerId, error: error })
  }
}

function *handleCallAction(action) {
  let params = {
    type: "PLAYER_ACTION_CALL",
    table_id: action.tableId,
    player_id: action.playerId,
  }
  try {
    yield call(actionToGameDealer, params)
    yield put({ type: "CALL_ACTION_COMPLETED", tableId: action.tableId, playerId: action.playerId })
  } catch(error) {
    console.log(error)
    yield put({ type: "CALL_ACTION_FAILED", tableId: action.tableId, playerId: action.playerId, error: error })
  }
}

function *handleBetAction(action) {
  let params = {
    type: "PLAYER_ACTION_BET_CHIPS",
    table_id: action.tableId,
    player_id: action.playerId,
    amount: action.amount,
  }
  try {
    const json = yield call(actionToGameDealer, params)
    yield put({ type: "BET_ACTION_COMPLETED", tableId: action.tableId, playerId: action.playerId, amount: action.amount, pot: json.pot });
  } catch(error) {
    console.log(error)
    yield put({ type: "BET_ACTION_FAILED", tableId: action.tableId, playerId: action.playerId, error: error })
  }
}

function *handleTakePotAction(action) {
  let params = {
    type: "GAME_HAND_TAKE_POT",
    table_id: action.tableId,
    player_id: action.playerId,
  }
  try {
    const json = yield call(actionToGameDealer, params)
    yield put({ type: "TAKE_POT_ACTION_COMPLETED", tableId: action.tableId, playerId: action.playerId, pot: json.pot, playerStack: json.player_stack });
  } catch(error) {
    console.log(error)
    yield put({ type: "TAKE_POT_ACTION_FAILED", tableId: action.tableId, playerId: action.playerId, error: error })
  }
}

function *handleUndoPlayerAction(action) {
  let params = {
    type: "UNDO_PLAYER_ACTION",
    table_id: action.tableId,
    player_id: action.playerId
  }
  try {
    yield call(actionToGameDealer, params)
    yield put({ type: "UNDO_PLAYER_ACTION_COMPLETED", tableId: action.tableId });
  } catch(error) {
    console.log(error)
    yield put({ type: "UNDO_PLAYER_ACTION_FAILED", tableId: action.tableId });
  }
}

function *handlePlayerTakeSeat(action) {
  let params = {
    type: "PLAYER_ACTION_TAKE_SEAT",
    table_id: action.tableId,
    player_id: action.playerId,
    seat_no: action.seatNo,
    buy_in_amount: action.buyInAmount,
  }
  try {
    const json = yield call(takeSeatToGameDealer, params)
    yield put({ type: "PLAYER_ACTION_TAKE_SEAT_COMPLETED", tableId: action.tableId, playerId: action.playerId, amount: action.amount, pot: json.pot });
  } catch(error) {
    console.log(error)
    yield put({ type: "PLAYER_ACTION_TAKE_SEAT_FAILED", tableId: action.tableId, playerId: action.playerId, error: error })
  }
}

function *handleAddNpcPlayer(action) {
  let params = {
    type: "PLAYER_ACTION_TAKE_SEAT",
    table_id: action.tableId,
    seat_no: action.seatNo,
  }

  try {
    yield call(addNpcPlayer, params)
    yield put({ type: "ON_SUCCESS_ADD_NPC_PLAYER" })
  } catch(error) {
    yield put({ type: "ON_FAILURE_ADD_NPC_PLAYER" })
  }
}

function *handleFetchPlayer() {
  try {
    const json = yield call(initialLogin);
    yield put({ type: "FETCH_PLAYER_SUCCEEDED", imageUrl: json.image_url, nickname: json.nickname, playerId: json.player_id });
  } catch(error) {
    console.error(error)
    yield put({ type: "FETCH_PLAYER_FAILED" });
  }
}

function *handleGameStartButtonClicked(action) {
  let params = {
    table_id: action.tableId
  }
  try {
    yield call(startToGameDealer, params);
    yield put({ type: "GAME_START_COMPLETED", tableId: action.tableId });
  } catch(error) {
    console.log(error)
    yield put({ type: "GAME_START_FAILED", tableId: action.tableId });
  }
}

function sleepTimer(seconds) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        emitter(END)
      }, 1000 * seconds)

    return () => { clearInterval(iv) }
    }
  )
}

function *handleBeforePlayerActionReceived(action) {
  let object = Object.assign({}, action, { type: "PLAYER_ACTION_RECEIVED" })
  yield put(object)

  yield put({
    type: "OTHER_PLAYER_ACTION",
    actionType: action.lastAction.action_type,
    playerId: action.lastAction.player_id,
  })

  try {
    const channel = yield call(sleepTimer, 2)
    yield take(channel)
  } finally {
    yield put({
      type: "OTHER_PLAYER_ACTION",
      actionType: null,
      playerId: action.lastAction.player_id,
    })
  }
}

export default function *rootSage() {
  yield takeEvery("LOADING_TABLES_DATA", handleRequestTables);
  yield takeEvery("LOGIN_FORM_ON_SUBMIT", handleRequestLogin);
  yield takeEvery("CREATE_TABLE_FORM_ON_SUBMIT", handleRequestTableCreate);
  yield takeEvery("FETCH_PLAYER", handleFetchPlayer);
  yield takeEvery("BET_ACTION", handleBetAction);
  yield takeEvery("CALL_ACTION", handleCallAction);
  yield takeEvery("FOLD_ACTION", handleFoldAction);
  yield takeEvery("CHECK_ACTION", handleCheckAction);
  yield takeEvery("MUCK_HAND_ACTION", handleMuckHandAction);
  yield takeEvery("SHOW_HAND_ACTION", handleShowHandAction);
  yield takeEvery("GAME_START_BUTTON_CLICKED", handleGameStartButtonClicked);
  yield takeEvery("TAKE_POT_ACTION", handleTakePotAction);
  yield takeEvery("PLAYER_TAKE_SEAT", handlePlayerTakeSeat);
  yield takeEvery("UNDO_PLAYER_ACTION", handleUndoPlayerAction);
  yield takeEvery("ADD_NPC_PLAYER", handleAddNpcPlayer)
  yield takeEvery("BEFORE_PLAYER_ACTION_RECEIVED", handleBeforePlayerActionReceived)
}
