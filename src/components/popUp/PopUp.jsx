import React from "react";

import style from "./popUp.module.scss";

export const PopUp = ({children, active, setActive}) => {

    return (
        <div className={ style.popup }>
            <div 
                className={ active ? `${style.popup__wrapper} ${style._active}` : style.popup__wrapper }
                onClick={setActive ? () => setActive(false) : null}
            >
                <div 
                    className={ active ? `${style.popup__content} ${style._active}` : style.popup__wrapper }
                    onClick={e => e.stopPropagation()}
                >
                    { children  }
                </div>
            </div>
        </div>
    )
}