import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { bagActions } from "../../store/bag";

import { BagItem } from "../../components/bagItem";

import style from "./bag.module.scss";


export const Bag = () => {

    const dispatch = useDispatch();
    const { bagItems } = useSelector((store) => store.bag);

    useEffect(() => {
        if (bagItems && bagItems.length > 0) {
            dispatch(bagActions.setBagItems(bagItems));
        }
        // eslint-disable-next-line
    }, [])
    
    const getEmptyCell = (items=0) => {
        let emptyCell = [];
        for (let i = 0; i < 10 - items; i++) {
            emptyCell.push({
                id: i
            });
        }
        return emptyCell;
    } 
    
    const deleteItems = (id) => {
        dispatch(bagActions.deleteItemToBag(id));
    }

    return (
        <section className={ style.bag }>
            <div className={ style.bag__container }>
                <h2 className={ style.bag__header }>
                    Bag
                </h2>
                <div className={ style.bag__list }>
                    {
                        bagItems && bagItems.length > 0
                            ? bagItems.map(item => {
                                return (                                    
                                    <BagItem item={item} deleteItem={deleteItems} key={ item.id } />
                                )
                            })
                            : null
                    }
                    {
                        getEmptyCell(bagItems.length).map(item => {
                            return(
                                <BagItem item={item} deleteItem={deleteItems} empty={ true } key={ item.id } />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}