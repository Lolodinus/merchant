import React from "react";

import style from "./userActionPanel.module.scss";


export const UserActionPanel = () => {
    return (        
        <div className={ style["user-actions"] }>
            <div className={ style["user-actions__container"] }>
                <div className={ style["user-actions__row"] }>
                    <button className={ style["user-actions__btn"] }>
                        Завершить день
                    </button>
                </div>
            </div>
        </div>
    )
}