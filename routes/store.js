let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let connect = require('../Database/connect');
let url = require('url');
let fs = require('fs');
let secret = 'jdmforlife';


let arrayOfTransaksiSession = new Array();
/* GET home page. */
router.get('/', function(req, res, next) {
    connect.query('SELECT la_barang.id_barang, la_barang.namabarang, la_barang.harga, la_barang.stok, la_barang.jenis, gambar.gambar FROM `la_barang` LEFT JOIN gambar ON la_barang.id_barang = gambar.id_barang ORDER by la_barang.id_barang', function(err, row, field){
      if(err){
        res.send('Gagal mengambil data');
      }
      else{
        if(!req.session.userLogin || !req.session.TransaksiSession){
          res.render('storepage/index', {title: "Index", row: row});
        }
        else{
          res.render('storepage/index', {title: "Index", row: row, userLogin : true, login_username: req.session.userLogin.username, login_nama: req.session.userLogin.nama, muchOfCart: req.session.TransaksiSession.length});
        }
      }
    })
});

//router to see user account
router.get('/account/:username', function(req, res, next){
  if(!req.session.userLogin){
    res.redirect('/login');
  }
  else{
    connect.query('SELECT * FROM `la_user` WHERE `username` = "' + req.params.username + '"', function(err, row){
      res.render('storepage/profile', {title: "Index", row: row, userLogin : true, login_username: req.session.userLogin.username, login_nama: req.session.userLogin.nama, username: row[0].username})
    });
  }
})

router.get('/product/search', (req, res, next) => {
  res.redirect('/');
})
//router for see all product
router.get('/product/search/:idbarang', (req, res, next) => {
  let id = req.params.idbarang;
  connect.query(`SELECT * FROM la_barang WHERE id_barang = "${id}"`, (err, result) => {
    if(result.length == 0){
      res.redirect('/');
    }
    else{
      connect.query(`SELECT la_barang.id_barang, la_barang.namabarang, la_barang.harga, la_barang.stok, la_barang.jenis, gambar.gambar FROM la_barang LEFT JOIN gambar ON la_barang.id_barang = gambar.id_barang WHERE la_barang.id_barang = '${id}' ORDER BY la_barang.id_barang`, (err, data) => {
        if(err){
          res.send('Data tidak ditemukan');
        }
        else{
          fs.writeFile('./public/data/data.json', JSON.stringify(data), (err, success) => {
            if(err){
              console.log(err);
            }
            else{
              console.log(success);
            }
          });
    
          if(data.length <= 1){
            if(!req.session.userLogin){
              res.render('storepage/productshow', {userLogin: false, gambar: data[0].gambar, data: data});
            }
            else{
              res.render('storepage/productshow', {userLogin: true, login_username: req.session.userLogin.username, login_nama: req.session.userLogin.nama, gambar: data[0].gambar, data: data});
            }
          }
          else{
            if(!req.session.userLogin){
              res.render('storepage/productshow', {userLogin: false, gambar: data[1].gambar, data: data});
            }
            else{
              res.render('storepage/productshow', {userLogin: true, login_username: req.session.userLogin.username, login_nama: req.session.userLogin.nama, gambar: data[1].gambar, data: data});
            }
          }
        }
      })
    }
  });
  
});

router.post('/product/search/:idbarang', function(req, res, next){
  let id = req.params.idbarang;
  connect.query(`SELECT * FROM la_barang WHERE id_barang = "${id}"`, (err, result) => {
    if(result.length == 0){
      res.redirect('/');
    }
    else{
      arrayOfTransaksiSession.push(result);
      req.session.TransaksiSession = arrayOfTransaksiSession;
      
      console.log(req.session.TransaksiSession);
      connect.query(`SELECT la_barang.id_barang, la_barang.namabarang, la_barang.harga, la_barang.stok, la_barang.jenis, gambar.gambar FROM la_barang LEFT JOIN gambar ON la_barang.id_barang = gambar.id_barang WHERE la_barang.id_barang = '${id}' ORDER BY la_barang.id_barang`, (err, data) => {
        if(err){
          res.send('Data tidak ditemukan');
        }
        else{
          fs.writeFile('./public/data/data.json', JSON.stringify(data), (err, success) => {
            if(err){
              console.log(err);
            }
            else{
              console.log(success);
            }
          });
    
          if(data.length <= 1){
            if(!req.session.userLogin){
              res.render('storepage/productshow', {userLogin: false, gambar: data[0].gambar, data: data, muchOfCart: req.session.TransaksiSession.length});
            }
            else{
              res.render('storepage/productshow', {userLogin: true, login_username: req.session.userLogin.username, login_nama: req.session.userLogin.nama, gambar: data[0].gambar, data: data, muchOfCart: req.session.TransaksiSession.length});
            }
          }
          else{
            if(!req.session.userLogin){
              res.render('storepage/productshow', {userLogin: false, gambar: data[1].gambar, data: data,muchOfCart: req.session.TransaksiSession.length});
            }
            else{
              res.render('storepage/productshow', {userLogin: true, login_username: req.session.userLogin.username, login_nama: req.session.userLogin.nama, gambar: data[1].gambar, data: data, muchOfCart: req.session.TransaksiSession.length});
            }
          }
        }
      })
    }
  });
});

//router for register and login
router.get('/register', function(req, res, next){
  var date = new Date();
  console.log(Date.now());
  res.render('storepage/register');
});

router.post('/register', function(req, res, next){
  var date = new Date();
  var password = crypto.createHmac('sha256', secret).update(req.body.password).digest('hex');
  connect.query('INSERT INTO `la_user`(`nama`, `password`,  `tgl_daftar`, `email`, `username`) VALUES ("' + req.body.nama + '", "' + password + '",  ' + Date.now() + ' , "' + req.body.email + '", "' + req.body.username + '")', function(err, data){
    if(err){
      res.send('Gagal menyimpan data');
    }
    else{
      res.redirect('/');
    }
  })
});

router.get('/login', function(req, res, next){
  res.render('storepage/userLogin');
});

router.post('/login', function(req, res, next){
  var password = crypto.createHmac('sha256', secret).update(req.body.password).digest('hex');
  connect.query('SELECT * FROM `la_user` WHERE `username`= "' + req.body.username + '" AND `password` = "' + password + '"', function(err, row){
    if(row.length == 0){
      res.redirect('/login');
    }
    else{
      req.session.userLogin = {username:row[0].username, nama: row[0].nama}
      res.redirect('/');
    }
  })
})

router.get('/logout/:username', function(req, res, next){
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
