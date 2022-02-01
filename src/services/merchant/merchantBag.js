import { randomItemPrice } from "./merchantEvent";


export async function getRandomBagItemId(bagItems, count) {
    count = Math.abs(count);
    let randomItemId = [];
    const bagItemsQuantity = bagItems.map(
        item => item.quantity
    ).reduce((a, b) => {
        return a + b;
    });
    count = count > bagItemsQuantity ? bagItemsQuantity : count;
    while (randomItemId.length < count) {
        const randomNumber = Math.floor(Math.random() * ((bagItems.length - 1) - 0 + 1)) + 0;
        randomItemId.push(bagItems[randomNumber].id);
        if (bagItems[randomNumber].quantity > 1) {
            bagItems = [
                ...bagItems,
                {
                    ...bagItems[randomNumber],
                    quantity: bagItems[randomNumber].quantity - 1,
                }
            ]
        } else {
            bagItems = [
                ...bagItems.slice(0, randomNumber),
                ...bagItems.slice(randomNumber + 1),
            ]
        }
    }
    return randomItemId;
}

function returnEqualItemFromArr(checkedItem, arrItems) {
    const equalItem = arrItems.filter(traderItem => traderItem.id === checkedItem.id ? true : false);
    return equalItem.length > 0 ? equalItem[0] : false;
}


export function setNewPriceForitem(bagItems, traderItems) {
    const transformBagItems = bagItems.map(item => {
        const equalTraderItem = returnEqualItemFromArr(item, traderItems);
        if(equalTraderItem) {
            return {
                ...item,
                newPrice: equalTraderItem.newPrice
            };
        } else {
            return {
                ...item,
                newPrice: randomItemPrice(item.price)
            };
        }
    })
    return transformBagItems;
}