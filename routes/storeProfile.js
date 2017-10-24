let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let connect = require('../Model/connect');
let url = require('url');
let fs = require('fs');
let secret = 'jdmforlife';

/* GET users listing. */
//router to see user account
router.get('/account/:username', function(req, res, next){
  if(!req.session.userLogin){
    res.redirect('/login');
  }
  else{
    if(req.params.username === req.session.userLogin.username){
      connect.query('SELECT * FROM `la_user` WHERE `username` = "' + req.params.username + '"', function(err, row){
        res.render('storepage/profile', {title: "Index", profile: row, userLogin : true, login_username: req.session.userLogin.username, login_nama: req.session.userLogin.nama, username: row[0].username})
      });
    }
    else{
      res.redirect('/account/'+req.session.userLogin.username);
    }
  }
})
module.exports = router;
