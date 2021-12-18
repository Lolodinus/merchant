export const gameActionTypes = {
    GET_MONEY: "GAME.GET_MONEY",
    SPEND_MONEY: "GAME.SPEND_MONEY",
    NEXT_DAY: "GAME.NEXT_DAY",
    GAME_OVER: "GAME.GAME_OVER",
}

export const gameActions = {
    getMoney: (payload) => ({type: gameActionTypes.GET_MONEY, payload}),
    spendMoney: (payload) => ({type: gameActionTypes.SPEND_MONEY, payload}),
    nextDay: () => ({type: gameActionTypes.NEXT_DAY}),
    gameOver: () => ({type: gameActionTypes.GAME_OVER}),
}