import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Item } from "../item";
import { shopItemsActions } from "../../store/shopItems";

import style from "./itemList.module.scss";


export const ItemsList = () => {

    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((store) => store.items);

    useEffect(() => {
        dispatch(shopItemsActions.fetchItems(10));
    }, [])

    return (
        <ul className={ style["items-list"] }>
            {   
                items && items.length > 0
                ? items.map(item => {
                    return <Item item={item} key={item.id}/>
                })
                : null
            }
        </ul>
    )
}