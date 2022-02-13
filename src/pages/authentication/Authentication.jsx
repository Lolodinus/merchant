import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	Routes,
	Route,
    useLocation,
    Navigate
} from "react-router-dom";

import { Login, Registration } from "../";
import { links } from "../../const/pageLinks";
import { userActions } from "../../store/user";

import style from "./authentication.module.scss";


export const Authentication = () => {
    const location = useLocation();

    const dispatch = useDispatch();
    const { login } = useSelector((store) => store.user);

    const redirect = (login) => {
        if ( location.pathname === links.autentification ) {
            if (login) {            
                dispatch(userActions.logout());            
                return <Route path="*" element={ <Navigate to={ links.main } /> }/>
            } else {
                return <Route path="*" element={ <Navigate to={`${location.pathname}${links.login}`} /> }/>
            }
        }
    }

    return (
        <div className={ style.autentification }>
            <div className={ style.autentification__container }>
                <div className={ style.autentification__row }>                    
                    <Routes>
                        <Route path={ links.login } element={ <Login /> } />
                        <Route path={ links.registration } exact element={ <Registration /> } />
                        { redirect(login) }
                    </Routes>
                </div>
            </div>
        </div>
    )
}