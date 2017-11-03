import InformationReducer from './components/Information/reducer.js';
import GameTableReducer from './components/GameTable/reducer.js';
import PlayersReducer from './components/ChipAmountControlContainer/reducer.js';
import GameDialogReducer from './components/GameDialog/reducer.js';
import ShowResultDialogReducer from './components/ShowResultDialog/reducer.js';

const initialState = {}

const RoomReducer = (state = initialState, action) => {
  return {
    Information: InformationReducer(state.Information, action),
    GameTable: GameTableReducer(state.GameTable, action),
    Players: PlayersReducer(state.Players, action),
    GameDialog: GameDialogReducer(state.GameDialog, action),
    ShowResultDialog: ShowResultDialogReducer(state.ShowResultDialog, action),
  }
}

export default RoomReducer;
