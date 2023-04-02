const express = require('express');

const router = express.Router();

const middleware = require('../../middleware');
const adminController = require('../../controllers/adminController');

router.post('/login', adminController.login);
// router.post('/refresh', middleware.refreshToken);
// router.get('/createToken', adminController.createToken);
// router.get('/validateToken', adminController.validateToken);
// router.get('/refreshtoken', middleware.refreshToken);

router.post('/enterprise', adminController.createOrganization);

module.exports = router;
