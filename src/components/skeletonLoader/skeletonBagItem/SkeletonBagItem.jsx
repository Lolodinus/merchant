import React from "react";

import style from "./skeletonBagItem.module.scss";

export const SkeletonBagItem = () => {
    return (
        <div className={ style["skeleton-bag-item"] }>
            <div className={ style["skeleton-bag-item__content"] }>
                <div className={ style["skeleton-bag-item__title"] }/>
                <div className={ style["skeleton-bag-item__img"] }/>
                <div className={ style["skeleton-bag-item__count"] }/>
            </div>
        </div>
    )
}