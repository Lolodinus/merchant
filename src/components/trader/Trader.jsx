import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { links } from "../../const/pageLinks";

import style from "./trader.module.scss";


export const Trader = ({trader, selectTrader}) => {
    const { activeTrader } = useSelector((store) => store.traders);

    return (
        <div className={ `${style.traders__item} ${trader.id === activeTrader ? style._active : ""}` }>
            <div 
                className={ style.traders__avatar }
            >
                <Link className={ style["traders__avatar-link"] } to={ `${ trader.id }${ links.buy }` } >                    
                    <img src={ trader.imgURL } alt={ trader.name } />
                </Link>
            </div>
            <h3 
                className={ style.traders__title }
            >
                <Link className={ style["traders__title-link"] } to={ `${ trader.id }${ links.buy }` } >
                    { trader.name }
                </Link>
            </h3>
            <p className={ style.traders__discription }></p>
            <div className={ style.traders__actions }>
                <Link 
                    to={ `${ trader.id }${ links.buy }` } 
                    className={ style["traders__actions-buy"] }
                >
                    Byu
                </Link>
                <Link 
                    to={ `${ trader.id }${ links.sell }` }
                    className={ style["traders__actions-sell"] }
                >
                    Sell
                </Link>
            </div>
        </div>
    )
}