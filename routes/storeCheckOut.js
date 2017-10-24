let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let connect = require('../Model/connect');
let url = require('url');
let fs = require('fs');
let secret = 'jdmforlife';
let cart = require('../Model/cartModel');

router.get('/checkout', (req, res, next) => {
    res.render('storepage/checkOut');
})

module.exports = router;