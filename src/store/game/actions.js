import { getEvent } from "../../services/merchant";


export const gameActionTypes = {
    GET_MONEY: "GAME.GET_MONEY",
    SPEND_MONEY: "GAME.SPEND_MONEY",
    NEXT_DAY: "GAME.NEXT_DAY",
    GAME_OVER: "GAME.GAME_OVER",
    SET_NEW_EVENT: "GAME.SET_NEW_EVENT",
    EVENT_DONE: "GAME.EVENT_DONE",
    RESET_NEW_EVENT: "GAME.RESET_NEW_EVENT",
}

export const gameActions = {
    getMoney: (payload) => ({type: gameActionTypes.GET_MONEY, payload}),
    spendMoney: (payload) => ({type: gameActionTypes.SPEND_MONEY, payload}),
    nextDay: () => ({type: gameActionTypes.NEXT_DAY}),
    gameOver: () => ({type: gameActionTypes.GAME_OVER}),
    setNewEvent: (payload) => ({type: gameActionTypes.SET_NEW_EVENT, payload}),
    eventDone: () => ({type: gameActionTypes.EVENT_DONE}),
    resetNewEvent: () => ({type: gameActionTypes.RESET_NEW_EVENT}),

    getNewEvent: () => async (dispatch) => {
        try {      
            let event = await getEvent();
            dispatch(gameActions.setNewEvent({
                ...event,
                done: false
            }));
        } catch(error) {
            console.log(error);
        } 
    },
}