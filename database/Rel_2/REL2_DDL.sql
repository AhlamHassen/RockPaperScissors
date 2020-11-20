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
  GameRound         INT CHECK(GameRound IN (1, 3, 5)),
  GameResult        NVARCHAR(100) CHECK(GameResult IN('W','L','D')),
  PRIMARY KEY       (userName, DateTimePlayed),
  FOREIGN KEY       (userName) REFERENCES Player
);

CREATE TABLE [Round] (
  userName          NVARCHAR(100),
  DateTimePlayed    DATETIME,
  RoundNumber       INT CHECK(RoundNumber IN (1, 2, 3, 4, 5)),
  PlayerChoice      NVARCHAR(100) CHECK(PlayerChoice IN('rock', 'paper', 'scissors')),
  CpuChoice         NVARCHAR(100) CHECK(CpuChoice IN('rock', 'paper', 'scissors')),
  PRIMARY KEY       (userName, DateTimePlayed, RoundNumber),
  FOREIGN KEY       (userName, DateTimePlayed) REFERENCES Game,
  FOREIGN KEY       (PlayerChoice) REFERENCES Selection (choice),
  FOREIGN KEY       (CpuChoice) REFERENCES Selection (choice)
);







