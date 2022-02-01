import React from "react";

import style from "./item.module.scss";


export const Item = ({item, itemAction, btnName}) => {
    return (
        <div className={ style.item }>
            <div  className={ style.item__container }>
                {
                    item
                        ? (
                        <>
                            <h3 className={ style.item__title }>
                                { item.title ? item.title : "Item" }
                            </h3>
                            <div className={ style.item__img }>
                                <img src={item.imgURL} alt={item.title} />
                            </div>
                            <div className={ style.item__price }>
                                { item.price ? item.newPrice : 0 }
                            </div>
                            { 
                                item.quantity 
                                    ? <div className={ style.item__quantity }> { item.quantity } </div> 
                                    : null
                            }
                            <button 
                                type="button"
                                className={style.item__btn}
                                onClick={ () => itemAction(item) }
                            >
                                { btnName }
                            </button>
                        </>
                        )
                        : null
                }
            </div>
        </div>
    )
}