import { userActionTypes } from "./actions";

const initialState = {
    username: null,
    id: null,
    login: false,
    error: null
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case userActionTypes.SET_USER:
            return {
                ...state,
                username: action.payload.username,
                id: action.payload.id,
                login: true,
                error: null
            };
        case userActionTypes.RESET_USER:
            return {
                ...state,
                username: null,
                id: null,
                login: false
            };
        case userActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case userActionTypes.REMOVE_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
}