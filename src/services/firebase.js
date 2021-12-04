import { doc, getDocs, updateDoc, collection, query, orderBy, limit } from "firebase/firestore";

import { database } from "../config/firebase";

// eslint-disable-next-line
const _getAllDocsFromFirestore = async(tableDB) => {
    const docsQuery = await query(collection(database, tableDB));
    return await getDocs(docsQuery);
}

const _getRandomDocFromFirebaseDB = async(tableDB, docsLimit) => {
    const docsRef = await collection(database, tableDB);
    const queryRef = await query(docsRef, orderBy("random"), limit(docsLimit));
    return await getDocs(queryRef);
}

const _getRandomIDForFirestoreRecord = () => {
    let autoId = '';
    const targetLength = 20;
    while (autoId.length < targetLength) {
        let randomNum = Math.floor(Math.random() * 10) + 1;
        if (randomNum === 0 ) {
            if (autoId && autoId.length) {
                autoId += randomNum;
            }
        } else {
            autoId += randomNum;
        }
    }
    return +autoId;
}

const _transformWeaponsData = (data, trader) => {
    const newData = [];
    data.forEach(item => {
        newData.push({
            id: item.id,
            title: item.data().title,
            imgURL: item.data().imgURL,
            price: item.data().price,
            trader
        })
    })
    return newData;
}

const _transformTradersData = (data) => {
    const newData = [];
    data.forEach(item => {
        newData.push({
            id: item.id,
            name: item.data().name,
            imgURL: item.data().imgURL,
        })
    })
    return newData;
}


const _setRandomFieldOnFirestoreDB = (records, tableDB) => {
    const recordsID = records.map(record => {
        return record.id
    })
    recordsID.forEach(id => {
        const docRef = doc(database, tableDB, id);
        updateDoc(docRef, {
            random: _getRandomIDForFirestoreRecord()
        });

    })
}


export const getItemsFromFirestore = async(quality, trader) => {
    const itemsFromDB = await _getRandomDocFromFirebaseDB("items", quality);
    const items = await _transformWeaponsData(itemsFromDB, trader);
    _setRandomFieldOnFirestoreDB(items, "items");
    return items
}

export const getTradersFromFirestoreDB = async(quality) => {
    const tradersFromDB = await _getRandomDocFromFirebaseDB("traders", quality);
    const traders = await _transformTradersData(tradersFromDB);
    _setRandomFieldOnFirestoreDB(traders, "traders");
    return traders
}

export const setItemsToTraders = async(count, traders) => {
    let items = [];
    for(let trader of  traders) {
        const firebaseItems = await getItemsFromFirestore(count, trader.id);
        items.push(...firebaseItems);
    }
    return items;
}
