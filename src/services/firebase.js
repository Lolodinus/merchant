import { doc, getDoc, getDocs, updateDoc, collection, query, orderBy, limit } from "firebase/firestore";

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

export const _getRandomIDForFirestoreRecord = () => {
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

export async function getDocById(tableDB, recordId) {
    const docRef = doc(database, tableDB, recordId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = await docSnap.data();
        return data;
    } else {
        console.log(`No such document! Table: ${tableDB}, ID: ${recordId}`);
    }
}

export async function transformRef(items, ...refFields) {
    let newData = [];

    async function getDataRef(ref) {
        const refSnap = await getDoc(ref);

        return {
            id: refSnap.id,
            ...refSnap.data()
        }
    }
    for (let item of items) {
        let transformItem = {
            ...item
        }
        for(let field of refFields) {
            transformItem = {
                ...transformItem,
                [field]: await getDataRef(item[field])
            }
        }
        newData.push(transformItem);
    }
    return newData;
}