const rangeManager = require('./range-manager'); 

const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let min, max;
let counter;
rangeManager.getMinMax()
    .then(({ MIN, MAX }) => {
        // Now you're guaranteed to have the correct MIN and MAX 
        min = MIN;
        max = MAX;
        counter = MIN;
    })
    .catch(error => {
        console.error("Error getting MIN and MAX:", error);
    });



function shortenIdGenerator() {
    try {

        if (counter > max) {
            throw new Error('Counter exceeded maximum value.'); 
        }
        const base62Value = toBase62Helper(counter); 
        counter++;
        return base62Value;

    } catch (error) {
        console.error(error.message);
    }
}

function toBase62Helper(integer) { 

    let result = '';

    while (integer > 0) {
        result = characters[integer % 62] + result;
        integer = Math.floor(integer / 62);
    }

    return result;
}

module.exports = {
    shortenIdGenerator
}