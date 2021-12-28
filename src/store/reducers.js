import { combineReducers } from "redux";

import { itemsReducer as items} from "./shopItems";
import { bagReducer as bag} from "./bag";
import { tradersReducer as traders} from "./traders";
import { gameReducer as game } from "./game";
import { newsReducer as news } from "./news";


const reducers = combineReducers({
    items,
    bag,
    traders,
    game,
    news,
})

export const rootReducer = (state, action) => {
    if (action.type === 'GAME_RESET') {
      state = undefined;
    }
  
    return reducers(state, action)
}