export function findActionWord(event) {
    const text = event.hasOwnProperty("text") ? event.text : undefined;
    const money = event.hasOwnProperty("money") ? event.money : undefined;
    const bagItem = event.hasOwnProperty("bagItem") ? event.bagItem : undefined;
    const day = event.hasOwnProperty("day") ? event.day : undefined;

    const actionWordReg = /(money|bagItem|day)/gi;
    const brokenText = text.split(actionWordReg);
    const transformBrokenText = brokenText.map(fragment => {        
        switch(fragment) {
            case "money":
                let moneyFragment = {
                    title: fragment,
                    value: money[0],
                };
                if (money.length > 0) {
                    money.shift();
                }
                return moneyFragment;
            case "day":
                let dayFragment = {
                    title: fragment,
                    value: day[0],
                };
                if (day.length > 0) {
                    day.shift();
                }
                return dayFragment;
            case "bagItem":
                let itemFragment = {
                    title: fragment,
                    value: bagItem[0],
                };
                if (bagItem.length > 0) {
                    bagItem.shift();
                }
                return itemFragment;
            default:
                return fragment;
        }
    });
    return transformBrokenText;
}