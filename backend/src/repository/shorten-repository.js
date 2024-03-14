const ShortenUrl = require('../models/shorten');

class ShortenUrlRepository {
    async create(data) {
        try {
            const shortenUrl = await ShortenUrl.create(data);
            return shortenUrl;
        } catch (error) {
            console.error(error);
        }
    }

    async find(query) {
        try {
            const shortenUrl = await ShortenUrl.find({ shortenId: query }).exec();
            return shortenUrl;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = ShortenUrlRepository;