import { getTradersFromFirestoreDB } from "../../services/merchant";


export const tradersActionTypes = {
    TRADERS_REQUEST: "TRADERS.TRADERS_REQUEST",
    TRADERS_SUCCESS: "TRADERS.TRADERS_SUCCESS",
    TRADERS_FAIL: "TRADERS.TRADERS_FAIL",
    SET_ACTIVE_TRADER: "TRADERS.SET_ACTIVE_TRADER",
}

export const tradersActions = {
    tradersRequest: () => ({type: tradersActionTypes.TRADERS_REQUEST}),
    tradersSuccess: (payload) => ({type: tradersActionTypes.TRADERS_SUCCESS, payload}),
    tradersFail: (error) => ({type: tradersActionTypes.TRADERS_FAIL, payload: error}),
    setActiveTrader: (payload) => ({type: tradersActionTypes.SET_ACTIVE_TRADER, payload}),

    fetchTraders: (quality) => async (dispatch) => {
        try {
            dispatch(tradersActions.tradersRequest());
            const traders = await getTradersFromFirestoreDB(quality);
            dispatch(tradersActions.tradersSuccess(traders));
        } catch(error) {
            dispatch(tradersActions.tradersFail({
                title: error.code,
                discription: error.message
            }));
        } 
    },
}