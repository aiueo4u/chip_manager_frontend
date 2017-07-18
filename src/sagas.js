import { call, put, takeEvery } from 'redux-saga/effects'
import {
  tableCreate,
  submitLogin,
  tables,
  initialLogin,
  actionToGameDealer,
} from './api';

function *handleRequestTableCreate(action) {
  try {
    const { json, error } = yield call(tableCreate, action.tableName, action.sb, action.bb);
    yield put({ type: 'CREATE_TABLE_FORM_ON_SUCCESS', tableId: json.table_id })
  } catch (error) {
    console.log(error);
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

function *handlePlayerTakeSeat(action) {
  let params = {
    type: "PLAYER_ACTION_TAKE_SEAT",
    table_id: action.tableId,
    player_id: action.playerId,
    seat_no: action.seatNo
  }
  try {
    const json = yield call(actionToGameDealer, params)
    yield put({ type: "PLAYER_ACTION_TAKE_SEAT_COMPLETED", tableId: action.tableId, playerId: action.playerId, amount: action.amount, pot: json.pot });
  } catch(error) {
    console.log(error)
    yield put({ type: "PLAYER_ACTION_TAKE_SEAT_FAILED", tableId: action.tableId, playerId: action.playerId, error: error })
  }
}

function *handleAddChip(action) {
  let params = {
    type: "PLAYER_ACTION_ADD_CHIPS",
    table_id: action.tableId,
    player_id: action.playerId,
    amount: action.amount,
  }
  try {
    const json = yield call(actionToGameDealer, params)
    yield put({ type: "ADD_CHIP_COMPLETED", tableId: action.tableId, playerId: action.playerId, amount: action.amount, pot: json.pot });
  } catch(error) {
    console.log(error)
    yield put({ type: "ADD_CHIP_FAILED", tableId: action.tableId, playerId: action.playerId, error: error })
  }
}

function *handleInitialLogin() {
  const { json, error } = yield call(initialLogin);

  if (json && !error) {
    yield put({ type: "INITIAL_LOGIN_COMPLETED", nickname: json.nickname, isLoggedIn: json.isLoggedIn, playerId: json.playerId });
  } else {
    // TODO
  }
}

function *handleGameStartButtonClicked(action) {
  let params = {
    type: "GAME_START",
    table_id: action.tableId
  }
  try {
    yield call(actionToGameDealer, params);
    yield put({ type: "GAME_START_COMPLETED", tableId: action.tableId });
  } catch(error) {
    console.log(error)
    yield put({ type: "GAME_START_FAILED", tableId: action.tableId });
  }
}

export default function *rootSage() {
  yield takeEvery("LOADING_TABLES_DATA", handleRequestTables);
  yield takeEvery("LOGIN_FORM_ON_SUBMIT", handleRequestLogin);
  yield takeEvery("CREATE_TABLE_FORM_ON_SUBMIT", handleRequestTableCreate);
  yield takeEvery("INITIAL_LOGIN", handleInitialLogin);
  yield takeEvery("ADD_CHIP", handleAddChip);
  yield takeEvery("BET_ACTION", handleBetAction);
  yield takeEvery("CALL_ACTION", handleCallAction);
  yield takeEvery("FOLD_ACTION", handleFoldAction);
  yield takeEvery("CHECK_ACTION", handleCheckAction);
  yield takeEvery("GAME_START_BUTTON_CLICKED", handleGameStartButtonClicked);
  yield takeEvery("TAKE_POT_ACTION", handleTakePotAction);
  yield takeEvery("PLAYER_TAKE_SEAT", handlePlayerTakeSeat);
}
