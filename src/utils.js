export function arrayNumSum(value) {
    if (Object.prototype.toString.call(value) === '[object Array]') {        
        return value.reduce((a, b) => {
            return a + b;
        });
    } else if (typeof value === 'object' && value !== null) {
        return Object.values(value).reduce((a, b) => {
            return a + b;
        });
    } else {
        return value;
    }

}

export function randomNumber(minValue, maxValue) {
    const checkMinValue = !isNaN(parseFloat(minValue)) && isFinite(minValue) ? true : false;
    const checkMaxValue = !isNaN(parseFloat(maxValue)) && isFinite(maxValue) ? true : false;
    if (checkMinValue && checkMaxValue) {
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    } else {
        return 0
    }
}