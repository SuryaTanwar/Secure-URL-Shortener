const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    port: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_EMAIL: process.env.GMAIL_EMAIL,
    MONGO_URL: process.env.MONGO_URL
}