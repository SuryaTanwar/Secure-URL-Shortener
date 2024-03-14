const express = require('express');
const router = express.Router();
const { signup, signin } = require('../../controllers/auth-controller');
const { shorten, shortenedUrl, checkAuth } = require('../../controllers/shorten-controller');


// GET: /api/v1/info
router.get('/info', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is up and running',
    });
})

// POST: /api/v1/signup
router.post('/signup', signup);

// POST /api/v1/shorten
router.post('/shorten', checkAuth, shorten);

// GET /api/v1/myurl/:shortenId
router.post('/myurl/:shortenId/', shortenedUrl);

// POST /api/v1/signin
router.post('/signin', signin);


module.exports = router;