import React from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { links } from "../../const/pageLinks";

import style from "./error.module.scss";


export const Error = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let errorTitle = location.state && location.state.title ? location.state.title : undefined;
    let errorDiscription = location.state && location.state.discription ? location.state.discription : undefined;

    useEffect(() => {
        if (!location.state) {            
            navigate(links.main);
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {
                location.state && <div className={ style.error }>
                <div className={ style.error__container }>
                    <div className={ style.error__wrapper }>
                        <div className={ style.error_banner }>
                            <span/>ERROR
                        </div>
                        <div className={ style.error__info }>
                            <h3 className={ style.error_title }>
                                { errorTitle ? errorTitle : "Error" }
                            </h3>
                            <p className={ style.error_description }>
                                { errorDiscription ? errorDiscription : "Something don't working" }
                            </p>                        
                            <Link className={ style.error_link } to={ links.main }>
                                Вернутся домой
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}