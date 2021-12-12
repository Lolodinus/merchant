import React from "react";

import { Item } from "../item";

import style from "./itemList.module.scss";


export const ItemsList = ({items, itemAction}) => {
    
    
    const getEmptyCell = (items=0) => {
        let emptyCell = [];
        for (let i = 0; i < 10 - items; i++) {
            emptyCell.push({
                id: i
            });
        }
        return emptyCell;
    }

    if (!items || items.length < 1) {
        return <div>Пусто</div>
    }

    return (
        <ul className={ style["items-list"] }>
            {   
                items
                    .map(item => {
                        return <Item item={ item } key={ `${item.id}${item.trader}` } itemAction={ itemAction } />
                    })
            }            
            {
                items.length < 10
                ? getEmptyCell(items.length).map(item => {
                    return(
                        <Item key={ item.id } />
                    )
                })
                : null
            }
        </ul>
    )
}