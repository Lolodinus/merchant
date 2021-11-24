import React, { useEffect, useState } from "react";

import { Item } from "../item";
import { getAllWeaponsFromFirestore } from "../../services/firebase";

import style from "./itemList.module.scss";


export const ItemsList = () => {

    const [items, setItems] = useState("");

    useEffect(() => {
        getAllWeaponsFromFirestore()
            .then((items) => {
                setItems(items)
            })
            .catch(error => {
                console.log(error);
            });
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