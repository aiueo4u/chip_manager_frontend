import fetch from 'isomorphic-fetch'
import { API_ENDPOINT } from './Configuration.js';

const send = (path, method, headers = {}, body = '') => {
  let url = `${API_ENDPOINT}${path}`;

  const jwt = localStorage.getItem('playerSession.jwt');
  if (jwt) {
    headers['PLAYER_JWT'] = jwt;
  }

  let options = { method: method, headers: headers };

  if (method === 'POST' || method === 'PUT') {
    options['body'] = body
  }

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw response;
      }

      // クライアントバージョン確認
      let prevClientVersion = localStorage.getItem('Current-Client-Version');
      let currentClientVersion = response.headers.get('Current-Client-Version');
      localStorage.setItem('Current-Client-Version', currentClientVersion);

      // クライアントバージョンが更新されていた場合
      if (prevClientVersion && prevClientVersion !== currentClientVersion) {
        // TODO: ここでリロード・・・？
        window.location.reload();
      }

      return response.json(); // TODO: .json()を消す？
    })
}

const get = (path) => {
  return send(path, 'GET')
}

const put = (path, headers = {}, body = '') => {
  return send(path, 'PUT', {}, body)
}

const post = (path, headers = {}, body = '') => {
  return send(path, 'POST', {}, body)
}

export const updateChip = (tableId, playerId, amount) => {
  let body = new FormData();
  body.append('amount', amount);
  return put(`/tables/${tableId}/players/@me`, {}, body)
    .then(json => {
      return { json };
    })
}

export const takeSeatToGameDealer = (action) => {
  let body = new FormData();
  for (let key in action) {
    body.append(key, action[key])
  }
  return post('/game_dealer/take_seat', {}, body)
}

export const addNpcPlayer = (params) => {
  let body = new FormData()
  for (let key in params) {
    body.append(key, params[key])
  }
  return post('/game_dealer/add_npc_player', {}, body)
}

export const actionToGameDealer = (action) => {
  let body = new FormData();
  for (let key in action) {
    body.append(key, action[key])
  }
  return post('/game_dealer', {}, body)
}

export const startToGameDealer = (action) => {
  let body = new FormData();
  for (let key in action) {
    body.append(key, action[key])
  }
  return post('/game_dealer/start', {}, body)
}

export const initialLogin = () => {
  return get('/players/@me')
}

export const tableCreate = (tableName, sb, bb, withCards) => {
  let body = new FormData();
  body.append('table_name', tableName);
  body.append('sb', sb);
  body.append('bb', bb);
  if (withCards) {
    body.append('deal_cards', withCards);
  }
  return post('/tables', {}, body).then(json => { return { json } })
}

export const submitLogin = (nickname) => {
  let body = new FormData();
  body.append('nickname', nickname);
  return post('/session', {}, body).then(json => { return { json } })
}

export const tables = () => {
  return get('/tables').then(json => { return { json } })
}
