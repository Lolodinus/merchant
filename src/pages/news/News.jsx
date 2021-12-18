import React from "react";
import { useSelector } from "react-redux";

import { UserActionPanel } from "../../components/userActionPanel";

import style from "./news.module.scss";


export const News = () => {
    const { bagItemsCount } = useSelector((store) => store.bag);

    return (
        <section className={ style.news }>
            <div className={ style.news__container }>
                <div className={ style.news__row }>
                    <h2 className={ style.news__title }>
                        News
                    </h2>
                    <ul className={ style.news__list }>
                        <li className={ style.news__item }>
                            <p className={ style.news__discription }>
                                Ничего не произошло...
                            </p>
                            <div className={ style.news__action }>
                                <div className={ style["news__action-item"] }>
                                    <span  className={ style["news__day-icon"] }/> 20
                                </div>
                                <div className={ style["news__action-item"] }>
                                    <span  className={ style["news__money-icon"] }/> 20 
                                </div>
                                <div className={ style["news__action-item"] }>
                                    <span  className={ style["news__backpack-icon"] }/> { bagItemsCount }
                                </div>
                            </div>
                        </li>
                    </ul>
                    
                    <UserActionPanel/>
                </div>
            </div>
        </section>
    )
}