import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";

import { SidebarTraders, UserActionPanel } from "../../components";
import { Trader } from "../trader";
import { links } from "../../const/pageLinks";
import { tradersActions } from "../../store/traders";

import style from "./trade.module.scss";


export const Trade = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { traders, loading, error } = useSelector((store) => store.traders);    

    useEffect(() => {
        if (traders.length <= 0 && !loading && !error) {
            dispatch(tradersActions.fetchTraders(3));
        }
        // eslint-disable-next-line
    }, [traders])

    useEffect(() => {
        if (error) {
            navigate(links.error, {state: error})
        }
        // eslint-disable-next-line
    }, [error])

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