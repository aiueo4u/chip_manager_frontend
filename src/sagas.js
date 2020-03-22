import { camelizeKeys } from 'humps'
import { eventChannel, END } from 'redux-saga'
import { all, cancelled, call, race, put, take, takeEvery } from 'redux-saga/effects'

import {
  tableCreate,
  submitLogin,
  fetchCurrentUser,
  fetchTables,
  actionToGameDealer,
  startToGameDealer,
  takeSeatToGameDealer,
  addNpcPlayer,
} from './api';

import { parseQueryString } from 'utils/url'

function *handleRequestTableCreate(action) {
  const { tableName, sb, bb } = action

  try {
    const response = yield call(tableCreate, tableName, sb, bb)
    const { tableId }  = camelizeKeys(response.data)
    yield put({ type: 'CREATE_TABLE_FORM_ON_SUCCESS', tableId })
  } catch (error) {
    yield put({ type: "CREATE_TABLE_FORM_ON_FAILURE" });
  }
}

function *handleRequestLogin(action) {
  const { nickname } = action

  const response = yield call(submitLogin, nickname)
  const data = camelizeKeys(response.data)

  localStorage.setItem('playerSession.jwt', data.jwt) // TODO
  yield put({ type: 'LOGIN_FORM_ON_SUCCESS', nickname: data.nickname, playerId: data.playerId })
}

function *handleRequestTables() {
  const response = yield call(fetchTables)
  const data = response.data
  const tables = data.tables
  yield put({ type: "LOADING_TABLES_DATA_ON_SUCCESS", tables })
}

function *handleCheckAction(action) {
  const { tableId, playerId } = action

  try {
    yield call(actionToGameDealer, "PLAYER_ACTION_CHECK", tableId, playerId)
    yield put({ type: "CHECK_ACTION_COMPLETED", tableId, playerId })
  } catch (error) {
    console.log(error);
    yield put({ type: "CHECK_ACTION_FAILED", tableId, playerId });
  }
}

function *handleMuckHandAction(action) {
  const { tableId, playerId } = action

  try {
    yield call(actionToGameDealer, "PLAYER_ACTION_MUCK_HAND", tableId, playerId)
    yield put({ type: "MUCK_HAND_ACTION_COMPLETED", tableId, playerId })
  } catch (error) {
    console.log(error);
    yield put({ type: "MUCK_HAND_ACTION_FAILED", tableId, playerId });
  }
}

function *handleShowHandAction(action) {
  const { tableId, playerId } = action

  try {
    yield call(actionToGameDealer, "PLAYER_ACTION_SHOW_HAND", tableId, playerId)
    yield put({ type: "SHOW_HAND_ACTION_COMPLETED", tableId, playerId });
  } catch (error) {
    console.log(error);
    yield put({ type: "SHOW_HAND_ACTION_FAILED", tableId, playerId });
  }
}

function *handleFoldAction(action) {
  const { tableId, playerId } = action

  try {
    yield call(actionToGameDealer, "PLAYER_ACTION_FOLD", tableId, playerId)
    yield put({ type: "FOLD_ACTION_COMPLETED", tableId, playerId })
  } catch(error) {
    console.log(error)
    yield put({ type: "FOLD_ACTION_FAILED", tableId, playerId, error })
  }
}

function *handleCallAction(action) {
  const { tableId, playerId } = action

  try {
    yield call(actionToGameDealer, "PLAYER_ACTION_CALL", tableId, playerId)
    yield put({ type: "CALL_ACTION_COMPLETED", tableId, playerId })
  } catch(error) {
    console.log(error)
    yield put({ type: "CALL_ACTION_FAILED", tableId, playerId, error })
  }
}

function *handleBetAction(action) {
  const { tableId, playerId, amount } = action

  try {
    const response = yield call(actionToGameDealer, "PLAYER_ACTION_BET_CHIPS", tableId, playerId, amount)
    const { pot } = response.data
    yield put({ type: "BET_ACTION_COMPLETED", tableId, playerId, amount, pot });
  } catch(error) {
    console.log(error)
    yield put({ type: "BET_ACTION_FAILED", tableId, playerId, error })
  }
}

function *handleTakePotAction(action) {
  const { tableId, playerId } = action

  try {
    const response = yield call(actionToGameDealer, "GAME_HAND_TAKE_POT", tableId, playerId)
    const { pot, playerStack } = camelizeKeys(response.data)
    yield put({ type: "TAKE_POT_ACTION_COMPLETED", tableId, playerId, pot, playerStack })
  } catch(error) {
    console.log(error)
    yield put({ type: "TAKE_POT_ACTION_FAILED", tableId, playerId, error })
  }
}

function *handlePlayerTakeSeat(action) {
  const { amount, tableId, playerId, seatNo, buyInAmount } = action

  try {
    const response = yield call(takeSeatToGameDealer, tableId, playerId, seatNo, buyInAmount)
    const data = response.data
    yield put({ type: "PLAYER_ACTION_TAKE_SEAT_COMPLETED", tableId, playerId, amount, pot: data.pot });
  } catch(error) {
    console.log(error)
    yield put({ type: "PLAYER_ACTION_TAKE_SEAT_FAILED", tableId, playerId, error })
  }
}

function *handleAddNpcPlayer(action) {
  const { tableId, seatNo } = action

  try {
    yield call(addNpcPlayer, tableId, seatNo)
    yield put({ type: "ON_SUCCESS_ADD_NPC_PLAYER" })
  } catch(error) {
    yield put({ type: "ON_FAILURE_ADD_NPC_PLAYER" })
  }
}

