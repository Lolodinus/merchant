import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Trader } from "../../components/trader";
import { tradersActions } from "../../store/traders";

import style from "./sidebarTraders.module.scss";


export const SidebarTraders = () => {
    const dispatch = useDispatch();
    const { traders } = useSelector((store) => store.traders);

    useEffect(() => {
        if (traders.length <= 0) {
            dispatch(tradersActions.fetchTraders(3));
        }
        // eslint-disable-next-line
    }, [])

    const selectTrader = (id) => {
        dispatch(tradersActions.setActiveTrader(id));        
    }

    return (
        <section className={ style.traders }>
            <div className={ style.traders__container }>
                <div className={ style.traders__row }>
                    <h2 className={ style.traders__header }>
                        Traders
                    </h2>
                    <div className={ style.traders__list }>
                        {
                            traders && traders.length > 0
                                ? traders.map(trader => {
                                    return <Trader 
                                                trader={trader}
                                                selectTrader={selectTrader}
                                                key={trader.id}
                                            />
                                })
                                : null
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}