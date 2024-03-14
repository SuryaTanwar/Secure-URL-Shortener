const NUM_CHARS_SHORT_LINK = 7;
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const random = () => Math.floor(Math.random() * ALPHABET.length);

async function generateRandomShortUrl() {
    let result = '';
    while (true) {
        for (let i = 0; i < NUM_CHARS_SHORT_LINK; i++) {
            const randomIndex = random();
            result += ALPHABET.charAt(randomIndex);
        }
        
        return result;
        
    }
}

module.exports = generateRandomShortUrl; 
