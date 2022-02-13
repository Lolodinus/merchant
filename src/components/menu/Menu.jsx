import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { links } from "../../const/pageLinks";

import style from "./menu.module.scss";

export const Menu = ({activeMenu}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { login } = useSelector((store) => store.user);
    
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(activeMenu);
    }, [activeMenu])


    const gameOver = async() => {
        dispatch({type: "GAME_RESET"});
        navigate(links.main);
    }

    return (
        <div className={ isOpen ? `${style.menu} ${style._active}` : style.menu }>
            <div className={ style.menu__container }>
                <div className={ style.menu__row }>
                    <ul className={ style.menu__list }>
                        <Link 
                            className={ style.menu__item }
                            to={ links.autentification }
                            onClick={() => {setIsOpen(false)}}
                        > 
                            { login ? "Выйти" : "Войти" }
                        </Link>
                        <li 
                            className={ style.menu__item }                            
                            onClick={() => {
                                setIsOpen(false)
                                gameOver();
                            }}
                        >
                            Закончить игру
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}