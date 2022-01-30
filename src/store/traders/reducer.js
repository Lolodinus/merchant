import { tradersActionTypes } from "./actions";

const initialState = {
    traders: [],
    activeTrader: "",
    loading: false,
    error: null,
}

export const tradersReducer = (state = initialState, action) => {
    switch(action.type) {
        case tradersActionTypes.TRADERS_REQUEST:
            return {
                ...state,
                traders: [],
                loading: true,
                error: null
            };
        case tradersActionTypes.TRADERS_SUCCESS:
            return {
                ...state,
                traders: action.payload,
                loading: false
            };
        case tradersActionTypes.TRADERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case tradersActionTypes.SET_ACTIVE_TRADER:
            return {
                ...state,
                activeTrader: action.payload,
            };
        default:
            return state;
    }
}