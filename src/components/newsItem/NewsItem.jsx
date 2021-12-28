import React from "react";
import { useEffect, useState } from "react";

import { findActionWord } from "../../services/merchant";

import style from "./newsItem.module.scss";


export const NewsItem = ({news}) => {
    const {event, dayInfo} = news;

    return(
        <li className={ style["news-item"] }>
            <div 
                className={ style["news-item__discription"] }
            >
                <RenderNewsDescription event={event} />
            </div>
            <div className={ style["news-item__info"] }>
                <div className={ style["news-item__info-item"] }>
                    <span  className={ style["news-item__day-icon"] }/> { dayInfo.day || 0 }
                </div>
                <div className={ style["news-item__info-item"] }>
                    <span  className={ style["news-item__money-icon"] }/> { dayInfo.money || 0 }
                </div>
                <div className={ style["news-item__info-item"] }>
                    <span  className={ style["news-item__backpack-icon"] }/> { dayInfo.bagItems || 0 }
                </div>
            </div>
        </li>
    )
}


const RenderNewsDescription = ({event}) => {
    let [transformText, setTransformText] = useState();
    
    useEffect(() => {
        setTransformText(findActionWord(event));
    }, [event])

    return (
        <>
            {
                transformText && transformText.length > 0
                    ? transformText.map( (fragment, index) => {
                        if (typeof fragment === 'string' || fragment instanceof String) {
                            return fragment
                        }
                        switch(fragment.title) {
                            case "money":
                                return <ItemTag itemType={"money"} itemQuantity={fragment.value} key={index}/>;
                            case "day":
                                return <ItemTag itemType={"day"} itemQuantity={fragment.value} key={index}/>;
                            case "bagItem":
                                return <ItemTag itemType={"bagItem"} itemQuantity={fragment.value} key={index}/>;
                            default:
                                return fragment;
                        }
                    })
                : null
            }
        </>
    )
    
}

const ItemTag = ({itemType, itemQuantity}) => {
    const tag = {
        money: "_money-icon",
        bagItem: "_bag-item-icon",
        day: "_day-icon",
    }

    return (        
        <div 
            className={ 
                itemQuantity < 0
                    ? style["item__discription__tag"]
                    : `${ style["item__discription__tag"] } ${style["_add"]} }`
            }
        >
            { itemQuantity }                    
            <span 
                className={ 
                    itemQuantity < 0   
                        ? `${ style["item__discription__tag-icon"]} ${style[tag[itemType]]}`
                        : `${ style["item__discription__tag-icon"]} ${style[tag[itemType]]} ${style["_add"]}`
                }
            />
        </div>
    )    

}