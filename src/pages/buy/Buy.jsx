import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { bagActions } from "../../store/bag";
import { gameActions } from "../../store/game";
import { ItemsList } from "../../components";

import style from "./buy.module.scss";


export const Buy = () => {

    const dispatch = useDispatch();
    const { items } = useSelector((store) => store.items);
    const { activeTrader } = useSelector((store) => store.traders);
    const { bagItemsCount } = useSelector((store) => store.bag);
    const { money } = useSelector((store) => store.game);

    const addItemToBag = ( item ) => {
        if (bagItemsCount < 10 && item.price <= money) {
            dispatch(gameActions.spendMoney(item.price));
            dispatch(bagActions.addItemToBag(item));
        }
    }

    const traderItems = (items) => {
        let newItems = "";

        if (items && items.length > 0) {
            newItems = items
                .filter(item => {
                    return item.trader === activeTrader.id
                        ? true
                        : false 
                })
        };
        
        return newItems
    }

    return (
        <section className={ style.buy }>
            <h2 className={ style.buy__title }>Bay</h2>
            <ItemsList items={ traderItems(items) } itemAction={ addItemToBag } btnName={"Buy"} />
        </section>
    )
}