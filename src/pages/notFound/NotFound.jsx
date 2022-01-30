import React from "react";

import style from "./notFound.module.scss";


export const NotFound = () => {
    return (
        <div className={ style["not-found"] }>
            <div className={ style["not-found__container"] }>
                <div className={ style["not-found__row"] }>
                    <div className={ style["not-found__body"] }>
                        <div className={ style["not-found__title"] }>
                            404 ERROR
                        </div>
                        <div className={ style["not-found__discription"] }>
                            Этой страницы не существует...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}