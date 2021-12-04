import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Item } from "../item";
import { shopItemsActions } from "../../store/shopItems";
import { bagActions } from "../../store/bag";

import style from "./itemList.module.scss";


export const ItemsList = () => {

    const dispatch = useDispatch();
    const { items } = useSelector((store) => store.items);
    const { traders, activeTrader } = useSelector((store) => store.traders);
    const { bagItemsCount } = useSelector((store) => store.bag);

    useEffect(() => {
        if ( items.length <= 0 && traders && traders.length > 0) {
            dispatch(shopItemsActions.fetchItems(10, traders));
        }
        // eslint-disable-next-line
    }, [dispatch, traders])    

    const addItemToBag = ( item ) => {
        if (bagItemsCount < 10) {
            dispatch(bagActions.addItemToBag(item));
        }
    }

    return (
        <ul className={ style["items-list"] }>
            {   
                items && items.length > 0
                ? items
                    .filter(item => {
                        return item.trader === activeTrader
                            ? true
                            : false 
                    })
                    .map(item => {
                        return <Item item={ item } key={ `${item.id}${item.trader}` } addItem={ addItemToBag } />
                    })
                : <div>Пусто</div>
            }
        </ul>
    )
}