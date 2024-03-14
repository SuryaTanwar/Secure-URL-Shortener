const { AdminRepository } = require('../repository');
const { JWT_SECRET, JWT_EXPIRY} = require('../config/server-config');
const jwt = require('jsonwebtoken');

class AdminService {
    constructor() {
        this.adminRepository = new AdminRepository();
    }

    async signup(data) {
        try {
            const admin = await this.adminRepository.create(data);
            return admin;
        } catch (error) {
            throw error;
        }
    }

    async signin(data){
        try {
            const adminData = await this.adminRepository.find(data.email);
            if(adminData.length == 0){
                throw error;
            }
            if (adminData[0].password !== data.password) {
                throw error;
            }
            const jwt = await this.createToken({id: adminData[0].id, email: adminData[0].email});
            return jwt;
        } catch (error) {
            throw error;
        }
    }
    async createToken(input) {
        try {
            return jwt.sign(input, JWT_SECRET, {expiresIn: JWT_EXPIRY});
        } catch (error) {
            throw error;
        } 
    }

    async verifyToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AdminService;