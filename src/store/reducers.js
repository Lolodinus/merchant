import { combineReducers } from "redux";

import { itemsReducer as items} from "./shopItems";
import { bagReducer as bag} from "./bag";


export const reducers = combineReducers({
    items,
    bag,
})