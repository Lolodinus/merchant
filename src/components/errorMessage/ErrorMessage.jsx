import React from "react";

import style from "./errorMessage.module.scss";


export const ErrorMessage = ({message}) => {
    return (
        <div className={style["error-message"]}>
            {message}
        </div>
    )
}