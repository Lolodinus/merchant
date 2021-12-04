import { combineReducers } from "redux";

import { itemsReducer as items} from "./shopItems";
import { bagReducer as bag} from "./bag";
import { tradersReducer as traders} from "./traders";


export const reducers = combineReducers({
    items,
    bag,
    traders,
})