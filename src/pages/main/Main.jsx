import React from "react";
import { Link } from "react-router-dom";

import { SidebarTraders } from "../../components/sidebarTraders";
import { ItemsList } from "../../components/itemsList";

import style from "./main.module.scss";

export const Main = () => {
    return (
        <section className={ style.main }>
            <div className={ style.main__container }>
                <div className={ style.main__row }>
                    <div className={ style.navbar }>
                        <Link className={ style.navbar__link } to="/news">
                            News
                        </Link>
                        <Link className={ style.navbar__link } to="/trade">
                            Trade
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}