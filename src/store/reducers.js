import { combineReducers } from "redux";

import { itemsReducer as items} from "./shopItems";
import { bagReducer as bag} from "./bag";
import { tradersReducer as traders} from "./traders";
import { gameReducer as game } from "./game"


const reducers = combineReducers({
    items,
    bag,
    traders,
    game,
})

export const rootReducer = (state, action) => {
    if (action.type === 'GAME_RESET') {
      state = undefined;
    }
  
    return reducers(state, action)
}