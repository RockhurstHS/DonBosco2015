var sqliteFileName = "STEAMdatabase";

var express = require('express');
var sqlite3 = require("sqlite3");
var TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;
var router = express.Router();
var engine = new sqlite3.Database(sqliteFileName, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
var db = new TransactionDatabase(engine);

engine.exec("PRAGMA foreign_keys = ON");

/* GET all teachers home page. */
router.get('/', function(req, res, next) {
  db.all("SELECT * FROM teacher", function(err,rows){
    console.log('teachers rows fetched: ' + rows.length);
    res.render('entities/teachers/index', { title: 'teachers', data: rows });
  });
});
/* GET form - create teacher */
router.get('/create', function(req,res,next) {
  res.render('entities/teachers/create', { title: 'New Teacher' });
});

/* POST new teacher */
router.post('/create', function(req,res,next){
  var data = req.body;
  // Begin a transaction.
  // http://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
  db.beginTransaction(function(err, transaction) {
    // Now we are inside a transaction.
    // Use transaction as normal sqlite3.Database object.
    transaction.run(
      "INSERT INTO Teacher(FirstName, MiddleInitial, LastName, Email, PhoneNumber, Gender) " +
      "VALUES(?,?,?,?,?,?)",
      data.FirstName,
      data.MiddleInitial,
      data.LastName,
      data.Email,
      data.PhoneNumber,
      data.Gender
    );


    transaction.commit(function(err) {
      if(err)
        console.log('commit fail');
      else
        console.log('commit success');
    });
  });
res.redirect('/teachers');

});

/* GET form - delete teacher */
router.get('/delete', function(req,res,next) {
  res.render('entities/teachers/delete', { title: 'Delete Teacher' });
});

/* DELETE new teacher */
router.post('/delete', function(req,res,next){
  var data = req.body;
  // Begin a transaction.
  // http://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
  db.beginTransaction(function(err, transaction) {
    // Now we are inside a transaction.
    // Use transaction as normal sqlite3.Database object.
    transaction.run(
     "DELETE FROM Teacher WHERE LastName=?",
      data.LastName
      );


    transaction.commit(function(err) {
      if(err)
        console.log('commit fail');
      else
        console.log('commit success');

    });
res.redirect('/teachers');
  });

});

/* GET form - update teacher */
router.get('/update', function(req,res,next) {
  res.render('entities/teachers/update', { title: 'Update Teacher' });
});

/* POST update teacher */
router.post('/update', function(req,res,next){
  var data = req.body;
  // Begin a transaction.
  // http://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
  db.beginTransaction(function(err, transaction) {
    // Now we are inside a transaction.
    // Use transaction as normal sqlite3.Database object.
    transaction.run(
      "UPDATE Teacher SET FirstName=?, MiddleInitial=?, LastName=?, Email=?, PhoneNumber=?, Gender=? WHERE ID=?",
      data.FirstName,
      data.MiddleInitial,
      data.LastName,
      data.Email,
      data.PhoneNumber,
      data.Gender,
      data.ID
    );


    transaction.commit(function(err) {
      if(err)
        console.log('commit fail');
      else
        console.log('commit success');
    });
  });

  res.redirect('/teachers');
});
module.exports = router;
