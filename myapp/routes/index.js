var express = require('express');
var router = express.Router();

const db = require('./../db');

const {check, validationResult} = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.getAllMemos((rows) => {
    res.render('index', { rows: rows });
  });
});

router.get('/newMemo', function(req, res, next){
  res.render('newMemo');
});

router.post('/store', [check('content').isByteLength({min:1, max:500})], function(req, res, next){
  let errs = validationResult(req);
  if(errs['errors'].length > 0) {
    res.render('newMemo',{errs:errs['errors']});
  }else{
    let param = JSON.parse(JSON.stringify(req.body));
    db.insertMemo(param['content'],() =>{
      res.redirect('/');
    });
  }
});

module.exports = router;
