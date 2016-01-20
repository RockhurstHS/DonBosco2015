-- written for SQLite3

PRAGMA foreign_keys = ON;

DELETE FROM Tests;
DELETE FROM StudentInCourse;
DELETE FROM Gradebook;
DELETE FROM Student;
DELETE FROM Course;
DELETE FROM Teacher;

DROP TABLE Tests;
DROP TABLE StudentInCourse;
DROP TABLE Gradebook;
DROP TABLE Student;
DROP TABLE Course;
DROP TABLE Teacher;

CREATE TABLE Teacher(
    ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    FirstName               NVARCHAR(40) NOT NULL,
    MiddleInitial           VARCHAR(1),
    LastName                NVARCHAR(100) NOT NULL,
    Email                   NVARCHAR(100),
    PhoneNumber             NVARCHAR(20),
    Gender                  TEXT
);

CREATE TABLE Course(
    ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    TeacherID               INTEGER,
    CourseName              VARCHAR(40),
    TimeHeld                VARCHAR(20),
    FOREIGN KEY(TeacherID) REFERENCES Teacher(ID)
);

CREATE TABLE Student(
    ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    FirstName               NVARCHAR(30) NOT NULL,
    MiddleInitial           VARCHAR(1),
    LastName                NVARCHAR(100) NOT NULL,
    SSN                     NVARCHAR(11),
    RegistrationDate        TEXT NOT NULL,
    MaritalStatus           VARCHAR(20),
    Email                   NVARCHAR(100),
    PhoneNumber      NVARCHAR(30),
    DOB                     TEXT,
    NativeLanguage          TEXT,
    Gender                  TEXT,
    Street                  NVARCHAR(120),
    City                    NVARCHAR(50),
    State                   NVARCHAR(40),
    Zip                     NVARCHAR(10),
    Region                  NVARCHAR(50),
    Country                 NVARCHAR(50),
    PFirstName              NVARCHAR(30),
    PMiddleInitial          NVARCHAR(1),
    PLastName               NVARCHAR(100),
    Relation                NVARCAHR(20),
    PPhoneNumber             NVARCHAR(30),
    PEmail                   NVARCHAR(100)
);

/* sam said this isn't needed anymore
CREATE TABLE Test(
    ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    TestName                TEXT NOT NULL,
    TestDate                TEXT NOT NULL
);
*/

CREATE TABLE Gradebook(
    ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    StudentID               INTEGER NOT NULL,
    TestID                  INTEGER NOT NULL,
    Score                   INTEGER,
    FOREIGN KEY (StudentID) REFERENCES Student(ID),
    FOREIGN KEY (TestID) REFERENCES Test(ID)
);

CREATE TABLE StudentInCourse(
    StudentID               INTEGER NOT NULL,
    CourseID                INTEGER NOT NULL,
    PRIMARY KEY (StudentID,CourseID),
    FOREIGN KEY (StudentID) REFERENCES Student(ID),
    FOREIGN KEY (CourseID) REFERENCES Course(ID)
);

