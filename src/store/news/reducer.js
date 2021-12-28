import { newsActionTypes } from "./actions";


const initialState = {
    news: [],
}

export const newsReducer = (state = initialState, action) => {
    switch(action.type) {
        case newsActionTypes.ADD_NEWS:
            return {
                ...state,
                news: [...state.news, action.payload],
            };
        default:
            return state;
    }
}