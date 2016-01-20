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
  res.render('entities/gradebook/grades', { title: 'Enter a Grade' });
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

/* GET form - create test grade */
router.get('/grades', function(req,res,next) {
  res.render('entities/gradebook/grades', { title: 'New Test Grade' });
});

/* POST new test grade */
router.post('/grades', function(req,res,next){
  var data = req.body;
  // Begin a transaction.
  // http://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
  db.beginTransaction(function(err, transaction) {
    // Now we are inside a transaction.
    // Use transaction as normal sqlite3.Database object.
    transaction.run(
      "INSERT INTO Tests(StudentID,CourseID,Subject,TestNumber,TestLetter,P1,P2,P3,P4,P5,P6,P7,P8,P9,P10,P11,P12,P13,P14,P15,P16,P17,P18,P19,P20,P21,P22,P23,P24,P25) " +
      "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      data.StudentID,
      data.CourseID,
      data.Subject,
      data.TestNumber,
      data.TestLetter,
      data.P1,
      data.P2,
      data.P3,
      data.P4,
      data.P5,
      data.P6,
      data.P7,
      data.P8,
      data.P9,
      data.P10,
      data.P11,
      data.P12,
      data.P13,
      data.P14,
      data.P15,
      data.P16,
      data.P17,
      data.P18,
      data.P19,
      data.P20,
      data.P21,
      data.P22,
      data.P23,
      data.P24,
      data.P25
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