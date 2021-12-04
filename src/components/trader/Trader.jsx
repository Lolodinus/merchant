import React from "react";
import { useSelector } from "react-redux";

import style from "./trader.module.scss";


export const Trader = ({trader, selectTrader}) => {
    const { activeTrader } = useSelector((store) => store.traders);

    return (
        <div className={ `${style.traders__item} ${trader.id === activeTrader ? style._active : ""}` }>
            <div 
                className={ style.traders__avatar }
                onClick={() => selectTrader(trader.id)}
            >
                <img src={ trader.imgURL } alt={ trader.name } />
            </div>
            <h3 
                className={ style.traders__title }                
                onClick={() => selectTrader(trader.id)}
            >
                { trader.name }
            </h3>
            <p className={ style.traders__discription }></p>
            <div className={ style.traders__actions }>
                <button className={ style["traders__actions-buy"] }>Byu</button>
                <button className={ style["traders__actions-sell"] }>Sell</button>
            </div>
        </div>
    )
}