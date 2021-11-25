import { doc, getDocs, updateDoc, collection, query, orderBy, limit } from "firebase/firestore";

import { database } from "../config/firebase";


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

const _transformWeaponsData = (data) => {
    const newData = [];
    data.forEach(item => {
        newData.push({
            id: item.id,
            title: item.data().title,
            imgURL: item.data().imgURL,
            price: item.data().price,
        })
    })
    return newData;
}

const _setRandomFieldOnFirestoreDB = (records) => {
    const recordsID = records.map(record => {
        return record.id
    })
    recordsID.forEach(id => {
        const docRef = doc(database, "items", id);
        updateDoc(docRef, {
            random: _getRandomIDForFirestoreRecord()
        });

    })
}


export const getAllWeaponsFromFirestore = async(quality) => {
    const weaponsFromDB = await _getRandomDocFromFirebaseDB("items", quality);
    const weapon = await _transformWeaponsData(weaponsFromDB);
    _setRandomFieldOnFirestoreDB(weapon);
    return weapon
}