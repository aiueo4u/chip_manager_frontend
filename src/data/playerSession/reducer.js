const initialState = {}

const playerSession = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIAL_LOGIN_COMPLETED':
      return Object.assign({}, state, { isPrepared: true, isLoggedIn: action.isLoggedIn, nickname: action.nickname, playerId: action.playerId });
    case 'LOGIN_FORM_ON_SUBMIT':
      return Object.assign({}, state, { isFetching: true })
    case 'LOGIN_FORM_ON_SUCCESS':
      return Object.assign({}, state, { isFetching: false, isLoggedIn: true, nickname: action.nickname, playerId: action.playerId })
    default:
      return state

  }
};

export default playerSession;
