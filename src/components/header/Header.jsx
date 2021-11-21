import React from "react";

import style from "./header.module.scss";


export const Header = () => {
    return (
        <header className={ style.header }>
            <div className={ style.header__container }>
                <div className={ style.header_row }>
                    <div className={ style.header_left }>
                        <div className={ style.header__days }>
                            <span  className={ style["header__days-icon"] }/>
                            19
                        </div>
                        <div className={ style.header__money }>
                            <span className={ style["header__money-icon"] }/>
                            20
                        </div>
                    </div>
                    <div className={ style.header_center }>Merchant</div>
                    <div className={ style.header_right }>
                        <div className={ style.header__bag }>
                            <span className={ style["header__bag-icon"] }/>
                            0/10
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}