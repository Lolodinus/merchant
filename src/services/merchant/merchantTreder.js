import { getDoc } from "firebase/firestore";

import { getRandomDocFromFirebaseDB, setRandomFieldOnFirestoreDB, getDocById, transformRef, updateRandomFields} from "../firebase";
import { getTraderItemsFromFirestore } from "./merchantItems";
import { randomNumber } from "../../utils";


export async function getTradersFromFirestoreDB (quality) {
    const randomFieldNumber = randomNumber(1, 3);
    const tradersFromDB = await getRandomDocFromFirebaseDB("traders", quality, `random.${randomFieldNumber}`);
    const traders = await _transformTradersData(tradersFromDB);
    if (updateRandomFields()) {
        setRandomFieldOnFirestoreDB(traders, "traders");
    }
    return await transformRef(traders, "category");
}

async function _transformTradersData(data) {
    const newData = [];
    data.forEach(item => {
        newData.push({
            id: item.id,
            name: item.data().name,
            imgURL: item.data().imgURL,
            category: item.data().category,
        })
    });
    return newData;
}

export async function setItemsToTraders(count, traders) {
    let items = [];
    for(let trader of  traders) {
        const firebaseItems = await getTraderItem(count, trader.category.id, trader.id);
        items.push(...firebaseItems);
    }
    return await setEqualItemPrice(items);
}

function setEqualItemPrice(traderItems) {
    const itemsWithEquqlPrice = [];
    for( let item of traderItems) {
        const equalItem = traderItems.filter(obj => {
            return obj.id === item.id ? true : false
        })
        if (equalItem.length > 0) {
            itemsWithEquqlPrice.push({
                ...item,
                newPrice: equalItem[0].newPrice
            })
        }
    };
    return itemsWithEquqlPrice;
}

export function getTraderItem(quality, traderCatgoryId, trader) {
    try {
        return getTraderItemsFromFirestore(quality, traderCatgoryId, {trader});
    } catch(error) {
        console.log(error);
    }
}

export async function getTraderCategoryRefByTraderId(traderId) {
    if (traderId){
        const traderData = await getDocById("traders", traderId);
        const categorySnap = await getDoc(traderData.category);
        if (!categorySnap.exists()) {
            throw new Error("Faild get trader category!")
        }            
        const category = {
            id: categorySnap.id,
            title: categorySnap.data().title,
        }
        return category
    }
}