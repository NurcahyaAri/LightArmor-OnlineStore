let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let connect = require('../Model/connect');
let url = require('url');
let fs = require('fs');
let secret = 'jdmforlife';



/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.userLogin);
  CheckJumlah(req);
  console.log("Index, transaksi session " + req.session.TransaksiSession);
  console.log("Index, panjang transaksi " + req.session.CountOfTransaction);
    connect.query('SELECT la_barang.id_barang, la_barang.namabarang, la_barang.harga, la_barang.stok, la_barang.jenis, gambar.gambar FROM `la_barang` LEFT JOIN gambar ON la_barang.id_barang = gambar.id_barang ORDER by la_barang.id_barang', function(err, row, field){
      if(err){
        res.send('Gagal mengambil data');
      }
      else{
        if(!req.session.userLogin){
          if(!req.session.TransaksiSession){
            res.render('storepage/index', {title: "Index", row: row});
          }
          else{
            res.render('storepage/index', {title: "Index", row: row, inCart: true, MuchOnCart: req.session.CountOfTransaction});
          }
        }
        else{
          if(!req.session.TransaksiSession){
            res.render('storepage/index', {title: "Index", row: row, userLogin : true, login_username: req.session.userLogin.username, login_nama: req.session.userLogin.nama});
          }
          else{
            res.render('storepage/index', {title: "Index", row: row, userLogin : true, inCart: true, login_username: req.session.userLogin.username, login_nama: req.session.userLogin.nama, MuchOnCart: req.session.CountOfTransaction});
          }
        }
      }
    })
});


module.exports = router;
