import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { gameActions } from "../../store/game";

import style from "./userActionPanel.module.scss";


export const UserActionPanel = () => {
    const dispatch = useDispatch();
    const { money } = useSelector((store) => store.game);

    const endDay = () => {
        if (money > -100 ) {
            dispatch(gameActions.getNewEvent());
            dispatch(gameActions.nextDay());
        }
    }

    return (        
        <div className={ style["user-actions"] }>
            <div className={ style["user-actions__container"] }>
                <div className={ style["user-actions__row"] }>
                    <button
                        className={ style["user-actions__btn"] }
                        onClick={ endDay }
                    >
                        Завершить день
                    </button>
                </div>
            </div>
        </div>
    )
}