import { combineReducers } from "redux";

import { itemsReducer as items} from "./shopItems";

export const reducers = combineReducers({
    items,
})