import React from "react";

import style from "./item.module.scss";


export const Item = () => {
    return (
        <div className={ style.item }>
            <div  className={ style.item__container }>
                <h3 className={ style.item__title }>
                    Item
                </h3>
                <div className={ style.item__img }></div>
                <div className={ style.item__price }>
                    19
                </div>
                <button type="button" className={style.item__btn}>Buy</button>
            </div>
        </div>
    )
}