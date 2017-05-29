import fetch from 'isomorphic-fetch'

const base_url = 'http://localhost:3001';

const send = (path, method, headers = {}, body = '') => {
  let url = `${base_url}${path}`;

  const jwt = localStorage.getItem('playerSession.jwt');
  if (jwt) {
    headers['PLAYER_JWT'] = jwt;
  }

  let options = { method: method, headers: headers };

  if (method === 'POST') {
    options['body'] = body
  }

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
}

const get = (path) => {
  return send(path, 'GET')
}

const post = (path, headers = {}, body = '') => {
  return send(path, 'POST', {}, body)
}

export const initialLogin = () => {
  return get('/players/@me')
    .then(json => {
      let nickname = json.nickname
      let playerSession = { isLoggedIn: true, nickname: nickname }
      return { json: playerSession };
    })
    .catch(error => {
      let playerSession = { isLoggedIn: false };
      return { json: playerSession };
    })
}

export const roomPlayers = (tableId) => {
  return get(`/tables/${tableId}/players`).then(json => { return { json } })
}

export const enteringRoom = (tableId) => {
  return post(`/tables/${tableId}/players`).then(json => { return { json } })
}

export const tableCreate = () => {
  return post('/tables').then(json => { return { json } })
}

export const submitLogin = (nickname) => {
  let body = new FormData();
  body.append('nickname', nickname);
  return post('/session', {}, body).then(json => { return { json } })
}

export const tables = () => {
  return get('/tables').then(json => { return { json } })
}
