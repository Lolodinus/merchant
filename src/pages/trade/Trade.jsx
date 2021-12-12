import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Routes,
	Route
  } from "react-router-dom";

import { SidebarTraders } from "../../components/sidebarTraders";
import { UserActionPanel } from "../../components/userActionPanel";
import { Trader } from "../trader";
import { links } from "../../const/pageLinks";
import { shopItemsActions } from "../../store/shopItems";

import style from "./trade.module.scss";


export const Trade = () => {
    const dispatch = useDispatch();
    const { items } = useSelector((store) => store.items);
    const { traders } = useSelector((store) => store.traders);

    useEffect(() => {
        if ( items.length <= 0 && traders && traders.length > 0) {
            dispatch(shopItemsActions.fetchItems(10, traders));
        }
        // eslint-disable-next-line
    }, [dispatch, traders])

    return (
        <section className={ style.trade }>
            <div className={ style.trade__container }>
                <div className={ style.trade__row }>
                    <div className={ style.trade__left }>
                        <Routes>
                            <Route path="" element={ <span  className={ style.trade__img }/> } />
                            <Route path={ `:${ links.traderID }/*` } element={ <Trader/> } />
                        </Routes>
                        <UserActionPanel/>
                    </div>
                    <SidebarTraders/>
                </div>
            </div>
        </section>
    )
}