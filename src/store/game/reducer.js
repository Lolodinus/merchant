import { gameActionTypes } from "./actions";

const initialState = {
    money: 100,
    day: 1,
    gameOver: false
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
        default:
            return state;
    }
}