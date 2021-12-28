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