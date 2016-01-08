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
  db.all("SELECT * FROM student s INNER JOIN address a ON s.AddressID=a.ID", function(err,rows){
    console.log('students rows fetched: ' + rows.length);
    res.render('entities/students/index', { title: 'students', data: rows });
  });
});

module.exports = router;
