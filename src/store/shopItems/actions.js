import { setItemsToTraders } from "../../services/merchant";


export const shopItemsActionTypes = {
    ITEMS_REQUEST: "SHOP_ITEMS.ITEMS_REQUEST",
    ITEMS_SUCCESS: "SHOP_ITEMS.ITEMS_SUCCESS",
    ITEMS_FAIL: "SHOP_ITEMS.ITEMS_FAIL",
}

export const shopItemsActions = {
    itemsRequest: () => ({type: shopItemsActionTypes.ITEMS_REQUEST}),
    itemsSuccess: (payload) => ({type: shopItemsActionTypes.ITEMS_SUCCESS, payload}),
    itemsFail: (error) => ({type: shopItemsActionTypes.ITEMS_FAIL, payload: error}),

    fetchItems: (quality, traders) => async (dispatch) => {
        try {
            dispatch(shopItemsActions.itemsRequest());
            const items = await setItemsToTraders(quality, traders);
            dispatch(shopItemsActions.itemsSuccess(items));
        } catch(error) {
            dispatch(shopItemsActions.itemsFail(error.message));
        } 
    },
}