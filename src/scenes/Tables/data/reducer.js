const tableReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOADING_TABLES_DATA_ON_SUCCESS':
      return Object.assign({}, state);
    default:
      return state;
  }
}

export default tableReducer;
