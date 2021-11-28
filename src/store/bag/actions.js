export const bagActionTypes = {
    BAG_REQUEST: "BAG.BAG_REQUEST",
    BAG_SUCCESS: "BAG.BAG_SUCCESS",
    BAG_FAIL: "BAG.BAG_FAIL",
    ADD_ITEM_TO_BAG: "BAG.ADD_ITEM_TO_BAG",
    DELETE_ITEM_FROM_BAG: "BAG.DELETE_ITEM_FROM_BAG",
    SET_BAG_ITEMS_COUNT: "BAG.SET_BAG_ITEMS_COUNT",
}

export const bagActions = {
    bagRequest: () => ({type: bagActionTypes.BAG_REQUEST}),
    bagSuccess: (payload) => ({type: bagActionTypes.BAG_SUCCESS, payload}),
    bagFail: (error) => ({type: bagActionTypes.BAG_FAIL, payload: error}),
    addItemToBag: (payload) => ({type: bagActionTypes.ADD_ITEM_TO_BAG, payload}),
    deleteItemToBag: (payload) => ({type: bagActionTypes.DELETE_ITEM_FROM_BAG, payload}),
    setBagItemsCount: (payload) => ({type: bagActionTypes.SET_BAG_ITEMS_COUNT, payload}),

    setBagItems: (items) => async (dispatch) => {
        try {
            dispatch(bagActions.bagRequest());
            dispatch(bagActions.setBagItemsCount(items.map(item => { return item.quantity })));
            dispatch(bagActions.bagSuccess(items));
        } catch(error) {
            dispatch(bagActions.bagFail(error.message));
        } 
    },
}