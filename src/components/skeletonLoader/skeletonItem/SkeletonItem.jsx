import React from "react";

import style from "./skeletonItem.module.scss";

export const SkeletonItem = () => {
    return (
        <div className={ style["skeleton-item"] }>
            <div  className={ style["skeleton-item__container"] }>                    
                <div className={ style["skeleton-item__title"] } />
                <div className={ style["skeleton-item__img"] } />
                <div className={ style["skeleton-item__price"] } />
                <div className={ style["skeleton-item__btn"] } />
            </div>
        </div>
    )
}