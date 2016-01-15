-- written for SQLite3

PRAGMA foreign_keys = ON;

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

CREATE TABLE Test(
    ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    TestName                TEXT NOT NULL,
    TestDate                TEXT NOT NULL
);

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


/*
Begining of values
*/
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

INSERT INTO Teacher(FirstName, MiddleInitial, LastName, Email, PhoneNumber)
VALUES('Richard','D','Staihr','rstaihr@rockhursths.edu','111-111-1111'),
('John','G','Morris','jmorris@rockhursths.edu','777-777-7777');

INSERT INTO Course(TeacherID, CourseName, TimeHeld)
VALUES('1','How to Swag','Monday 4:20 p.m.'),
('2','Yelling 101','Wednesday 1:00 a.m.'),
('1','Hazing 101','Saturday 6:00 a.m.');

INSERT INTO Student(AddressID, OriginAddressID, FirstName, MiddleInitial, LastName, SSN, RegistrationDate, MaritalStatus, Email, PrimaryPhoneNumber, DOB, NativeLanguage)
VALUES ('1','1','Echo','E','McDonald','999-99-9999','1/5/15','Complicated','echoswag@djkhaled.com','321-234-5932','23/32/4323','Born of Swag'),
('2','2','Bravo','B','GenericLastName','123-45-6789','1/1/11','YES','email@gmail.com','*123-456-789-0123','1/1/11','White AF'),
('3','3','Qui','G','Jin','157-56-7890','1/25/1','Jedi','quigonrox@jedi.gov','577-568-235-4575','12/25/0','Courosant'),
('4','4','Delta','D','Walmart','406-45-8034','1/9/14','Widowed 56 times','none','none','never born','All');

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

INSERT INTO StudentInCourse(StudentID,CourseID)
VALUES('1','3'),
('2','3'),
('3','2'),
('4','1');




