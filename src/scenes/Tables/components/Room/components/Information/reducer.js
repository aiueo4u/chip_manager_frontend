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
    // アクションログ
    case 'ROOM_INFORMATION_PLAYER_ACTION':
      informationItems.unshift({
        time: action.time,
        nickname: action.nickname,
        type: action.playerActionType,
        amount: action.amount,
        pot: action.pot,
        round: action.round,
      })
      return Object.assign({}, state, { informationItems })
    default:
      return state;
  }
}

export default InformationReducer;
