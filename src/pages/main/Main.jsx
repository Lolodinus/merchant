import React from "react";

import { ItemsList } from "../../components/itemsList";

import style from "./main.module.scss";

export const Main = () => {
    return (
        <section className={ style.main }>
            <div className={ style.main__container }>
                <div className={ style.main__row }>
                    <ItemsList/>
                </div>
            </div>
        </section>
    )
}