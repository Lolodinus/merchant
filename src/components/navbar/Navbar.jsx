import React from "react";
import { Link } from "react-router-dom";

import { links } from "../../const/pageLinks";

import style from "./navbar.module.scss";


export const Navbar = () => {
    return (
        <section className={ style.navbar }>
            <div className={ style.navbar__container }>
                <div className={ style.navbar__row }>
                    <Link className={ style.navbar__link } to={ links.news }>
                        News
                    </Link>
                    <Link className={ style.navbar__link } to={ links.trade }>
                        Trade
                    </Link>
                </div>
            </div>
        </section>
    )
}