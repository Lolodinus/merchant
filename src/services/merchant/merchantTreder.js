import { getRandomDocFromFirebaseDB, setRandomFieldOnFirestoreDB} from "../firebase";
import { getItemsFromFirestore } from "./merchantItems";


export async function getTradersFromFirestoreDB (quality) {
    const tradersFromDB = await getRandomDocFromFirebaseDB("traders", quality);
    const traders = await _transformTradersData(tradersFromDB);
    setRandomFieldOnFirestoreDB(traders, "traders");
    return traders;
}

function _transformTradersData(data) {
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

export async function setItemsToTraders(count, traders) {
    let items = [];
    for(let trader of  traders) {
        const firebaseItems = await getTraderItem(count, trader.id);
        items.push(...firebaseItems);
    }
    return items;
}

export async function getTraderItem(quality, trader) {
    return getItemsFromFirestore(quality, {trader});
}