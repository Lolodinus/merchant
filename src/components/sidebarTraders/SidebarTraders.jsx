import React from "react";

import style from "./sidebarTraders.module.scss";


export const SidebarTraders = () => {
    return (
        <section className={ style.traders }>
            <div className={ style.traders__container }>
                <div className={ style.traders__row }>
                    <h2 className={ style.traders__header }>
                        Traders
                    </h2>
                    <div className={ style.traders__list }>
                        <div className={ style.traders__item }>
                            <div className={ style.traders__avatar }></div>
                            <h3 className={ style.traders__title }> Trader </h3>
                            <p className={ style.traders__discription }></p>
                            <div className={ style.traders__actions }>
                                <button className={ style["traders__actions-buy"] }>Byu</button>
                                <button className={ style["traders__actions-sell"] }>Sell</button>
                            </div>
                        </div>
                        <div className={ style.traders__item }>
                            <div className={ style.traders__avatar }></div>
                            <h3 className={ style.traders__title }> Trader </h3>
                            <p  className={ style.traders__discription }></p>
                            <div className={ style.traders__actions }>
                                <button className={ style["traders__actions-buy"] }>Byu</button>
                                <button className={ style["traders__actions-sell"] }>Sell</button>
                            </div>
                        </div>
                        <div className={ style.traders__item }>
                            <div className={ style.traders__avatar }></div>
                            <h3 className={ style.traders__title }> Trader </h3>
                            <p  className={ style.traders__discription }></p>
                            <div className={ style.traders__actions }>
                                <button className={ style["traders__actions-buy"] }>Byu</button>
                                <button className={ style["traders__actions-sell"] }>Sell</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}