import { call, put, takeEvery } from 'redux-saga/effects'
import {
  tableCreate,
  submitLogin,
  tables,
  enteringRoom,
  roomPlayers,
  initialLogin,
} from './api';

function *handleRequestRoomPlayers(action) {
  const { json, error } = yield call(roomPlayers, action.tableId);
  if (json && !error) {
    let players = json.map(obj => { return { playerId: obj.player_id, nickname: obj.nickname } });
    yield put({ type: 'ENTERED_ROOM', players: players })
  } else {
    // TODO
  }
}

function *handleRequestEnteringRoom(action) {
  const { json, error } = yield call(enteringRoom, action.tableId);
  if (json && !error) {
    yield put({ type: 'ENTERING_ROOM_NEXT', tableId: action.tableId })
  } else {
    // TODO
  }
}

function *handleRequestTableCreate() {
  const { json, error } = yield call(tableCreate);
  if (json && !error) {
    yield put({ type: 'CREATE_TABLE_FORM_ON_SUCCESS', tableId: json.table_id })
  } else {
    // TODO
  }
}

function *handleRequestLogin(action) {
  const { json, error } = yield call(submitLogin, action.nickname);
  if (json && !error) {
    localStorage.setItem('playerSession.jwt', json.jwt)
    yield put({ type: 'LOGIN_FORM_ON_SUCCESS', nickname: json.nickname })
  } else {
    // TODO
  }
}

function *handleRequestTables() {
  const { json, error } = yield call(tables);
  if (json && !error) {
    let tables = json.map((table, index) => { return { tableId: table.table_id, key: index } });
    yield put({ type: 'LOADING_TABLES_DATA_ON_SUCCESS', tables: tables })
  } else {
    // TODO
  }
}

function *handleInitialLogin() {
  const { json, error } = yield call(initialLogin);

  if (json && !error) {
    let nickname = undefined;
    if (json.isLoggedIn) {
      nickname = json.nickname;
    }
    yield put({ type: "INITIAL_LOGIN_COMPLETED", nickname: nickname, isLoggedIn: json.isLoggedIn });
  } else {
    // TODO
  }
}

export default function *rootSage() {
  yield takeEvery("LOADING_TABLES_DATA", handleRequestTables);
  yield takeEvery("LOGIN_FORM_ON_SUBMIT", handleRequestLogin);
  yield takeEvery("CREATE_TABLE_FORM_ON_SUBMIT", handleRequestTableCreate);
  yield takeEvery("ENTERING_ROOM", handleRequestEnteringRoom);
  yield takeEvery("ENTERING_ROOM_NEXT", handleRequestRoomPlayers);
  yield takeEvery("INITIAL_LOGIN", handleInitialLogin);
}
