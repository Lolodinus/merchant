import React from "react";

import { Item } from "../";

import style from "./itemList.module.scss";


export const ItemsList = ({items, itemAction, btnName}) => {
    
    const getEmptyCell = (items = 0) => {
        let emptyCell = [];
        for (let i = 0; i < 10 - items; i++) {
            emptyCell.push({
                id: i
            });
        }
        return emptyCell;
    }

    return (
        <>
            {
                !items || items.length < 1
                    ? <EmptyList/>
                    : <ul className={ style["items-list"] }>
                        {   
                            items
                                .map(item => {
                                    return <Item item={ item } key={ `${item.id}${item.trader}` } itemAction={ itemAction } btnName={ btnName }/>
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
            }
        </>
    )
}


const EmptyList = () => {
    return (
        <div className={`${style["sell__empty-bag"]} ${style["empty-bag"]}`}>
            <div className={ style["empty-bag__container"] } >
                <div className={ style["empty-bag__row"] } >
                    <div className={ style["empty-bag__text"] } >
                        Пусто
                    </div>                        
                    <div className={ style["empty-bag__img"] } />
                </div>
            </div>
        </div>
    )
}