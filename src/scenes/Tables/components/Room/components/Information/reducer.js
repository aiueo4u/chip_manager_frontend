const initialState = {
  informationItems: []
}

const InformationReducer = (state = initialState, action) => {
  let informationItems = [].concat(state.informationItems);

  // 要素数を2つに保つ
  if (informationItems.length >= 2) {
    informationItems.shift()
  }

  switch(action.type) {
    // 退出時にログをクリアする
    case 'ROOM_INFORMATION_CLEAR':
      return Object.assign({}, state, { informationItems: [] })
    // 着席ログ
    case 'ROOM_INFORMATION_PLAYER_ENTERED':
      informationItems.push({
        time: action.time,
        nickname: action.nickname,
        type: 'ENTER',
      })
      return Object.assign({}, state, { informationItems })
    // 退出ログ
    case 'ROOM_INFORMATION_PLAYER_LEFT':
      informationItems.push({
        time: action.time,
        nickname: action.nickname,
        type: 'LEAVE',
      })
      return Object.assign({}, state, { informationItems })
    // アクションログ
    case 'ROOM_INFORMATION_PLAYER_ACTION':
      informationItems.push({
        time: action.time,
        nickname: action.nickname,
        type: action.playerActionType,
        amount: action.amount,
      })
      return Object.assign({}, state, { informationItems })
    default:
      return state;
  }
}

export default InformationReducer;
