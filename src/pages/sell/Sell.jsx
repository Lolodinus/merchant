import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ItemsList } from "../../components";
import { bagActions } from "../../store/bag";
import { gameActions } from "../../store/game";

import style from "./sell.module.scss";


export const Sell = () => {
    const dispatch = useDispatch();
    const { bagItems } = useSelector((store) => store.bag);
    const { activeTrader } = useSelector((store) => store.traders);
    
    const sellItems = (item) => {
        dispatch(gameActions.getMoney(item.price));
        dispatch(bagActions.deleteItemToBag(item.id));
    }

    const getBagItemByTraderCategory = (bagItems) => {
        return bagItems.filter(item => {
            return item.category.id === activeTrader.category.id ? true : false;
        })
    }

    return (
        <section className={ style.sell }>
            <h2 className={ style.sell__title }>Sell</h2>
            {
                activeTrader && <ItemsList items={ getBagItemByTraderCategory(bagItems) } itemAction={ sellItems } btnName={"Sell"} />
            }
        </section>
    )
}