/* subject tables not needed - they are static
 CREATE TABLE Reading(
    TestNumber                         INTEGER,
    TestLetter                         VARCHAR(1),
    NumbersAndNumeracyTerms            TEXT,
    MorphemesAndSyntax                 TEXT,
    WordsAndPhrases                    TEXT,
    SameMeaning                        TEXT,
    OppositeMeaning                    TEXT,
    AppropriateAssociatedInformation   TEXT,
    IdentifyInformation                TEXT,
    ConstructMeaning                   TEXT,
    ExtendMeaning                      TEXT
);

 CREATE TABLE Listening(
  TestNumber INTEGER,
  TestLetter VARCHAR(1),
  NumberandNumberTerms TEXT,
  DiscernSounds TEXT,
  Details TEXT,
  StatedConcepts TEXT,
  IdiomsExpressions TEXT,
  DetermineRoles TEXT,
  Instructions TEXT,
  CauseEffect TEXT,
  FactOpinion TEXT,
  MainIdea TEXT,
  Forecast TEXT,
  SpeakerPurpose TEXT
);

 CREATE TABLE Writing(
    TestNumber INTEGER,
    TestLetter VARCHAR(1),
    NumbersandNumercay      TEXT,
    VerbPhrases             TEXT,
    NounPhrases             TEXT,
    WritingConventions      TEXT,
    SentenceFormation       TEXT,
    SentenceCoherence       TEXT,
    WriteToDescribe         TEXT,
    WriteToAcomplishTasks   TEXT,
    ExtendedWriting         TEXT
);

Create Table Speaking(
  TestNumber                            INTEGER,
  TestLetter                            VARCHAR(1),
  NumbersAndNumeracyTerms               TEXT,
  GreetingsInquiriesLeaveTakings        TEXT,
  PhoneCompetency                       TEXT,
  ExpressOpinion                        TEXT,
  InstructionsDirectionsLocations       TEXT,
  Descriptions                          TEXT,
  NarrateParaphraseEvents               TEXT,
  RequestsPermission                    TEXT,
  ExpressDissatifactionApology          TEXT,
  NegotiateMeaning                      TEXT
);
*/

 CREATE TABLE Tests(
  ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  StudentID INTEGER NOT NULL,
  CourseID INTEGER NOT NULL,
  Subject TEXT NOT NULL,
  TestNumber INTEGER NOT NULL,
  TestLetter VARCHAR(1) NOT NULL,
  P1 BOOLEAN,
  P2 BOOLEAN,
  P3 BOOLEAN,
  P4 BOOLEAN,
  P5 BOOLEAN,
  P6 BOOLEAN,
  P7 BOOLEAN,
  P8 BOOLEAN,
  P9 BOOLEAN,
  P10 BOOLEAN,
  P11 BOOLEAN,
  P12 BOOLEAN,
  P13 BOOLEAN,
  P14 BOOLEAN,
  P15 BOOLEAN,
  P16 BOOLEAN,
  P17 BOOLEAN,
  P18 BOOLEAN,
  P19 BOOLEAN,
  P20 BOOLEAN,
  P21 BOOLEAN,
  P22 BOOLEAN,
  P23 BOOLEAN,
  P24 BOOLEAN,
  P25 BOOLEAN,
  FOREIGN KEY (StudentID) REFERENCES Student(ID),
  FOREIGN KEY (CourseID) REFERENCES Course(ID)
);



