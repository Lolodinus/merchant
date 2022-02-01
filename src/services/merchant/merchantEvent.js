import { randomNumber } from "../../utils";


const event = [
    {
        eventName: "Обычный день в дороге",
        text: "Ничего не произошло... Вы успешно добрались до следующего города. В пути было потрачено money.",
        money: [-20]
    },
    {
        eventName: "Пьянка",
        text: "Сегодня вы решили никуда не ехать и как следует напиться в кабаке money. На следующий день у вас весь день раскалывалась голова. Какая там торговля day money.",
        money: [-50, -20],
        day: [1]
    },
    {
        eventName: "Погоня",
        text: "В пути на вас напали разбойники. Вам удалось сбежать, но вы потеряли несколько товаров bagItem.",
        bagItem: [1],
    },
    {
        eventName: "Тихая кража",
        text: "Во сне в разбитом лагере на опушке леса вас кто-то ограбили. К счастью вещи в рюкзаке не были тронуты, но вот с кошельком на поясе пришлось попрощатся money.",
        money: [-120],
    },
]

export async function getEvent() {
    let event = await _randomEvent();
    return await normalizeEventData(event);
}

async function _randomEvent() {
    const randomNumber = Math.floor(Math.random() * (10 - 0 + 1)) + 0;

    switch(randomNumber) {
        case 8:
            return event.filter(
                    event => {
                        return event.eventName === "Пьянка" ? true : false
                    } 
                )[0];
        case 9:
            return event.filter(
                    event => {
                        return event.eventName === "Погоня" ? true : false
                    } 
                )[0];
        case 10:
            return event.filter(
                    event => {
                        return event.eventName === "Тихая кража" ? true : false
                    } 
                )[0];
        default:
            return event.filter(
                    event => {
                        return event.eventName === "Обычный день в дороге" ? true : false
                    } 
                )[0]; 
    }

}

function normalizeEventData(event) {
    return {
        ...event,
        ...(event.money ? {money: {...event.money}} : null),
        ...(event.bagItem ? {bagItem: {...event.bagItem}} : null),
        ...(event.day ? {day: {...event.day}} : null)
    }
}

export function randomItemPrice(basePrice) {
    const minPrise = Math.floor(basePrice * 0.3);
    const maxPrice = basePrice + minPrise;
    return  randomNumber(minPrise, maxPrice);
}