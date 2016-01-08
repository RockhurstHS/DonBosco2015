var sqliteFileName = "STEAMdatabase";

var express = require('express');
var sqlite3 = require("sqlite3");
var TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;
var router = express.Router();
var engine = new sqlite3.Database(sqliteFileName, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
var db = new TransactionDatabase(engine);

engine.exec("PRAGMA foreign_keys = ON");

/* GET all dealerships home page. */
router.get('/', function(req, res, next) {
  db.all("SELECT * FROM course", function(err,rows){
    console.log('courses rows fetched: ' + rows.length);
    res.render('entities/courses/index', { title: 'courses', data: rows });
  });
});
/* GET form - create course */
router.get('/create', function(req,res,next) {
  res.render('entities/courses/create', { title: 'New Course' });
});

router.post('/create', function(req,res,next){
  var data = req.body;
  res.send(req.body)
  // Begin a transaction.
  // http://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
  db.beginTransaction(function(err, transaction) {
    // Now we are inside a transaction.
    // Use transaction as normal sqlite3.Database object.
    transaction.run(
      "INSERT INTO Course(TeacherID,CourseName,TimeHeld) " +
      "VALUES(?,?,?)",
      data.TeacherID,
      data.CourseName,
      data.TimeHeld
    );


    transaction.commit(function(err) {
      if(err)
        console.log('commit fail');
      else
        console.log('commit success');
    });
  });

  res.send(req.body);
});

/* DELETE -  delete course */
var courseID
router.delete('/delete',function(req,res,next){
  res.send(req.body)
  db.beginTransaction(function(err,transaction){
    transacion.run (
      "DELETE FROM Courses" +
      "WHERE CourseID = "
    )
  });
});

module.exports = router;
