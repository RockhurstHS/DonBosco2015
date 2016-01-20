var sqliteFileName = "STEAMdatabase";

var express = require('express');
var sqlite3 = require("sqlite3");
var TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;
var router = express.Router();
var engine = new sqlite3.Database(sqliteFileName, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
var db = new TransactionDatabase(engine);

engine.exec("PRAGMA foreign_keys = ON");

/* GET all dealerships home page. */

var Assessment = {
  "A1Reading" : {
  	"NumbersAndNumeracyTerms":[1,3,5,8],
  	"MorphemesAndSyntax":[],
  	"WordaAndPhrases":[2,4,6,7,9],
  	"SameMeaning":[],
  	"OppositeMeaning":[],
  	"AppropriateAssociatedInformation":[13,14,17],
  	"IdentifyInformation":[10,11,12,15,18,19,20,21,23,25],
  	"ConstructMeaning":[16,22,24],
  	"ExtendMeaning":[]
  },
  "B1Reading" : {
  	"NumbersAndNumeracyTerms":[2,3,10,12],
  	"MorphemesAndSyntax":[],
  	"WordaAndPhrases":[1,4,5,6,7,8],
  	"SameMeaning":[],
  	"OppositeMeaning":[],
  	"AppropriateAssociatedInformation":[16,22],
  	"IdentifyInformation":[13,14,15,18,19,20,21,23,24,25],
  	"ConstructMeaning":[9,11,17],
  	"ExtendMeaning":[]
  },
  "A2Reading" : {
      "NumbersAndNumeracyTerms":[3,4,8,9,12,18,22],
      "MorphemesAndSyntax":[10],
      "WordaAndPhrases":[6,17,21],
      "SameMeaning":[11],
      "OppositeMeaning":[],
      "AppropriateAssociatedInformation":[25],
      "IdentifyInformation":[1,2,5,14,15,16,19,20],
      "ConstructMeaning":[7,13,23,24],
      "ExtendMeaning":[]
  },
  "B2Reading" : {
      "NumbersAndNumeracyTerms":[1,7,10,22],
      "MorphemesAndSyntax":[20],
      "WordaAndPhrases":[2,24,25],
      "SameMeaning":[15,21],
      "OppositeMeaning":[],
      "AppropriateAssociatedInformation":[8,11,12,19],
      "IdentifyInformation":[3,4,5,9,13,14,17,23],
      "ConstructMeaning":[6,16,18],
      "ExtendMeaning":[]
  },
  "A3Reading" : {
      "NumbersAndNumeracyTerms":[4,9,14,15],
      "MorphemesAndSyntax":[11,13,21],
      "WordaAndPhrases":[8,19],
      "SameMeaning":[3,20],
      "OppositeMeaning":[25],
      "AppropriateAssociatedInformation":[10],
      "IdentifyInformation":[1,6,12,22],
      "ConstructMeaning":[5,7,16,23,24],
      "ExtendMeaning":[2,17,18]
  },
  "B3Reading" : {
      "NumbersAndNumeracyTerms":[6,11,16,17],
      "MorphemesAndSyntax":[15,22,25],
      "WordaAndPhrases":[4],
      "SameMeaning":[9,21],
      "OppositeMeaning":[5],
      "AppropriateAssociatedInformation":[13,20],
      "IdentifyInformation":[1,7,14,18],
      "ConstructMeaning":[2,3,8,23,24],
      "ExtendMeaning":[10,12,19]
  },
  "A4Reading" : {
      "NumbersAndNumeracyTerms":[5,8,12,16],
      "MorphemesAndSyntax":[1,9,21],
      "WordaAndPhrases":[20,22],
      "SameMeaning":[15,19],
      "OppositeMeaning":[],
      "AppropriateAssociatedInformation":[4,6,14],
      "IdentifyInformation":[2,3,10,13,17,23],
      "ConstructMeaning":[11,18,24,25],
      "ExtendMeaning":[7]
  },
  "B4Reading" : {
      "NumbersAndNumeracyTerms":[3,4,8,11],
      "MorphemesAndSyntax":[18],
      "WordaAndPhrases":[1,21,25],
      "SameMeaning":[14,15,23],
      "OppositeMeaning":[19],
      "AppropriateAssociatedInformation":[7,17],
      "IdentifyInformation":[9,20,24],
      "ConstructMeaning":[6,10,13,16],
      "ExtendMeaning":[2,5,12,22]
  },
  "A1Listening" : {
      "NumberAndNumberTerms":[1,2,3,5],
      "DiscernSounds":[8,9,10],
      "Details":[14,17,20],
      "StatedConcepts":[11,23],
      "IdiomsExpressions":[21],
      "DetermineRoles":[4,18],
      "Instructions":[6,7],
      "CauseEffect":[24],
      "FactOpinion":[],
      "MainIdea":[12,15,25],
      "Forecast":[13,16],
      "SpeakerPurpose":[19,22]
  },
  "B1Listening" : {
      "NumberAndNumberTerms":[3,4,20,23],
      "DiscernSounds":[13,14,15,16],
      "Details":[22],
      "StatedConcepts":[17],
      "IdiomsExpressions":[5,10],
      "DetermineRoles":[6,19],
      "Instructions":[1,2,7],
      "CauseEffect":[18,25],
      "FactOpinion":[],
      "MainIdea":[21,24],
      "Forecast":[9],
      "SpeakerPurpose":[8,11,12]
  },
  "A2Listening" : {
      "NumberAndNumberTerms":[1,2,3,4,5],
      "DiscernSounds":[10,11,12],
      "Details":[17],
      "StatedConcepts":[],
      "IdiomsExpressions":[18,20],
      "DetermineRoles":[6,7,16,21],
      "Instructions":[8,9],
      "CauseEffect":[13,23],
      "FactOpinion":[],
      "MainIdea":[14,24],
      "Forecast":[19,22],
      "SpeakerPurpose":[15,25]
  },
  "B2Listening" : {
      "NumberAndNumberTerms":[1,4,5,19],
      "DiscernSounds":[10,11,12],
      "Details":[20,24],
      "StatedConcepts":[23],
      "IdiomsExpressions":[7,16],
      "DetermineRoles":[2,14,17],
      "Instructions":[3,15],
      "CauseEffect":[9],
      "FactOpinion":[],
      "MainIdea":[18,21,25],
      "Forecast":[6,8,22],
      "SpeakerPurpose":[13]
  },
  "A3Listening" : {
      "NumberAndNumberTerms":[1,2,3,4],
      "DiscernSounds":[],
      "Details":[9,15,19,23],
      "StatedConcepts":[12,16],
      "IdiomsExpressions":[20,21],
      "DetermineRoles":[7],
      "Instructions":[5,6,8],
      "CauseEffect":[10],
      "FactOpinion":[17,24],
      "MainIdea":[11,13,25],
      "Forecast":[22],
      "SpeakerPurpose":[14,18]
  },
  "B3Listening" : {
      "NumberAndNumberTerms":[1,2,3,4],
      "DiscernSounds":[],
      "Details":[7,14,15,19,23],
      "StatedConcepts":[18],
      "IdiomsExpressions":[10,17,24],
      "DetermineRoles":[5,6],
      "Instructions":[],
      "CauseEffect":[11,12],
      "FactOpinion":[20],
      "MainIdea":[13,16,22],
      "Forecast":[8,25],
      "SpeakerPurpose":[9,21]
  },
  "A4Listening" : {
      "NumberAndNumberTerms":[1,2,3,5],
      "DiscernSounds":[],
      "Details":[11,16,19,22],
      "StatedConcepts":[12,17,23],
      "IdiomsExpressions":[9,13,18,24],
      "DetermineRoles":[5,6],
      "Instructions":[7,8],
      "CauseEffect":[],
      "FactOpinion":[20],
      "MainIdea":[10,14],
      "Forecast":[21],
      "SpeakerPurpose":[15,25]
  },
  "B4Listening" : {
      "NumberAndNumberTerms":[1,2,3,16],
      "DiscernSounds":[],
      "Details":[14,15,22,25],
      "StatedConcepts":[13,20,24],
      "IdiomsExpressions":[21],
      "DetermineRoles":[4,5],
      "Instructions":[6,17],
      "CauseEffect":[8],
      "FactOpinion":[9,10],
      "MainIdea":[12,18,23],
      "Forecast":[7,11],
      "SpeakerPurpose":[19]
  },
  "A1Writing" : {
      "NumbersAndNumeracyTerms":[1,2,3,5],
      "VerbPhrases":[4,8,11,12],
      "NounPhrases":[6,7,9,16],
      "WritingConventions":[10,13,14,15],
      "SentenceFormation":[17,18],
      "SentenceCoherence":[19,20],
      "WriteToDescribe":[1,2],
      "WriteToAccomplishTasks":[3,4],
      "ExtendedWriting":[5]
  },
  "B1Writing" : {
      "NumbersAndNumeracyTerms":[1,2,3,4],
      "VerbPhrases":[5,8,16,17],
      "NounPhrases":[6,7,9,15],
      "WritingConventions":[10,12,13,14],
      "SentenceFormation":[11,18],
      "SentenceCoherence":[19,20],
      "WriteToDescribe":[1,2],
      "WriteToAccomplishTasks":[3,4],
      "ExtendedWriting":[5]
  },
  "A2Writing" : {
      "NumbersAndNumeracyTerms":[1,2,3,4],
      "VerbPhrases":[5,6,7,10,14],
      "NounPhrases":[8,9,11],
      "WritingConventions":[12,13,15],
      "SentenceFormation":[16,17],
      "SentenceCoherence":[18,19,20],
      "WriteToDescribe":[1,2],
      "WriteToAccomplishTasks":[3,4],
      "ExtendedWriting":[5]
  },
  "B2Writing" : {
      "NumbersAndNumeracyTerms":[1,2,3,4],
      "VerbPhrases":[5,6,8,13],
      "NounPhrases":[7,9,12,14,16],
      "WritingConventions":[11,15],
      "SentenceFormation":[10,17],
      "SentenceCoherence":[18,19,20],
      "WriteToDescribe":[1,2],
      "WriteToAccomplishTasks":[3,4],
      "ExtendedWriting":[5]
  },
  "A3Writing" : {
      "NumbersAndNumeracyTerms":[1,2,3,7],
      "VerbPhrases":[8,11,13,14],
      "NounPhrases":[4,5,6],
      "WritingConventions":[9,10,15],
      "SentenceFormation":[12,16],
      "SentenceCoherence":[17,18,19,20],
      "WriteToDescribe":[1,2],
      "WriteToAccomplishTasks":[3,4],
      "ExtendedWriting":[5]
  },
  "B3Writing" : {
      "NumbersAndNumeracyTerms":[1,2,3,4],
      "VerbPhrases":[5,6,7],
      "NounPhrases":[8,9,10,11],
      "WritingConventions":[14,15],
      "SentenceFormation":[13,16],
      "SentenceCoherence":[12,17,18,19,20],
      "WriteToDescribe":[1,2],
      "WriteToAccomplishTasks":[3,4],
      "ExtendedWriting":[5]
  },
  "A4Writing" : {
      "NumbersAndNumeracyTerms":[1,2,3,4],
      "VerbPhrases":[7,8,9,13],
      "NounPhrases":[5,6,15],
      "WritingConventions":[10,11,12],
      "SentenceFormation":[14,16],
      "SentenceCoherence":[17,18,19,20],
      "WriteToDescribe":[1,2],
      "WriteToAccomplishTasks":[3,4],
      "ExtendedWriting":[5]
  },
  "B4Writing" : {
      "NumbersAndNumeracyTerms":[1,2,3,4],
      "VerbPhrases":[5,9,10,11],
      "NounPhrases":[7,8,14,16],
      "WritingConventions":[6,13],
      "SentenceFormation":[12,15],
      "SentenceCoherence":[17,18,19,20],
      "WriteToDescribe":[1,2],
      "WriteToAccomplishTasks":[3,4],
      "ExtendedWriting":[5]
  },
  "A1Speaking" : {
      "NumbersAndNumeracyTerms":[1,2,3],
      "GreetingsInquiriesLeaveTakings":[9,10],
      "PhoneCompetency":[11],
      "ExpressOpinion":[],
      "InstructionsDirectionsLocations":[4,5,6],
      "Descriptions":[],
      "NarrateParaphraseEvents":[7,8],
      "RequestsPermission":[12,13,14],
      "ExpressDissatisfactionApology":[15],
      "NegotiateMeaning":[16]
  },
  "B1Speaking" : {
      "NumbersAndNumeracyTerms":[1,2,3],
      "GreetingsInquiriesLeaveTakings":[9,10],
      "PhoneCompetency":[11],
      "ExpressOpinion":[],
      "InstructionsDirectionsLocations":[4,5,6],
      "Descriptions":[],
      "NarrateParaphraseEvents":[7,8],
      "RequestsPermission":[12,13,14],
      "ExpressDissatisfactionApology":[15],
      "NegotiateMeaning":[16]
  },
  "A2Speaking" : {
      "NumbersAndNumeracyTerms":[1,2,3],
      "GreetingsInquiriesLeaveTakings":[9],
      "PhoneCompetency":[10],
      "ExpressOpinion":[11],
      "InstructionsDirectionsLocations":[4,5,6],
      "Descriptions":[],
      "NarrateParaphraseEvents":[7,8],
      "RequestsPermission":[12,13,14],
      "ExpressDissatisfactionApology":[15],
      "NegotiateMeaning":[16]
  },
  "B2Speaking" : {
      "NumbersAndNumeracyTerms":[1,2,3],
      "GreetingsInquiriesLeaveTakings":[9],
      "PhoneCompetency":[10],
      "ExpressOpinion":[11],
      "InstructionsDirectionsLocations":[4,5,6],
      "Descriptions":[],
      "NarrateParaphraseEvents":[7,8],
      "RequestsPermission":[12,13,14],
      "ExpressDissatisfactionApology":[15],
      "NegotiateMeaning":[16]
  },
  "A3Speaking" : {
      "NumbersAndNumeracyTerms":[1,2,3],
      "GreetingsInquiriesLeaveTakings":[],
      "PhoneCompetency":[9,10],
      "ExpressOpinion":[11],
      "InstructionsDirectionsLocations":[4,5],
      "Descriptions":[],
      "NarrateParaphraseEvents":[6,7,8],
      "RequestsPermission":[12,13],
      "ExpressDissatisfactionApology":[14,15],
      "NegotiateMeaning":[16]
  },
  "B3Speaking" : {
      "NumbersAndNumeracyTerms":[1,2,3],
      "GreetingsInquiriesLeaveTakings":[],
      "PhoneCompetency":[9,10],
      "ExpressOpinion":[12],
      "InstructionsDirectionsLocations":[4,5],
      "Descriptions":[],
      "NarrateParaphraseEvents":[6,7,8],
      "RequestsPermission":[11,13],
      "ExpressDissatisfactionApology":[14,15],
      "NegotiateMeaning":[16]
  },
  "A4Speaking" : {
      "NumbersAndNumeracyTerms":[1,2,3],
      "GreetingsInquiriesLeaveTakings":[],
      "PhoneCompetency":[9,10],
      "ExpressOpinion":[7,8],
      "InstructionsDirectionsLocations":[4,5],
      "Descriptions":[6],
      "NarrateParaphraseEvents":[],
      "RequestsPermission":[11,12],
      "ExpressDissatisfactionApology":[13,15],
      "NegotiateMeaning":[14,16]
  },
  "B4Speaking" : {
      "NumbersAndNumeracyTerms":[1,2,3],
      "GreetingsInquiriesLeaveTakings":[],
      "PhoneCompetency":[9,10],
      "ExpressOpinion":[7,8],
      "InstructionsDirectionsLocations":[4,5],
      "Descriptions":[6],
      "NarrateParaphraseEvents":[],
      "RequestsPermission":[11,12],
      "ExpressDissatisfactionApology":[13,14],
      "NegotiateMeaning":[15,16]
  }
};

/* GET all courses home page. */
router.get('/', function(req, res, next) {
  db.all("SELECT c.ID AS CourseID, t.FirstName, t.ID AS TeacherID, t.LastName, c.CourseName, c.TimeHeld, c.TeacherID FROM course c JOIN teacher t ON c.TeacherID=t.ID", function(err,rows){
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

res.redirect('/courses');
});

/* Draw the delete course */
router.get('/delete', function(req, res, next){
   res.render('entities/courses/delete', { title: 'Delete Course' });
});

/* DELETE -  delete course */
router.post('/delete', function(req,res,next){
  var data = req.body;
  // Begin a transaction.
  // http://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
  db.beginTransaction(function(err, transaction) {
    // Now we are inside a transaction.
    // Use transaction as normal sqlite3.Database object.
    transaction.run(
     "DELETE FROM Course WHERE ID=?",
      data.CourseID
      );


    transaction.commit(function(err) {
      if(err)
        console.log('commit fail');
      else
        console.log('commit success');

    });
res.redirect('/courses');
  });
});

/* GET - update course */
router.get('/update', function(req, res, next){
   res.render('entities/courses/update', { title: 'Update Course' });
});

/* POST - update course */
router.post('/update', function(req,res,next){
  var data = req.body;
  // Begin a transaction.
  // http://stackoverflow.com/questions/28803520/does-sqlite3-have-prepared-statements-in-node-js
  db.beginTransaction(function(err, transaction) {
    // Now we are inside a transaction.
    // Use transaction as normal sqlite3.Database object.
    transaction.run(
     "UPDATE Course SET TeacherID=?, CourseName=?, TimeHeld=? WHERE ID=?" ,
      data.TeacherID,
      data.CourseName,
      data.TimeHeld,
      data.ID
    );


    transaction.commit(function(err) {
      if(err)
        console.log('commit fail');
      else
        console.log('commit success');

    });
    res.redirect('/courses');
  });
});

/* GET tests home page. */
router.get('/:courseid/tests/:testnumber', function(req, res, next) {
  var testNumber = req.params.testnumber;
  var courseId = req.params.courseid;
  db.all("SELECT * " +
        "FROM Tests " +
        "JOIN Course ON Tests.CourseID = Course.ID " +
        "JOIN Student ON Tests.StudentID = Student.ID " +
        "WHERE Course.ID = " + courseId + " " +
        "ORDER BY Student.LastName, Student.FirstName, Student.ID", function(err,rows){
    console.log('courses rows fetched: ' + rows.length);

    //objects are also associative arrays
    var students = {};
    
    //foreach test in the course
    rows.forEach(function(row){
      
      //foreach problem in the test
      var wrongAnswers = [];
      for(var i = 1; i < 26; i++) {
        var problem = 'P' + i;
        if(row[problem] == 'on') {
          wrongAnswers.push(i);
        }
      }

      var student = row.LastName + ',' + row.FirstName + ',' + row.StudentID;
      var test = row.TestLetter + row.TestNumber; //like A1Reading
      var subject = row.Subject;

      if(!students.hasOwnProperty(student)) {
        students[student] = {};
      }
      
      if(!students[student].hasOwnProperty(test)) {
        students[student][test] = [];
      }
      
      students[student][test].push({
        subject: subject,
        wrongAnswers: wrongAnswers
      });
      
      
      
      
    });
    console.log(JSON.stringify(students));
    res.render('entities/courses/test', { title: 'Test ' + testNumber, data: students, assessment: Assessment});
  });
});

/* GET one course */
router.get('/:id', function(req,res,next) {
  var id = req.params.id;
  db.all("SELECT * " +
         "FROM Course " +
         "JOIN StudentInCourse ON Course.ID = StudentInCourse.CourseID " +
         "JOIN Student ON StudentInCourse.StudentID = Student.ID " +
         "WHERE Course.ID = " + id,
  function(err, rows) {
    console.log('one course fetched, id = ' + id);
    res.render('entities/courses/profile', { title: rows[0].CourseName, data: rows });
  });
});

module.exports = router;
