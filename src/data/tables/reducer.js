const initialState = {
  players: [],
}

const tables = (state = initialState, action) => {
  switch(action.type) {
    case 'CREATE_TABLE_FORM_ON_SUBMIT':
      return Object.assign({}, state, { isFetching: true });
    case 'CREATE_TABLE_FORM_ON_SUCCESS':
      return Object.assign({}, state, { isFetching: false });
    case 'LOADING_TABLES_DATA':
      return Object.assign({}, state, { isPrepared: false });
    case 'LOADING_TABLES_DATA_ON_SUCCESS':
      return Object.assign({}, state, { isPrepared: true, tables: action.tables });
    default:
      return state
  }
}

export default tables;