/*Gradebook values VERRY IMPORTANT DO NOT ERASE 
INSERT INTO Reading(TestNumber, TestLetter, NumbersAndNumeracyTerms, MorphemesAndSyntax, WordsAndPhrases, SameMeaning, OppositeMeaning, AppropriateAssociatedInformation, IdentifyInformation, ConstructMeaning, ExtendMeaning)
VALUES(1, 'A', '1,3,5,8', '', '2,4,6,7,9', '', '', '13,14,17', '10,11,12,15,18,19,20,21,23,25', '16,22,24',''),
(1, 'B', '2,3,10,12', '', '1,4,5,6,7,8', '', '', '16,22', '13,14,15,18,19,20,21,23,24,25', '9,11,17', ''),
(2, 'A', '3,4,8,9,12,18,22', '10', '6,17,21', '11', '', '25', '1,2,5,14,15,16,19,20', '7,13,23,24', ''),
(2, 'B', '1,7,10,22', '20', '2,24,25', '15,21', '', '8,11,12,19', '3,4,5,9,13,14,17,23', '6,16,18', ''),
(3, 'A', '4,9,14,15', '11,13,21', '8,19', '3,20', '25', '10', '1,6,12,22', '5,7,16,23,24', '2,17,18'),
(3, 'B', '6,11,16,17', '15,22,25', '4', '9,21', '5', '13,20', '1,7,14,18', '2,3,8,23,24', '10,12,19'),
(4, 'A', '5,8,12,16', '1,9,21', '20,22', '15,19', '', '4,6,14', '2,3,10,13,17,23', '11,18,24,25', '7'),
(4, 'B', '3,4,8,11', '18', '1,21,25', '14,15,23', '19', '7,17', '9,20,24', '6,10,13,16', '2,5,12,22');


INSERT INTO Listening(TestNumber, TestLetter, NumberandNumberTerms, DiscernSounds, Details, StatedConcepts, IdiomsExpressions, DetermineRoles, Instructions, CauseEffect, FactOpinion, MainIdea, Forecast, SpeakerPurpose)
VALUES(1, 'A', '1,2,3,5', '8,9,10', '14,17,20', '11,23', '21', '4,18', '6,7', '24', '', '12,15,25', '13,16', '19,22'),
(1, 'B', '3,4,20,23', '13,14,15,16', '22', '17', '5,10', '6,19', '1,2,7', '18,25', '', '21,24', '9', '8,11,12'),
(2, 'A', '1,2,3,4,5', '10,11,12', '17', '', '18,20', '6,7,16,21', '8,9', '13,23', '', '14,24', '19,22', '15,25'),
(2, 'B', '1,4,5,19', '10,11,12', '20,24', '23', '7,16', '2,14,17', '3,15', '9', '', '18,21,25', '6,8,22', '13'),
(3, 'A', '1,2,3,4', '', '9,15,19,23', '12,16', '20,21', '7', '5,6,8', '10', '17,24', '11,13,25', '22', '14,18'),
(3, 'B', '1,2,3,4', '', '7,14,15,19,23', '18', '10,17,24', '5,6', '', '11,12', '20', '13,16,22', '8,25', '9,21'),
(4, 'A', '1,2,3,4', '', '11,16,19,22', '12,17,23', '9,13,18,24', '5,6', '7,8', '', '20', '10,14', '21', '15,25'),
(4, 'B', '1,2,3,16', '', '14,15,22,25', '13,20,24', '21', '4,5', '6,17', '8', '9,10', '12,18,23', '7,11', '19');

INSERT INTO Writing(TestNumber,TestLetter,NumbersandNumercay,VerbPhrases,
    NounPhrases,WritingConventions,SentenceFormation,SentenceCoherence,
    WriteToDescribe,WriteToAcomplishTasks,ExtendedWriting)
VALUES (1,'A','1,2,3,5','4,8,11,12','6,7,9,16','10,13,14,15','17,18', '19,20','1,2','3,4','5'),
(1,'B','1,2,3,4','5,8,16,17','6,7,9,15','10,12,13,14','11,18', '19,20','1,2','3,4','5'),
(2,'A','1,2,3,4','5,6,7,10,14','8,9,11','12,13,15','16,17', '18,19,20','1,2','3,4','5'),
(2,'B','1,2,3,4','5,6,8,13,','7,9,12,14,16','11,15', '10,17','18,19,20','1,2','3,4','5'),
(3,'A','1,2,3,7','8,11,13,14','4,5,6','9,10,15','12,16','17,18,19,20', '1,2','3,4','5'),
(3,'B','1,2,3,4','5,6,7','8,9,10,11','14,15','13,16','12,17,19,19,20', '1,2','3,4','5'),
(4,'A','1,2,3,4','7,8,9,13','5,6,15','10,11,12','14,16','17,18,19,20', '1,2','3,4','5'),
(4,'B','1,2,3,4','5,9,10,11','7,8,14,16','6,13','12,15','17,18,19,20', '1,2','3,4','5');

INSERT INTO Speaking(TestNumber,TestLetter,NumbersAndNumeracyTerms,GreetingsInquiriesLeaveTakings,PhoneCompetency,ExpressOpinion,
      InstructionsDirectionsLocations,Descriptions,NarrateParaphraseEvents,RequestsPermission,ExpressDissatifactionApology
      ,NegotiateMeaning)
Values (1, 'A', '1,2,3', '9,10', '11', '', '4,5,6', '', '7,8', '12,13,14', '15', '16'),
(1, 'B', '1,2,3', '9,10', '11', '', '4,5,6', '', '7,8', '12,13,14', '15', '16'),
(2, 'A', '1,2,3', '9', '10', '11', '4,5,6', '', '7,8', '12,13,14', '15', '16'),
(2, 'B', '1,2,3', '9', '10', '11', '4,5,6', '', '7,8', '12,13,14', '15', '16'),
(3, 'A', '1,2,3', '', '9,10', '11', '4,5', '', '6,7,8', '12,13', '14,15', '16'),
(3, 'B', '1,2,3', '', '9,10', '12', '4,5', '', '6,7,8', '11,13', '14,15', '16'),
(4, 'A', '1,2,3', '', '9,10', '7,8', '4,5', '6', '', '11,12', '13,15', '14,16'),
(4, 'B', '1,2,3', '', '9,10', '7,8', '4,5', '6', '', '11,12', '13,14', '15,16');
*/


