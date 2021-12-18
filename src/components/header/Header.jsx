import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { links } from "../../const/pageLinks";

import style from "./header.module.scss";


export const Header = () => {
    const { bagItemsCount } = useSelector((store) => store.bag);
    const { money, day } = useSelector((store) => store.game);

    return (
        <header className={ style.header }>
            <div className={ style.header__container }>
                <div className={ style.header_row }>
                    <div className={ style.header_left }>
                        <div className={ style.header__days }>
                            <span  className={ style["header__days-icon"] }/>
                            { day }
                        </div>
                        <div className={ style.header__money }>
                            <span className={ style["header__money-icon"] }/>
                            { money }
                        </div>
                    </div>
                    <div className={ style.header_center }>
                        <Link className={ style["header_logo-link"] } to={ links.main }>
                            Merchant
                        </Link>
                    </div>
                    <div className={ style.header_right }>
                        <div className={ `${ style.header__bag } ${ style.bag}` }>
                            <Link className={ style.bag__link } to={ links.bag }>
                                <span className={ style.bag__icon }/>
                                { bagItemsCount }/10
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}