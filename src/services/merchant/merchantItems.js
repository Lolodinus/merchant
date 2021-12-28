import { getRandomDocFromFirebaseDB, setRandomFieldOnFirestoreDB} from "../firebase";


export async function getItemsFromFirestore (quality, ...extraData) {
    const itemsFromDB = await getRandomDocFromFirebaseDB("items", quality);
    const items = await _transformWeaponsData(itemsFromDB, ...extraData);
    setRandomFieldOnFirestoreDB(items, "items");
    return items
}

const _transformWeaponsData = (data, ...extraData) => {
    
    const newData = [];
    data.forEach(item => {
        let transformItem = {
            id: item.id,
            title: item.data().title,
            imgURL: item.data().imgURL,
            price: item.data().price,
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
    })
    return newData;
}