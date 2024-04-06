const { ShortenRepository } = require('../repository');
const  { shortenIdGenerator } = require('./shortenidgenerator');
const { JWT_SECRET, JWT_EXPIRY, GMAIL_EMAIL} = require('../config/server-config');
const jwt = require('jsonwebtoken');
const mailsender = require('../config/email-config');
class ShortenService {
    constructor() {
        this.shortenRepository = new ShortenRepository();
    }

    async shortenUrl(data) {
        try {
            const shortenId = shortenIdGenerator();
            data.shortenId = shortenId;
            const shortenUrl = await this.shortenRepository.create(data);
            return shortenUrl;
        } catch (error) {
            throw error;
        }
    }

    async findUrl(shortenId) {
        try {
            const shortenUrl = await this.shortenRepository.find(shortenId);
            return shortenUrl;
        } catch (error) {
            throw error;
        }
    }

    //to access the long url
    async findLongUrl(data) {
        try {
            const shortenUrl = await this.shortenRepository.find(data.shortenId);
            if (shortenUrl[0].userEmail !== data.userEmail) {
                throw error;
            }
            //code logic will come here of nodemailer
            const response = await mailsender.sendMail({
                from: GMAIL_EMAIL,
                to: shortenUrl[0].userEmail,
                subject: 'Your long URL',
                text: `Your long URL is: ${shortenUrl[0].longUrl}`
            });
            const response2 = await mailsender.sendMail({
                from: GMAIL_EMAIL,
                to: shortenUrl[0].adminEmail,
                subject: `Someone accessed your long URL`,
                text: `Your long URL ${shortenUrl[0].longUrl} is accesses by ${shortenUrl[0].userName}`
            })
            
        } catch (error) {
            throw error;
        }
    }
}



module.exports = ShortenService;