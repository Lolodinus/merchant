import { doc, getDocs, collection, query, where, orderBy, limit } from "firebase/firestore";

import { database } from "../../config/firebase";
import { getRandomDocFromFirebaseDB, setRandomFieldOnFirestoreDB, transformRef, updateRandomFields, checkDocRefExist} from "../firebase";
import { randomNumber } from "../../utils";


export async function getItemsFromFirestore (quality, ...extraData) {
    const randomFieldNumber = randomNumber(1, 3);
    const itemsFromDB = await getRandomDocFromFirebaseDB("items", quality, `random.${randomFieldNumber}`);
    const items = await _transformWeaponsData(itemsFromDB, ...extraData);
    if (updateRandomFields()) {
        setRandomFieldOnFirestoreDB(items, "items");
    }
    return await transformRef(items, "category");
}

export async function getTraderItemsFromFirestore (quality, traderCategoryId, ...extraData) {
    const randomFieldNumber = randomNumber(1, 3);
    const itemsFromDB = await getItemByCategory(traderCategoryId, quality, `random.${randomFieldNumber}`);
    const items = await _transformWeaponsData(itemsFromDB, ...extraData);
    if (updateRandomFields()) {
        setRandomFieldOnFirestoreDB(items, "items");
    }
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
            category: item.data().category
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

async function getItemByCategory(categoryId, itemLimit, randomField="random") {
    try {
        const categoryRef = await doc(database, "category", categoryId);
        if (!(await checkDocRefExist(categoryRef))) {            
            throw new Error(`Category with id "${categoryId}" not exists in firebase`);
        }

        const itemRef = await collection(database, "items");
        if (!(await checkDocRefExist(itemRef))) {
            throw new Error(`Collection "items" not exists in firebase...`);
        }

        const queryItemRef = await query(itemRef, where("category", "==", categoryRef), orderBy(randomField), limit(itemLimit));
        const queryyItemSnapshot = await getDocs(queryItemRef);        
        if (queryyItemSnapshot.empty) {
            throw new Error(`Docs "items" or "category" not exists in firebase`);
        }
        return queryyItemSnapshot;
    } catch(error) {
        if (error.code === "failed-precondition") {
            throw new Error("This index not exist. The query requires an index.");
        } else {
            throw new Error(error.message)
        }
    }
}