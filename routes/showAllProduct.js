let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let connect = require('../Model/connect');
let url = require('url');
let fs = require('fs');
let secret = 'jdmforlife';
let cart = require('../Model/cartModel');


router.get('/tshirt', (req, res, next) => {
    if(!req.session.userLogin){
        connect.query('SELECT la_barang.id_barang, la_barang.namabarang, la_barang.harga, la_barang.stok, la_barang.jenis, gambar.gambar FROM `la_barang` LEFT JOIN gambar ON la_barang.id_barang = gambar.id_barang WHERE la_barang.jenis = "baju" ORDER BY la_barang.id_barang', (err, data) => {
            res.render('storepage/allTshirt', {data: data, length : data.length});
            console.log(data);
        })
    }
    else{
        connect.query('SELECT la_barang.id_barang, la_barang.namabarang, la_barang.harga, la_barang.stok, la_barang.jenis, gambar.gambar FROM `la_barang` LEFT JOIN gambar ON la_barang.id_barang = gambar.id_barang WHERE la_barang.jenis = "baju" ORDER BY la_barang.id_barang', (err, data) => {
            res.render('storepage/allTshirt', {data: data, length : data.length, userLogin : true, login_username: req.session.userLogin.username, login_nama: req.session.userLogin.nama});
            console.log(data);
        })
    }
})

router.get('/jeans', (req, res, next) => {
    if(!req.session.userLogin){
        connect.query('SELECT la_barang.id_barang, la_barang.namabarang, la_barang.harga, la_barang.stok, la_barang.jenis, gambar.gambar FROM `la_barang` LEFT JOIN gambar ON la_barang.id_barang = gambar.id_barang WHERE la_barang.jenis = "celana" ORDER BY la_barang.id_barang', (err, data) => {
            res.render('storepage/allJeans', {data: data, length : data.length});
            console.log(data);
        })
    }
    else{
        connect.query('SELECT la_barang.id_barang, la_barang.namabarang, la_barang.harga, la_barang.stok, la_barang.jenis, gambar.gambar FROM `la_barang` LEFT JOIN gambar ON la_barang.id_barang = gambar.id_barang WHERE la_barang.jenis = "celana" ORDER BY la_barang.id_barang', (err, data) => {
            res.render('storepage/allJeans', {data: data, length : data.length, userLogin : true, login_username: req.session.userLogin.username, login_nama: req.session.userLogin.nama});
            console.log(data);
        })
    }
});

module.exports = router;