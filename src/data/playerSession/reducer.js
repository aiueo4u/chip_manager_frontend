const initialState = {}

const playerSession = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PLAYER_SUCCEEDED':
      return Object.assign({}, state, { isPrepared: true, isLoggedIn: true, nickname: action.nickname, playerId: action.playerId, imageUrl: action.imageUrl });
    case 'FETCH_PLAYER_FAILED':
      return Object.assign({}, state, { isPrepared: true })
    case 'LOGIN_FORM_ON_SUBMIT':
      return Object.assign({}, state, { isFetching: true })
    case 'LOGIN_FORM_ON_SUCCESS':
      return Object.assign({}, state, { isFetching: false, isLoggedIn: true, nickname: action.nickname, playerId: action.playerId })
    default:
      return state

  }
};

export default playerSession;
