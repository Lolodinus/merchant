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