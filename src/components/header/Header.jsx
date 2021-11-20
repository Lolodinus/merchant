import React from "react";

import style from "./header.module.scss";


export const Header = () => {
    return (
        <header className={ style.header }>
            <div className={ style.header__container }>
                <div className={ style.header_row }>
                    <div className={ style.header_left }></div>
                    <div className={ style.header_center }>Merchant</div>
                    <div className={ style.header_right }></div>
                </div>
            </div>
        </header>
    )
}