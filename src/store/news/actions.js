export const newsActionTypes = {
    ADD_NEWS: "NEWS.ADD_NEWS",
}

export const newsActions = {
    addNews: (payload) => ({type: newsActionTypes.ADD_NEWS, payload}),
}