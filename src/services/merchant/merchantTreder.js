import { getDoc } from "firebase/firestore";

import { getRandomDocFromFirebaseDB, setRandomFieldOnFirestoreDB, getDocById, transformRef} from "../firebase";
import { getTraderItemsFromFirestore } from "./merchantItems";


export async function getTradersFromFirestoreDB (quality) {
    const tradersFromDB = await getRandomDocFromFirebaseDB("traders", quality);
    const traders = await _transformTradersData(tradersFromDB);
    setRandomFieldOnFirestoreDB(traders, "traders");
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
    return items;
}

export async function getTraderItem(quality, traderCatgoryId, trader) {
    return getTraderItemsFromFirestore(quality, traderCatgoryId, {trader});
}

export async function getTraderCategoryRefByTraderId(traderId) {
    if (traderId){
        const traderData = await getDocById("traders", traderId);
        const categorySnap = await getDoc(traderData.category);
        const category = {
            id: categorySnap.id,
            title: categorySnap.data().title,
        }
        return category
    }
}