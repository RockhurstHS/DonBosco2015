CREATE TABLE Teacher(
    ID AUTOINCREMENT PRIMARY KEY NOT NULL,
    FirstName               VARCHAR(40) NOT NULL,
    MiddleInitial           VARCHAR(1),
    LastName                VARCHAR(100) NOT NULL,
    Email                   VARCHAR(100),
    PhoneNumber             VARCHAR(20),
    Gender                  TEXT
);

CREATE TABLE Course(
    ID AUTOINCREMENT PRIMARY KEY NOT NULL,
    TeacherID               INT,
    CourseName              VARCHAR(40),
    TimeHeld                VARCHAR(20),
    FOREIGN KEY(TeacherID) REFERENCES Teacher(ID)
);

CREATE TABLE Student(
    ID AUTOINCREMENT PRIMARY KEY NOT NULL,
    FirstName               VARCHAR(30) NOT NULL,
    MiddleInitial           VARCHAR(1),
    LastName                VARCHAR(100) NOT NULL,
    SSN                     VARCHAR(11),
    RegistrationDate        TEXT NOT NULL,
    MaritalStatus           VARCHAR(20),
    Email                   VARCHAR(100),
    PhoneNumber             VARCHAR(30),
    DOB                     TEXT,
    NativeLanguage          TEXT,
    Gender                  TEXT,
    Street                  VARCHAR(120),
    City                    VARCHAR(50),
    State                   VARCHAR(40),
    Zip                     VARCHAR(10),
    Region                  VARCHAR(50),
    Country                 VARCHAR(50),
    PFirstName              VARCHAR(30),
    PMiddleInitial          VARCHAR(1),
    PLastName               VARCHAR(100),
    Relation                VARCHAR(20),
    PPhoneNumber            VARCHAR(30),
    PEmail                  VARCHAR(100)
);

CREATE TABLE Test(
    ID AUTOINCREMENT PRIMARY KEY NOT NULL,
    TestName                TEXT NOT NULL,
    TestDate                TEXT NOT NULL
);

CREATE TABLE Gradebook(
    ID AUTOINCREMENT PRIMARY KEY NOT NULL,
    StudentID               INT NOT NULL,
    TestID                  INT NOT NULL,
    Score                   INT,
    FOREIGN KEY (StudentID) REFERENCES Student(ID),
    FOREIGN KEY (TestID) REFERENCES Test(ID)
);

CREATE TABLE StudentInCourse(
    StudentID               INT NOT NULL,
    CourseID                INT NOT NULL,
    PRIMARY KEY (StudentID, CourseID),
    FOREIGN KEY (StudentID) REFERENCES Student(ID),
    FOREIGN KEY (CourseID) REFERENCES Course(ID)
);