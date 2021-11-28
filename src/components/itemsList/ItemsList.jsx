import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Item } from "../item";
import { shopItemsActions } from "../../store/shopItems";
import { bagActions } from "../../store/bag";

import style from "./itemList.module.scss";


export const ItemsList = () => {

    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((store) => store.items);
    const { bagItemsCount } = useSelector((store) => store.bag);

    useEffect(() => {
        if (items.length <= 0) {
            dispatch(shopItemsActions.fetchItems(10));
        }
    }, [])

    const addItemToBag = ( item ) => {
        if (bagItemsCount < 10) {
            dispatch(bagActions.addItemToBag(item));
        }
    }

    return (
        <ul className={ style["items-list"] }>
            {   
                items && items.length > 0
                ? items.map(item => {
                    return <Item item={ item } key={ item.id } addItem={ addItemToBag } />
                })
                : null
            }
        </ul>
    )
}