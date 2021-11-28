const express = require('express');
const router = express.Router();
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const { create } = require('../models/Comments');

router.post('/create', (req, res, next) => {
    console.log(req.body);
});


module.exports = router;