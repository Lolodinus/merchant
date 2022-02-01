import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ItemsList, SkeletonLoader } from "../../components";
import { bagActions } from "../../store/bag";
import { gameActions } from "../../store/game";

import style from "./sell.module.scss";


export const Sell = () => {
    const dispatch = useDispatch();
    const { bagItems } = useSelector((store) => store.bag);
    const { activeTrader } = useSelector((store) => store.traders);
    const { items, error, loading} = useSelector((store) => store.items);

    useEffect(() => {
        if(bagItems.length > 0 && items.length > 0) {
            dispatch(bagActions.setItemNewPrice(bagItems, items));
        }
        // eslint-disable-next-line
    }, [items])
    
    const sellItems = (item) => {
        dispatch(gameActions.getMoney(item.newPrice));
        dispatch(bagActions.deleteItemToBag(item.id));
    }

    const getBagItemByTraderCategory = (bagItems) => {
        return bagItems.filter(item => {
            return item.category.id === activeTrader.category.id ? true : false;
        });
    }

    return (
        <section className={ style.sell }>
            <h2 className={ style.sell__title }>Sell</h2>
            {
                !error && loading
                    ? <SkeletonLoader quantity={10} type={"item-list"}/>
                    : activeTrader && <ItemsList items={ getBagItemByTraderCategory(bagItems) } itemAction={ sellItems } btnName={"Sell"} />
            }
        </section>
    )
}