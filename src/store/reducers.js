import { combineReducers } from "redux";

import { itemsReducer as items} from "./shopItems";
import { bagReducer as bag} from "./bag";
import { tradersReducer as traders} from "./traders";
import { gameReducer as game } from "./game";
import { newsReducer as news } from "./news";
import { userReducer as user } from "./user";


const reducers = combineReducers({
    items,
    bag,
    traders,
    game,
    news,
    user
})

export const rootReducer = (state, action) => {
    if (action.type === 'GAME_RESET') {
      state = undefined;
    }
    if (action.type === "NEW_DAY") {
      state = {
        ...state,
        traders: undefined,
        items: undefined
      };
    }
  
    return reducers(state, action)
}