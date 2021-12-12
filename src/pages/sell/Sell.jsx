import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ItemsList } from "../../components/itemsList";
import { bagActions } from "../../store/bag";

import style from "./sell.module.scss";


export const Sell = () => {
    const dispatch = useDispatch();
    const { bagItems } = useSelector((store) => store.bag);
    
    const sellItems = (item) => {
        const { id } = item;
        dispatch(bagActions.deleteItemToBag(id));
    }

    return (
        <section className={ style.sell }>
            <h2 className={ style.sell__title }>Sell</h2>
            <ItemsList items={ bagItems } itemAction={ sellItems } />
        </section>
    )
}