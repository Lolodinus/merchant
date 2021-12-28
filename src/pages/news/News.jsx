import React from "react";
import { useSelector } from "react-redux";

import { NewsItem, UserActionPanel } from "../../components";

import style from "./news.module.scss";


export const News = () => {
    const { news } = useSelector((store) => store.news);

    return (
        <section className={ style.news }>
            <div className={ style.news__container }>
                <div className={ style.news__row }>
                    <h2 className={ style.news__title }>
                        News
                    </h2>
                    <div className={ style.news__list }>
                        <div className={ style["news__list-wrapper"] }>
                            {
                                news && news.length > 0
                                    ? news.map((item, index) => {
                                        return (
                                            <NewsItem news={item} key={index}/>
                                        )
                                    }).slice().reverse()
                                    : null
                            }
                        </div>
                    </div>
                    <UserActionPanel/>
                </div>
            </div>
        </section>
    )
}