import { shopItemsActionTypes } from "./actions";

const initialState = {
    items: [],
    loading: false,
    error: null,
}

export const itemsReducer = (state = initialState, action) => {
    switch(action.type) {
        case shopItemsActionTypes.ITEMS_REQUEST:
            return {
                ...state,
                items: [],
                loading: true,
                error: null
            };
        case shopItemsActionTypes.ITEMS_SUCCESS:
            return {
                ...state,
                items: action.payload,
                loading: false,
            };
        case shopItemsActionTypes.ITEMS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}