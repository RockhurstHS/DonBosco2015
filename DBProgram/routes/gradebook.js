var sqliteFileName = "STEAMdatabase";

var express = require('express');
var sqlite3 = require("sqlite3");
var TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;
var router = express.Router();
var engine = new sqlite3.Database(sqliteFileName, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
var db = new TransactionDatabase(engine);

engine.exec("PRAGMA foreign_keys = ON");

/* GET all grades home page. */
router.get('/', function(req, res, next) {
  db.all("SELECT g.ID, g.StudentID, g.TestID, g.Score, s.FirstName, s.LastName, t.testname, t.testdate FROM gradebook g JOIN student s ON g.StudentID=s.ID JOIN test t ON g.TestID=t.ID", function(err,rows){
    console.log('courses rows fetched: ' + rows.length);
    res.render('entities/gradebook/index', { title: 'Gradebook', data: rows });
  });
});




/* GET form - create grade */
router.get('/create', function(req,res,next) {
  res.render('entities/gradebook/create', { title: 'New Grade' });
});

/* POST new grade */
router.post('/create', function(req,res,next){
  var data = req.body;
  // Begin a transaction.
  // http://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
  db.beginTransaction(function(err, transaction) {
    // Now we are inside a transaction.
    // Use transaction as normal sqlite3.Database object.
    transaction.run(
      "INSERT INTO Gradebook(StudentID, TestID, Score) " +
      "VALUES(?,?,?)",
      data.StudentID,
      data.TestID,
      data.Score
    );


    transaction.commit(function(err) {
      if(err)
        console.log('commit fail');
      else
        console.log('commit success');
    });
  });
res.redirect('/gradebook');

});

/* GET form - delete teacher */
router.get('/delete', function(req,res,next) {
  res.render('entities/gradebook/delete', { title: 'Delete Grade' });
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
     "DELETE FROM Gradebook WHERE ID=?",
      data.ID
      );


    transaction.commit(function(err) {
      if(err)
        console.log('commit fail');
      else
        console.log('commit success');

    });
res.redirect('/gradebook');
  });

});

/* GET form - update teacher */
router.get('/update', function(req,res,next) {
  res.render('entities/gradebook/update', { title: 'Update Grades' });
});

/* POST update teacher */
router.post('/update', function(req,res,next){
  var data = req.body;
  //res.send(req.body)
  // Begin a transaction.
  // http://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
  db.beginTransaction(function(err, transaction) {
    // Now we are inside a transaction.
    // Use transaction as normal sqlite3.Database object.
    transaction.run(
      "UPDATE Gradebook SET StudentID=?, TestID=?, Score=? WHERE ID=?",
      data.StudentID,
      data.TestID,
      data.Score,
      data.ID
    );


    transaction.commit(function(err) {
      if(err)
        console.log('commit fail');
      else
        console.log('commit success');
    });
  });

  res.redirect('/gradebook');
});

/* GET form - create grade */
router.get('/test', function(req,res,next) {
  res.render('entities/gradebook/test', { title: 'New Test' });
});

/* POST new test */
router.post('/test', function(req,res,next){
  var data = req.body;
  // Begin a transaction.
  // http://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
  db.beginTransaction(function(err, transaction) {
    // Now we are inside a transaction.
    // Use transaction as normal sqlite3.Database object.
    transaction.run(
      "INSERT INTO Test(TestName, TestDate) " +
      "VALUES(?,?)",
      data.TestName,
      data.TestDate
    );


    transaction.commit(function(err) {
      if(err)
        console.log('commit fail');
      else
        console.log('commit success');
    });
  });
res.redirect('/gradebook');

});

module.exports = router;
