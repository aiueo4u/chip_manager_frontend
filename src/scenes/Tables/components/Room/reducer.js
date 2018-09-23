import GameTableReducer from './components/GameTable/reducer.js';
import PlayersReducer from './components/ChipAmountControlContainer/reducer.js';
import ShowResultDialogReducer from './components/ShowResultDialog/reducer.js';

const initialState = {}

const RoomReducer = (state = initialState, action) => {
  return {
    GameTable: GameTableReducer(state.GameTable, action),
    Players: PlayersReducer(state.Players, action),
    ShowResultDialog: ShowResultDialogReducer(state.ShowResultDialog, action),
  }
}

export default RoomReducer;
