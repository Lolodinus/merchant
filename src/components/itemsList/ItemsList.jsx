import React from "react";

import { Item } from "../item";

import style from "./itemList.module.scss";


export const ItemsList = () => {

    // const itemRender = () => {
    //     let items = [];
    //     for(let i = 0; i < 10; i++) {
    //         items.push(i+1);
    //     }
    //     items.map(item => {
    //         return (
    //             <li className={ style.item } key={ item }>
    //                 item
    //             </li>
    //         )
    //     })
    // }

    return (
        <ul className={ style["items-list"] }>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
        </ul>
    )
}