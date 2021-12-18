import { createStore } from "redux";

import { rootReducer } from "./reducers";
import { middlewares } from "./middlewares";

export const store = createStore(rootReducer, middlewares);