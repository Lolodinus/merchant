import { gameActionTypes } from "./actions";

const initialState = {
    money: 100,
    day: 1,
    gameOver: false,
    event: null,
}

export const gameReducer = (state = initialState, action) => {
    switch(action.type) {
        case gameActionTypes.GET_MONEY:
            return {
                ...state,
                money: state.money + action.payload,
            };
        case gameActionTypes.SPEND_MONEY:
            return {
                ...state,
                money: state.money - action.payload,
            };
        case gameActionTypes.NEXT_DAY:
            return {
                ...state,
                day: state.day + 1,
            };
        case gameActionTypes.GAME_OVER:
            return {
                ...state,
                gameOver: !state.gameOver,
            };
        case gameActionTypes.SET_NEW_EVENT:
            return {
                ...state,
                event: action.payload
            };
        case gameActionTypes.EVENT_DONE:
            return {
                ...state,
                event: {
                    ...state.event,
                    done: true,
                }
            };
        case gameActionTypes.RESET_NEW_EVENT:
            return {
                ...state,
                event: null,
            };
        default:
            return state;
    }
}