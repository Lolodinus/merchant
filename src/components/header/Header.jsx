import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CSSTransition } from 'react-transition-group';

import { Menu } from "../";
import { links } from "../../const/pageLinks";
import { useAnimate } from "../../hooks"

import style from "./header.module.scss";


export const Header = () => {
    const { bagItemsCount } = useSelector((store) => store.bag);
    const { money, day } = useSelector((store) => store.game);
    
    // set animation
    const {state: bagState, ref: bagRef, setState: setBagState} = useAnimate(bagItemsCount);
    const {state: dayState, ref: dayRef, setState: setDayState} = useAnimate(day);
    const {state: moneyState, ref: moneyRef, setState: setMoneyState} = useAnimate(money);

    // open menu
    const [activeMenu, setActiveMenu] = useState(false);

    return (
        <header className={ style.header }>
            <div className={ style.header__container }>
                <div className={ style.header_row }>
                    <div className={ style.header_left }>
                        <CSSTransition
                            in={ dayState } 
                            timeout={400}
                            nodeRef={dayRef}
                            classNames={{
                                enter: style["_animate-enter"],
                                enterActive: style["_animate-enter-active"],
                                enterDone: style["_animate-enter-done"],
                            }}
                            onEntered={() => {
                                setDayState(false);
                            }}
                        >
                            <div className={ style.header__days } ref={dayRef}>
                                <span  className={ style["header__days-icon"] }/>
                                { day }
                            </div>
                        </CSSTransition>
                        <CSSTransition
                            in={ moneyState } 
                            timeout={400}
                            nodeRef={moneyRef}
                            classNames={{
                                enter: style["_animate-enter"],
                                enterActive: style["_animate-enter-active"],
                                enterDone: style["_animate-enter-done"],
                            }}
                            onEntered={() => {
                                setMoneyState(false);
                            }}
                        >
                            <div className={ style.header__money } ref={moneyRef}>
                                <span className={ style["header__money-icon"] }/>
                                { money }
                            </div>
                        </CSSTransition>
                    </div>
                    <div className={ style.header_center }>
                        <Link className={ style["header_logo-link"] } to={ links.main } >
                            Merchant
                        </Link>
                    </div>
                    <div className={ style.header_right }>
                        <div className={ `${ style.header__bag } ${ style.bag}` } >
                            <CSSTransition
                                in={ bagState } 
                                timeout={400}
                                nodeRef={bagRef}
                                classNames={{
                                    enter: style["_animate-enter"],
                                    enterActive: style["_animate-enter-active"],
                                    enterDone: style["_animate-enter-done"],
                                }}
                                onEntered={() => {
                                    setBagState(false);
                                }}
                            >
                                <Link className={ style.bag__link } to={ links.bag } ref={bagRef}>
                                    <span className={ style.bag__icon }/>
                                    { bagItemsCount }/10
                                </Link>
                            </CSSTransition>
                        </div>
                        <div className={ style.header__menu }>
                            <button className={ style["header__menu-btn"] } onClick={() => {setActiveMenu(!activeMenu)}}>
                                <span className={ style["header__menu-icon"] }/>
                            </button>
                        </div>                            
                        <div className={ style["header__menu-body"] }>
                            <Menu activeMenu={activeMenu}/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}