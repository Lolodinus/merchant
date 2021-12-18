import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { links } from "../../const/pageLinks";

import style from "./gameOver.module.scss";


export const GameOver = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newGame = async() => {
        await dispatch({type: "GAME_RESET"});
        navigate(links.main);
    }

    return (
        <div className={ style["game-over"] }>
            <span  className={ style["game-over__action-img"] }/>
            <div className={ style["game-over__right"] }>
                <h3 className={ style["game-over__title"] }>
                    GAME OVER
                </h3>
                <p className={ style["game-over__description"] }>
                    Хотите начать заново?
                </p>
                <button 
                    className={ style["game-over__btn"] }
                    onClick={() => newGame()}
                >
                    OK
                </button>
            </div>
        </div>
    )
}