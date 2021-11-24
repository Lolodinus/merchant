import React from "react";

import style from "./item.module.scss";


export const Item = ({item}) => {
    const { title, imgURL, price } = item;
    return (
        <div className={ style.item }>
            <div  className={ style.item__container }>
                <h3 className={ style.item__title }>
                    { title ? title : "Item" }
                </h3>
                <div className={ style.item__img }>
                    <img src={imgURL} alt={imgURL} />
                </div>
                <div className={ style.item__price }>
                    { price ? price : 0 }
                </div>
                <button type="button" className={style.item__btn}>Buy</button>
            </div>
        </div>
    )
}