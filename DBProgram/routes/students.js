var sqliteFileName = "NEWDatabase";

var express = require('express');
var sqlite3 = require("sqlite3");
var TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;
var router = express.Router();
var engine = new sqlite3.Database(sqliteFileName, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
var db = new TransactionDatabase(engine);

engine.exec("PRAGMA foreign_keys = ON");



/* GET all students home page. */
router.get('/', function(req, res, next) {
  db.all("SELECT * FROM Student", function(err,rows){
    if(rows) {
      console.log('students rows fetched: ' + rows.length);
      res.render('entities/students/index', { title: 'Students', data: rows });
    } else {
      res.render('entities/students/index', { title: 'Students', data: false })
    }
  });
});

/* GET form - create students */
router.get('/create', function(req,res,next) {
  console.log('entering create function');
  res.render('entities/students/create', { title: 'New Student' });
});


/* GET one student and address */
router.get('/:id', function(req,res,next) {
  var id = req.params.id;
  db.all("SELECT * FROM Student " +
         "WHERE Student.ID = " +id,
  function(err, rows) {
    console.log('one student fetched, id = ' + id);
    res.render('entities/students/profile', { title: rows[0].FirstName, data: rows[0] });
  });
});

/* POST new student */
router.post('/create', function(req,res,next){
  var data = req.body;
  // Begin a transaction.
  // http://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
  db.beginTransaction(function(err, transaction) {
    // Now we are inside a transaction.
    // Use transaction as normal sqlite3.Database object.
    transaction.run(
      "INSERT INTO Student(FirstName, MiddleInitial, LastName, SSN, RegistrationDate, MaritalStatus, Email, PhoneNumber, DOB, NativeLanguage, Gender, Street, City, State, Zip, Region, Country, PFirstName, PMiddleInitial, PLastName, Relation, PPhoneNumber, Email) " +
      "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      data.FirstName,
      data.MiddleInitial,
      data.LastName,
      data.SSN,
      new Date().toDateString(),
      data.MaritalStatus,
      data.Email,
      data.PhoneNumber,
      data.DOB,
      data.NativeLanguage,
      data.Gender,
      data.Street,
      data.City,
      data.State,
      data.Zip,
      data.Region,
      data.Country,
      data.PFirstName,
      data.PMiddleInitial,
      data.PLastName,
      data.Relation,
      data.PPhoneNumber,
      data.Email
    );


    transaction.commit(function(err) {
      if(err)
        console.log('commit fail');
      else
        console.log('commit success');
    });
  });

  res.redirect('/students');
});


module.exports = router;
