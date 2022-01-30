import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getRandomBagItemId, getItemsFromFirestore } from "../services/merchant";
import { gameActions } from "../store/game";
import { bagActions } from "../store/bag";
import { arrayNumSum } from "../utils";
import { links } from "../const/pageLinks"


export function useEvent(event) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { bagItems } = useSelector((store) => store.bag);

    function moneyEvent(money) {
        let totalMoney = arrayNumSum(money);
        if (totalMoney === 0) {
            return
        }
        totalMoney > 0
            ? dispatch(gameActions.getMoney(totalMoney))
            : dispatch(gameActions.spendMoney(Math.abs(totalMoney)));
    }
    function dayEvent(days) {
        let totalDays = arrayNumSum(days);
        for (let i = 0; i < totalDays; i++) {
            dispatch(gameActions.nextDay());
        }
    }
    async function bagItemEvent(items, bagItems) {
        let totalBagItem = arrayNumSum(items);

        if (totalBagItem === 0) {
            return
        }        
        if (totalBagItem > 0) {
            const newItems = await getItemsFromFirestore(totalBagItem);
            newItems.forEach(item => {
                dispatch(bagActions.addItemToBag(item));
            });
        } 
        if (totalBagItem < 0  && bagItems.length > 0) {
            const lostItemIds =  await getRandomBagItemId(bagItems, totalBagItem);
            lostItemIds.forEach(id => {
                dispatch(bagActions.deleteItemToBag(id));
            });                    
        }
    }

    useEffect(() => {
        if (event && !event.done) {
            if (event.hasOwnProperty("money")) {
                moneyEvent(event.money);
            }
            if (event.hasOwnProperty("day")) {
                dayEvent(event.day);
            } 
            if (event.hasOwnProperty("bagItem")) {
                
                bagItemEvent(event.bagItem, bagItems).catch(() => {
                    navigate(links.error, {state: {
                        title: "Event Error",
                        discription: `Во время обработки события "${event.eventName}" произошла ошибка с инвентарём!`, 
                    }});
                });
            }
            dispatch(gameActions.eventDone());
        }
        // eslint-disable-next-line
    }, [dispatch, event])
}