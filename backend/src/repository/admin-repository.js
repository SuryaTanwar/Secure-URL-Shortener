const Admin = require('../models/admin');

class AdminRepository {
    async create(data) {
        try {
            const admin = await Admin.create(data);
            return admin;
        } catch (error) {
            console.error(error);
        }
    }

    async find(email) {
        try {
            const adminEmail = await Admin.find({ email: email }).exec();
            return adminEmail;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = AdminRepository;