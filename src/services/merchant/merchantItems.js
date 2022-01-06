import { doc, getDocs, collection, query, where, orderBy, limit } from "firebase/firestore";

import { database } from "../../config/firebase";
import { getRandomDocFromFirebaseDB, setRandomFieldOnFirestoreDB, transformRef} from "../firebase";


export async function getItemsFromFirestore (quality, ...extraData) {
    const itemsFromDB = await getRandomDocFromFirebaseDB("items", quality);
    const items = await _transformWeaponsData(itemsFromDB, ...extraData);
    setRandomFieldOnFirestoreDB(items, "items");
    return await transformRef(items, "category");
    // return items
}

export async function getTraderItemsFromFirestore (quality, traderCategoryId, ...extraData) {
    const itemsFromDB = await getItemByCategory(traderCategoryId, quality);
    const items = await _transformWeaponsData(itemsFromDB, ...extraData);
    setRandomFieldOnFirestoreDB(items, "items");
    return await transformRef(items, "category");
}

const _transformWeaponsData = async(data, ...extraData) => {
    let newData = [];
    data.forEach(item => {
        let transformItem = {
            id: item.id,
            title: item.data().title,
            imgURL: item.data().imgURL,
            price: item.data().price,
            category: item.data().category,
        }
        if (extraData) {
            for (let extraItem of extraData) {
                transformItem = {
                    ...transformItem,
                    ...extraItem
                }
            }
        }
        newData.push(transformItem);
    });
    return newData;
}

async function getItemByCategory(categoryId, itemLimit) {
    const categoryRef = await doc(database, "category", categoryId);
    const itemRef = await collection(database, "items");
    const queryItemRef = await query(itemRef, where("category", "==", categoryRef), orderBy("random"), limit(itemLimit));
    return await getDocs(queryItemRef);
}