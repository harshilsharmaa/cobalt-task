const express = require('express');
const router = express.Router();

const {convert} = require('../controllers/convertor.controller');

router.route('/convert').post(convert);

module.exports = router;