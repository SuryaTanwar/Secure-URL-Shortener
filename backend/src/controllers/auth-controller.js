const AdminService = require('../services/admin-service');

const adminService = new AdminService();

exports.signup = async (req, res) => {
    try {
       const response = await adminService.signup({
           email: req.body.email,
           password: req.body.password,
           name: req.body.name
       });
       return res.status(201).json({
           success: true,
           message: 'Successfully created a new admin',
           data: response,
           err: {}
       }); 
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

exports.signin = async (req, res) => {
    try {
        const response = await adminService.signin({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200).json({
            success: true,
            message: 'Successfully logged in',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}