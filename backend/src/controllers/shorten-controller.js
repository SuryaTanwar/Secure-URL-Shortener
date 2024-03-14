const ShortenService = require('../services/shorten-service');
const AdminService = require('../services/admin-service');

const shortenService = new ShortenService();
const adminService = new AdminService();

//create shorten url
exports.shorten = async (req, res) => {
    try {
        const response = await shortenService.shortenUrl({
            longUrl: req.body.longUrl,
            userEmail: req.body.userEmail,
            userName: req.body.userName,
            adminEmail: req.adminEmail
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new shorten url',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        })
    }
}

// middleware to check jwt token 
exports.checkAuth = async (req, res, next) => {
    try {
       if (!req.headers['x-access-token']) {
           return res.status(401).json({
               message: 'JWT missing',
               data: {},
               success: false
           })
       }
       const isAuthenticated = await adminService.verifyToken(req.headers['x-access-token']);
       if(isAuthenticated) {
           req.adminEmail = isAuthenticated.email;        
       } 
       if (!isAuthenticated) {
           return res.status(401).json({
               message: 'unauthorized access',
               data: {},
               success: false
           })
       }
       next();
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            data: {},
            success: false,
            err: error
        })
    }
}

// to access the record of requested url
exports.shortenedUrl = async (req, res) => {
    try {
        if (!req.body.userEmail) {
            return res.status(400).send('Email query parameter is required');
        }
        const response = await shortenService.findLongUrl({
            shortenId: req.params.shortenId,
            userEmail: req.body.userEmail
        });
        
        return res.status(200).json({
            success: true,
            message: 'Successfully retrieved the url',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(401).json({
            message: 'unauthorized access',
            data: {},
            success: false,
            err: error
        })
    }
}