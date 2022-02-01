import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Routes,
	Route,
    useParams,
    Navigate,
    useNavigate
  } from "react-router-dom";

import { Buy } from "../buy";
import { Sell } from "../sell";
import { tradersActions } from "../../store/traders";
import { shopItemsActions } from "../../store/shopItems";
import { links } from "../../const/pageLinks";
import { getTraderCategoryRefByTraderId } from "../../services/merchant";

// eslint-disable-next-line
import style from "./trader.module.scss";


export const Trader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { traderID } = useParams();
    const { items } = useSelector((store) => store.items);
    const { traders } = useSelector((store) => store.traders);

    const setActiveTrader = async(traderID) => {
        try {
            const trader = await {
                id: traderID,
                category: await getTraderCategoryRefByTraderId(traderID),
            }
            dispatch(tradersActions.setActiveTrader(trader));
        } catch(error) {
            navigate(links.error, {state:{
                title: error.code,
                discription: error.message,
            }})
        }
    }

    useEffect(() => {
        if(traderID) {
            setActiveTrader(traderID);
        }
        // eslint-disable-next-line
    }, [traderID])

    
    useEffect(() => {
        if ( items.length <= 0 && traders && traders.length > 0) {
            dispatch(shopItemsActions.fetchItems(10, traders));
        }
        // eslint-disable-next-line
    }, [dispatch, traders])

    // trader don't exist => redirect to main page
    if ( 
        traders.filter(trader => {
            return trader.id === traderID ? true : false;
        }).length === 0 
    ) {
        return (
            <Routes>
                <Route path="*" element={ <Navigate to={ links.trade } /> }/>
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