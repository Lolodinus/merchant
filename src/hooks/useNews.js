import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { gameActions } from "../store/game";
import { newsActions } from "../store/news";
import { arrayNumSum } from "../utils";


export function useNews(event) {
    const dispatch = useDispatch();
    const { money, day} = useSelector((store) => store.game);    
    const { bagItemsCount } = useSelector((store) => store.bag);

    useEffect(() => {
        if (event && event.done) {
            dispatch(newsActions.addNews({
                event,
                id: day - 1,
                dayInfo: {
                    money,
                    bagItems: bagItemsCount,
                    day: day - 1 - (event.day ? arrayNumSum(event.day) : 0),
                }
            }));
            dispatch(gameActions.resetNewEvent());
        }
        // eslint-disable-next-line
    }, [dispatch, event])
}