/*
Begining of values

INSERT INTO Address(Street, City, State, Zip, Country)
VALUES('11540 Cherokee Court','Leawood','KS','66211','USA'),
('5312 Payne Street','Shawnee','Kansas','66226','USA'),
('4003 West 112th Street','Leawood','Kansas','66211','USA'),
('2612 West 112th Street','Leawood','Kansas','66211','USA');

INSERT INTO PrimaryContact(FirstName, MiddleInitial, LastName, Relation, PhoneNumber, Email)
VALUES('Justin','H','Wood','Father','913-481-8858','jwood@gmail.com'),
('Diana','','Henry','Mother','816-797-8929','dianahenry1@mac.com'),
('Sandy','P','Henry','Dog','867-5309','sandyisabeast@gmail.com'),
('Deborah','L','Wilkerson','Mother','123-456-7890','debbiedebbie@debbie.com');

INSERT INTO OriginAddress(Region, Country)
VALUES('Oaxaca','Mexico'),
('Yucatan','Mexico'),
('Durango','Mexico'),
('Jalisco','Mexico');
*/

INSERT INTO Teacher(FirstName, MiddleInitial, LastName, Email, PhoneNumber)
VALUES('Richard','D','Staihr','rstaihr@rockhursths.edu','111-111-1111'),
('John','G','Morris','jmorris@rockhursths.edu','777-777-7777');

INSERT INTO Course(TeacherID, CourseName, TimeHeld)
VALUES('1','How to Swag','Monday 4:20 p.m.'),
('2','Yelling 101','Wednesday 1:00 a.m.'),
('1','Hazing 101','Saturday 6:00 a.m.');

INSERT INTO Student(FirstName, MiddleInitial, LastName, SSN, RegistrationDate, MaritalStatus, Email, PhoneNumber, DOB, NativeLanguage, Gender)
VALUES ('Echo','E','McDonald','999-99-9999','1/5/15','Complicated','echoswag@djkhaled.com','321-234-5932','23/32/4323','Born of Swag','M'),
('Bravo','B','GenericLastName','123-45-6789','1/1/11','YES','email@gmail.com','*123-456-789-0123','1/1/11','White AF','F'),
('Qui','G','Jin','157-56-7890','1/25/1','Jedi','quigonrox@jedi.gov','577-568-235-4575','12/25/0','Courosant','M'),
('Delta','D','Walmart','406-45-8034','1/9/14','Widowed 56 times','none','none','never born','All','F');

/* no longer using this format
INSERT INTO Test(TestName, TestDate)
VALUES('Assesment 1','1/1/11'),
('Assesment 2','2/2/11'),
('Assesment 3','3/3/11');

INSERT INTO Gradebook(StudentID, TestID, Score)
VALUES('1','1','67'),
('1','2','75'),
('1','3','82'),
('2','1','35'),
('2','2','0'),
('2','3','100'),
('3','1','69'),
('3','2','69'),
('3','3','69'),
('4','1','23'),
('4','2','34'),
('4','3','56');
*/

INSERT INTO StudentInCourse(StudentID,CourseID)
VALUES('1','3'),
('2','3'),
('3','2'),
('4','1');


SELECT *
FROM Course
JOIN StudentInCourse ON Course.ID = StudentInCourse.CourseID
JOIN Student ON StudentInCourse.StudentID = Student.ID
WHERE Course.ID = 3

SELECT *
FROM Tests
JOIN Courses ON Tests.CourseID = Course.ID
WHERE Course.ID = 3

SELECT *
FROM Tests
JOIN Course ON Tests.CourseID = Course.ID
JOIN Student ON Tests.StudentID = Student.ID
WHERE Course.ID = 3
ORDER BY Student.LastName, Student.FirstName, Student.ID