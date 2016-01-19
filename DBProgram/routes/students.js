var sqliteFileName = "STEAMdatabase";

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
    console.log('students rows fetched: ' + rows.length);
    res.render('entities/students/index', { title: 'Students', data: rows });
  });
});

/* GET form - create students */
router.get('/create', function(req,res,next) {
  console.log('entering create function');
  res.render('entities/students/create', { title: 'New Student' });
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
      "INSERT INTO Student(FirstName, MiddleInitial, LastName, SSN, RegistrationDate, MaritalStatus, Email, PhoneNumber, DOB, NativeLanguage, Gender, Street, City, State, Zip, Region, Country, PFirstName, PMiddleInitial, PLastName, Relation, PPhoneNumber, PEmail) " +
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

/* GET form - update student */
router.get('/update', function(req,res,next) {
  console.log('Going to the update')
  res.render('entities/students/update', { title: 'Update Student' });
});

/* POST update student */
router.post('/update', function(req,res,next){
  var data = req.body;
  // Begin a transaction.
  // http://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
  db.beginTransaction(function(err, transaction) {
    // Now we are inside a transaction.
    // Use transaction as normal sqlite3.Database object.
    transaction.run(
      "UPDATE Student SET FirstName=?, MiddleInitial=?, LastName=?, SSN=?, RegistrationDate=?, MaritalStatus=?, Email=?, PhoneNumber=?, DOB=?, NativeLanguage=?, Gender=?, Street=?, City=?, State=?, Zip=?, Region=?, Country=?, PFirstName=?, PMiddleInitial=?, PLastName=?, Relation=?, PPhoneNumber=?, PEmail=? WHERE ID=?",
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
      data.PEmail,
      data.ID
    );
    console.log('We have passed transaction at this point')

    transaction.commit(function(err) {
      if(err)
        console.log('commit fail');
      else
        console.log('commit success');
    });
  });

  res.redirect('/students');
});

/* GET form - delete student */
router.get('/delete', function(req,res,next) {
  res.render('entities/students/delete', { title: 'Delete Student' });
});

/* DELETE new student */
router.post('/delete', function(req,res,next){
  var data = req.body;
  // Begin a transaction.
  // http://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
  db.beginTransaction(function(err, transaction) {
    // Now we are inside a transaction.
    // Use transaction as normal sqlite3.Database object.
    transaction.run(
     "DELETE FROM Student WHERE LastName=?",
      data.LastName
      );

    transaction.commit(function(err) {
      if(err)
        console.log('commit fail');
      else
        console.log('commit success');

    });
res.redirect('/students');
  });

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

module.exports = router;
