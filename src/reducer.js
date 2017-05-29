import data from './data/reducer.js';

const rootReducer = (state = {}, action) => {
  return {
    data: data(state.data, action),
  }
}

export default rootReducer;
