import React from "react";
import { useSelector } from "react-redux";

import { Trader, SkeletonLoader } from "../../components";

import style from "./sidebarTraders.module.scss";


export const SidebarTraders = () => {
    const { traders, loading } = useSelector((store) => store.traders);

    return (
        <section className={ style.traders }>
            <div className={ style.traders__container }>
                <div className={ style.traders__row }>
                    <h2 className={ style.traders__header }>
                        Traders
                    </h2>
                    {
                        loading
                            ? <SkeletonLoader quantity={3} type={"trader-list"}/>
                            : <div className={ style.traders__list }>
                                {
                                    traders && traders.length > 0
                                        ? traders.map(trader => {
                                            return <Trader 
                                                        trader={trader}
                                                        key={trader.id}
                                                    />
                                        })
                                        : null
                                }
                            </div>
                    }
                </div>
            </div>
        </section>
    )
}