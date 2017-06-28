import RoomReducer from './components/Room/reducer.js';

const TablesReducer = (state = {}, action) => {
  return {
    Room: RoomReducer(state.Room, action),
  }
}

export default TablesReducer;
