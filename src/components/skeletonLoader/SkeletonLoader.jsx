import React from "react";

import { SkeletonItem } from "./skeletonItem";
import { SkeletonBagItem } from "./skeletonBagItem";
import { SkeletonTrader } from "./skeletonTrader";

import style from "./skeletoneLoader.module.scss";

export const SkeletonLoader = ({ quantity, type }) => {

    const chooseSkeletonItem = (type, id) => {
        switch(type) {
            case "item-list":
                return <SkeletonItem key={id}/>
            case "bag-list":
                return <SkeletonBagItem key={id}/>
            case "trader-list":
                return <SkeletonTrader key={id}/>
            default:
                return null
        }
    }

    const setSkeletonItems = (quantity = 1, type) => {
        let skeletons = []
        for(let i = 0; i < quantity; i++) {
            skeletons.push(
                chooseSkeletonItem(type, i)
            );
        }
        return skeletons;
    }

    return (
        <div className={ `${style["skeleton-loader"]} ${style[type]}` }>
            { quantity && setSkeletonItems(quantity, type).map(item => {return item}) }
        </div>
    )
}