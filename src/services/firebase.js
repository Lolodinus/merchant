import { doc, getDocs, updateDoc, collection, query, orderBy, limit } from "firebase/firestore";

import { database } from "../config/firebase";

// eslint-disable-next-line
const _getAllDocsFromFirestore = async(tableDB) => {
    const docsQuery = await query(collection(database, tableDB));
    return await getDocs(docsQuery);
}

export const getRandomDocFromFirebaseDB = async(tableDB, docsLimit) => {
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

export const setRandomFieldOnFirestoreDB = (records, tableDB) => {
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