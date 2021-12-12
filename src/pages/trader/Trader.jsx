import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Routes,
	Route,
    useParams,
    Navigate
  } from "react-router-dom";

import { Buy } from "../buy";
import { Sell } from "../sell";
import { tradersActions } from "../../store/traders";
import { links } from "../../const/pageLinks";

import style from "./trader.module.scss";


export const Trader = () => {
    const dispatch = useDispatch();
    const { traderID } = useParams();
    const { traders } = useSelector((store) => store.traders);

    useEffect(() => {
        dispatch(tradersActions.setActiveTrader(traderID));
    }, [dispatch, traderID])

    // trader don't exist => redirect to main page
    if ( 
        traders.filter(trader => {
            return trader.id === traderID ? true : false;
        }).length === 0 
    ) {
        return (
            <Routes>
                <Route path="*" element={ <Navigate to={ links.news } /> }/>
            </Routes>
        )
    }

    return (
        <>
            <Routes>
                <Route path={ links.sell } element={ <Sell/> } />
                <Route path={ links.buy } element={ <Buy/> } />
            </Routes>
        </>
    )
}