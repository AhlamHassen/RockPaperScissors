USE TEST;

SELECT
  *
FROM
  TEST.INFORMATION_SCHEMA.TABLES
WHERE
  TABLE_TYPE = 'BASE TABLE';
GO

CREATE TABLE Player (
    userName          NVARCHAR(100),
    PRIMARY KEY       (userName)
);

CREATE TABLE Selection (
    choice            NVARCHAR(100),
    PRIMARY KEY       (choice)
);

CREATE TABLE Game (
    userName          NVARCHAR(100),
    DateTimePlayed    DATETIME,
    playerchoice      NVARCHAR(100) CHECK(playerchoice IN('rock', 'paper', 'scissors')),
    Cpuchoice         NVARCHAR(100) CHECK(Cpuchoice IN('rock', 'paper', 'scissors')),
    PRIMARY KEY       (userName, DateTimePlayed),
    FOREIGN KEY       (userName) REFERENCES Player,
    FOREIGN KEY       (playerchoice) REFERENCES Selection (choice),
    FOREIGN KEY       (Cpuchoice) REFERENCES Selection (choice)
);