function *handleFetchPlayer() {
  try {
    const response = yield call(fetchCurrentUser)
    const data = response.data
    const user = camelizeKeys(data)
    yield put({ type: "FETCH_PLAYER_SUCCEEDED", ...user })
  } catch(error) {
    console.error(error)
    // ログイン成功後のリダイレクト先を保存
    sessionStorage.setItem('redirectTo', window.location.href);
    yield put({ type: "FETCH_PLAYER_FAILED" });
  }
}

function *handleGameStartButtonClicked(action) {
  const { tableId } = action

  try {
    yield call(startToGameDealer, tableId);
    yield put({ type: "GAME_START_COMPLETED", tableId })
  } catch(error) {
    console.log(error)
    yield put({ type: "GAME_START_FAILED", tableId })
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

function *openBoardCard(reachedRounds, boardCards, time) {
  try {
    const channel = yield call(sleepTimer, time)
    yield take(channel)
  } finally {
    yield put({
      type: "OPEN_BOARD_CARD_BY_ROUND",
      reachedRounds: reachedRounds,
      boardCards: boardCards,
    })
  }
}

function *handleBeforePlayerActionReceived(action) {
  // ALLIN時のボードオープン用
  if (action.justActioned && action.reachingRounds.length > 0) {
    yield put({ type: "SHOW_ACTIVE_PLAYER_CARDS", players: action.players })

    let reachedRounds = {}
    if (!action.reachingRounds.includes('flop')) {
      reachedRounds = {
        flop: action.reachingRounds.includes('turn') || action.reachingRounds.includes('river'),
        turn: !action.reachingRounds.includes('turn') && action.reachingRounds.includes('river'),
      }
      yield call(openBoardCard, reachedRounds, action.boardCards, 0)
    }
    yield all(action.reachingRounds.map((round, i) => {
      reachedRounds = Object.assign({}, reachedRounds)
      reachedRounds[round] = true
      return call(openBoardCard, reachedRounds, action.boardCards, (i + 1) * 2)
    }))

    try {
      const channel = yield call(sleepTimer, 2)
      yield take(channel)
    } finally {
      yield put(Object.assign({}, action, { type: "PLAYER_ACTION_RECEIVED" }))
      yield put({ type: "SETUP_GAME_START_TIMER", tableId: action.tableId, seconds: 10 })
      return
    }
  }

  if (action.lastAction && action.lastAction.action_type !== 'blind' && action.lastAction.action_type !== 'taken') {
    yield put({
      type: "OTHER_PLAYER_ACTION",
      actionType: action.lastAction.action_type,
      playerId: action.lastAction.player_id,
    })

    try {
      const channel = yield call(sleepTimer, 0.8)
      yield take(channel)
    } finally {
      let object = Object.assign({}, action, { type: "PLAYER_ACTION_RECEIVED" })
      yield put(object)
      if (action.gameHandState === 'finished') {
        yield put({ type: "SETUP_GAME_START_TIMER", tableId: action.tableId, seconds: 10 })
      }
    }
  } else {
    let object = Object.assign({}, action, { type: "PLAYER_ACTION_RECEIVED" })
    yield put(object)
    if (action.gameHandState === 'finished') {
      yield put({ type: "SETUP_GAME_START_TIMER", tableId: action.tableId, seconds: 10 })
    }
  }
}

function countdown(mSeconds) {
  return eventChannel(emitter => {
      const iv = setInterval(() => {
        mSeconds -= 1000
        if (mSeconds <= 0) {
          emitter(END)
        }
      }, 1000)

    return () => { clearInterval(iv) }
    }
  )
}

function *startCountdown(action) {
  let remain = action.seconds * 1000
  const channel = yield call(countdown, remain)
  try {
    yield take(channel)
  } finally {
    if (yield cancelled()) {
      channel.close()
    } else {
      yield put({ type: "GAME_START_BUTTON_CLICKED", tableId: action.tableId })
    }
  }
}

function *handleSetupGameStartTimer(action) {
  yield race([
    call(startCountdown, action),
    take('GAME_START_BUTTON_CLICKED'),
    take('PLAYER_ACTION_RECEIVED'),
  ])
}

function *handleInitialize() {
  let url = new URL(window.location.href);

  if (url.searchParams) {
    let jwt = url.searchParams.get('jwt')
    if (jwt) {
      localStorage.setItem('playerSession.jwt', jwt)
      // ブラウザのアドレスバーからJWTパラメータを削除する
      window.history.replaceState({}, "remove JWT", url.href.split('?')[0]);
    }
  } else {
    let parsed = parseQueryString(window.location.href.split('?')[1])
    if (parsed.jwt) {
      localStorage.setItem('playerSession.jwt', parsed.jwt)
      // ブラウザのアドレスバーからJWTパラメータを削除する
      window.history.replaceState({}, "remove JWT", url.href.split('?')[0]);
    }
  }

  // ログイン前のページへとリダイレクトさせる
  let jwt = localStorage.getItem('playerSession.jwt')
  let redirectTo = sessionStorage.getItem('redirectTo')
  sessionStorage.removeItem('redirectTo');
  if (jwt && redirectTo) {
    window.location = redirectTo;
  } else {
    yield put({ type: "FETCH_PLAYER" })
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
  yield takeEvery("ADD_NPC_PLAYER", handleAddNpcPlayer)
  yield takeEvery("BEFORE_PLAYER_ACTION_RECEIVED", handleBeforePlayerActionReceived)

  // TODO: 観戦時にはこれを無効にしたい
  yield takeEvery("SETUP_GAME_START_TIMER", handleSetupGameStartTimer)

  yield call(handleInitialize)
}
