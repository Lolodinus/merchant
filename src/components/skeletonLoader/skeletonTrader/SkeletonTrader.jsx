import React from "react";

import style from "./skeletonTrader.module.scss";

export const SkeletonTrader = () => {
    return (        
        <div className={ style["skeleton-trader"]}>
            <div className={ style["skeleton-trader__avatar"] }></div>
            <div className={ style["skeleton-trader__title"] } ></div>
            <div className={ style["skeleton-trader__actions"] }>
                <div className={ style["skeleton-trader__actions-buy"] } >
                    Byu
                </div>
                <div className={ style["skeleton-trader__actions-sell"] } >
                    Sell
                </div>
            </div>
        </div>
    )
}