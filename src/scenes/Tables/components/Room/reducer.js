import InformationReducer from './components/Information/reducer.js';
import GameTableReducer from './components/GameTable/reducer.js';
import PlayersReducer from './components/Player/reducer.js';
import GameDialogReducer from './components/GameDialog/reducer.js';

const initialState = {}

const RoomReducer = (state = initialState, action) => {
  return {
    Information: InformationReducer(state.Information, action),
    GameTable: GameTableReducer(state.GameTable, action),
    Players: PlayersReducer(state.Players, action),
    GameDialog: GameDialogReducer(state.GameDialog, action),
  }
}

export default RoomReducer;
