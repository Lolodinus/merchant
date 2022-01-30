import { doc, getDoc, getDocs, updateDoc, collection, query, orderBy, limit } from "firebase/firestore";

import { database } from "../config/firebase";
import { randomNumber } from "../utils";


// eslint-disable-next-line
const _getAllDocsFromFirestore = async(tableDB) => {
    const docsQuery = await query(collection(database, tableDB));
    return await getDocs(docsQuery);
}

export const getRandomDocFromFirebaseDB = async(tableDB, docsLimit, randomField="random") => {
    const docsRef = await collection(database, tableDB);
    const queryRef = await query(docsRef, orderBy(randomField), limit(docsLimit)); 
    const querySnapshot = await getDocs(queryRef); 
    if (querySnapshot.empty) {
        throw new Error(`Docs "${tableDB}" not exists in firebase`);
    }
    return querySnapshot;
}
export async function getDocById(tableDB, recordId) {
    const docRef = doc(database, tableDB, recordId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = await docSnap.data();
        return data;
    } else {
        throw new Error(`No such document! Table: "${tableDB}", ID: "${recordId}"`);
    }
}


// set random field
export function setRandomFieldOnFirestoreDB (records, tableDB) {
    const recordsID = records.map(record => {
        return record.id
    });
    recordsID.forEach(id => {
        _updateRandomField(tableDB, id);
    });
}
async function _updateRandomField(tableDB, id) {
    try {
        const docRef = await doc(database, tableDB, id);
        if (!checkDocRefExist(docRef)) {
            await updateDoc(docRef, {
                random: _getRandomIDForFirestoreRecord(3, 15, 20),
            });
        } else {
            throw new Error(`Doc "${tableDB}" with id "${id}" not exist`);
        }
    } catch(error) {
        console.log(error.message);
    }
}
function _getRandomIDForFirestoreRecord(subfieldQuantity, minTargetLength, maxTargetLengt) {
    let ranfomField = {};
    for (let i = 1; i < subfieldQuantity + 1; i++) {
        let autoId = '';
        const targetLength = 20;
        while (autoId.length < targetLength) {
            let randomNum = Math.floor(Math.random() * (maxTargetLengt - minTargetLength + 1)) + minTargetLength;
            if (randomNum === 0 ) {
                if (autoId && autoId.length) {
                    autoId += randomNum;
                }
            } else {
                autoId += randomNum;
            }
        }
        ranfomField = {
            ...ranfomField,
            [i]: +autoId,
        }
    }
    return ranfomField;
}


// transform
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

export function updateRandomFields() {
    const number = randomNumber(0, 10);
    return number === 5 ? true : false;
}


// check
export async function checkDocRefExist(docRef) {
    if (docRef.type === "document") {
        const docSnap = await getDoc(docRef);
        if (await docSnap.exists()) {
            return true;
        } else {
            return false;
        }
    } else if ((docRef.type === "collection")) {
        const docSnap = await getDocs(docRef);
        if (docSnap.empty) {
            return false
        } else {
            return true
        }
    } else {
        throw new Error(`Проверка ссылки с типо ${docRef.type} не удалась`);
    }    
}