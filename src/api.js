import axios from 'axios'
import { API_ENDPOINT } from './Configuration.js';

const jwt = localStorage.getItem('playerSession.jwt')
const ApiClient = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'PLAYER_JWT': jwt,
  },
});

ApiClient.interceptors.response.use(response => {
  const prevClientVersion = localStorage.getItem('current-client-version')
  const currentClientVersion = response.headers['current-client-version']
  localStorage.setItem('current-client-version', currentClientVersion);

  if (prevClientVersion && prevClientVersion !== currentClientVersion) {
    window.location.reload() // TODO: ここでリロード？
  }
  return response
})

export const takeSeatToGameDealer = (tableId, playerId, seatNo, buyInAmount) => {
  const body = new FormData();
  body.append("type", "PLAYER_ACTION_TAKE_SEAT")
  body.append("table_id", tableId)
  body.append("player_id", playerId)
  body.append("seat_no", seatNo)
  body.append("buy_in_amount", buyInAmount)
  return ApiClient.post('/game_dealer/take_seat', body)
}

export const addNpcPlayer = (tableId, seatNo) => {
  const body = new FormData()
  body.append("type", "PLAYER_ACTION_TAKE_SEAT")
  body.append("table_id", tableId)
  body.append("seat_no", seatNo)
  return ApiClient.post('/game_dealer/add_npc_player', body)
}

export const actionToGameDealer = (type, tableId, playerId, amount = null) => {
  const body = new FormData();
  body.append("type", type)
  body.append("table_id", tableId)
  body.append("player_id", playerId)
  if (amount) body.append("amount", amount)
  return ApiClient.post('/game_dealer', body)
}

export const startToGameDealer = tableId => {
  let body = new FormData();
  body.append("table_id", tableId)
  return ApiClient.post('/game_dealer/start', body)
}

export const tableCreate = (tableName, sb, bb) => {
  let body = new FormData();
  body.append('table_name', tableName);
  body.append('sb', sb);
  body.append('bb', bb);
  return ApiClient.post(`/tables`, body)
}

export const submitLogin = (nickname) => {
  let body = new FormData();
  body.append('nickname', nickname);
  return ApiClient.post(`/session`, body)
}

export const fetchCurrentUser = () => ApiClient.get(`/players/@me`)
export const fetchTables = () => ApiClient.get(`/tables`)
