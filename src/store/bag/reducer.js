import { bagActionTypes } from "./actions";

const initialState = {
    bagItems: [],
    loading: false,
    error: null,
    bagItemsCount: 0,
}

export const bagReducer = (state = initialState, action) => {
    switch(action.type) {
        case bagActionTypes.BAG_REQUEST:
            return {
                ...state,
                bagItems: [],
                loading: true,
                error: null
            };
        case bagActionTypes.BAG_SUCCESS:
            return {
                ...state,
                bagItems: action.payload,
                loading: false
            };
        case bagActionTypes.BAG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case bagActionTypes.ADD_ITEM_TO_BAG:
            const itemIsAlreadyInBag = state.bagItems.findIndex(item => item.id === action.payload.id);
            if (itemIsAlreadyInBag >= 0) {
                return {
                    ...state,
                    bagItems: [
                        ...state.bagItems.slice(0, itemIsAlreadyInBag),
                        {
                            ...state.bagItems[itemIsAlreadyInBag],
                            quantity: state.bagItems[itemIsAlreadyInBag].quantity + 1,
                        },
                        ...state.bagItems.slice(itemIsAlreadyInBag + 1),
                    ],
                    bagItemsCount: state.bagItemsCount + 1,
                };
            } else {
                return {
                    ...state,
                    bagItems: [
                        ...state.bagItems,
                        {
                            ...action.payload,
                            quantity: 1,
                        },
                    ],
                    bagItemsCount: state.bagItemsCount + 1,
                };
            }
        case bagActionTypes.DELETE_ITEM_FROM_BAG:
            const itemId = state.bagItems.findIndex(item => item.id === action.payload);
            if ( state.bagItems[itemId].quantity - 1 > 0 ) {
                return {
                    ...state,
                    bagItems: [
                        ...state.bagItems.slice(0, itemId),
                        {
                            ...state.bagItems[itemId],
                            quantity: state.bagItems[itemId].quantity - 1,
                        },
                        ...state.bagItems.slice(itemId + 1),
                    ],
                    bagItemsCount: state.bagItemsCount - 1,
                };
            } else {
                return {
                    ...state,
                    bagItems: [
                        ...state.bagItems.slice(0, itemId),
                        ...state.bagItems.slice(itemId + 1),
                    ],
                    bagItemsCount: state.bagItemsCount - 1,
                };

            }
        case bagActionTypes.SET_BAG_ITEMS_COUNT:
            const reducer = (previousValue, currentValue) => previousValue + currentValue;
            const newCount = action.payload.reduce(reducer, 0);
            return {
                ...state,
                bagItemsCount: newCount,
            };
        default:
            return state;
    }
}