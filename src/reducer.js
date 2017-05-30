import data from './data/reducer.js';
import tableReducer from './scenes/Tables/data/reducer.js';

const rootReducer = (state = {}, action) => {
  return {
    data: data(state.data, action),
    // Tables: tableReducer(state.Tables, action),
  }
}

export default rootReducer;
