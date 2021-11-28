import React from "react";

import style from "./bagItem.module.scss";

export const BagItem = ({item, deleteItem, empty=false}) => {
    return(
        <div className={ `${ style.bag__item } ${style["bag-item"]}` } >
            {
                !empty
                    ?
                        <>
                            <div className={ style["bag-item__content"] }>
                                <div className={ style["bag-item__title"] }>
                                    { item.title }
                                </div>
                                <div className={ style["bag-item__img"] }>
                                    <img src={ item.imgURL } alt={ item.title } className={ style["bag-item__img"] } />
                                </div>
                                <div className={ style["bag-item__count"] }>
                                    x{ item.quantity }
                                </div>
                            </div>
                            <div className={ style["bag-item__actions"] }>
                                <button className={ style["bag-item__delete"] } onClick={ () => deleteItem(item.id) }>
                                    X
                                </button>
                            </div>
                        </>
                    : null
            }
        </div>
    )
}