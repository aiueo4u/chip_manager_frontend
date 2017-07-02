const initialState = {
  informationItems: []
}

const InformationReducer = (state = initialState, action) => {
  let informationItems = [].concat(state.informationItems);

  // 要素数を5つに保つ
  if (informationItems.length >= 5) {
    informationItems.pop()
  }

  switch(action.type) {
    // 退出時にログをクリアする
    case 'ROOM_INFORMATION_CLEAR':
      return Object.assign({}, state, { informationItems: [] })
    // 着席ログ
    case 'ROOM_INFORMATION_PLAYER_ENTERED':
      informationItems.unshift({
        time: action.time,
        nickname: action.nickname,
        type: 'ENTER',
      })
      return Object.assign({}, state, { informationItems })
    // 退出ログ
    case 'ROOM_INFORMATION_PLAYER_LEFT':
      informationItems.unshift({
        time: action.time,
        nickname: action.nickname,
        type: 'LEAVE',
      })
      return Object.assign({}, state, { informationItems })
    // アクションログ
    case 'ROOM_INFORMATION_PLAYER_ACTION':
      informationItems.unshift({
        time: action.time,
        nickname: action.nickname,
        type: action.playerActionType,
        amount: action.amount,
        pot: action.pot
      })
      return Object.assign({}, state, { informationItems })
    default:
      return state;
  }
}

export default InformationReducer;
