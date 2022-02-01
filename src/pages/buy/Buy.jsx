import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { bagActions } from "../../store/bag";
import { gameActions } from "../../store/game";
import { ItemsList, SkeletonLoader } from "../../components";
import { links } from "../../const/pageLinks";

import style from "./buy.module.scss";


export const Buy = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((store) => store.items);
    const { activeTrader } = useSelector((store) => store.traders);
    const { bagItemsCount } = useSelector((store) => store.bag);
    const { money } = useSelector((store) => store.game);

    const addItemToBag = ( item ) => {
        if (bagItemsCount < 10 && item.newPrice <= money) {
            dispatch(gameActions.spendMoney(item.newPrice));
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

    useEffect(() => {
        if (error && error.message) {
            navigate(links.error, {state:error});
        }
        // eslint-disable-next-line
    }, [error])

    return (
        <section className={ style.buy }>
            <h2 className={ style.buy__title }>Bay</h2>
            {
                !error && loading
                    ? <SkeletonLoader quantity={10} type={"item-list"}/>
                    : <ItemsList items={ traderItems(items) } itemAction={ addItemToBag } btnName={"Buy"} />
            }
        </section>
    )
}