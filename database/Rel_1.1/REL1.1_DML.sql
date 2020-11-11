USE TEST;

-- inserted data for reference by

-- INSERT INTO Selection (choice) VALUES
-- ('rock'),
-- ('paper'),
-- ('scissors');

-- inserted sample data to player table

-- INSERT INTO Player (userName) VALUES
-- ('amiiy'),
-- ('alae');

-- inserted these sample data

-- INSERT INTO Game (userName, DateTimePlayed, Playerchoice, Cpuchoice) VALUES
-- ('amiiy', '11/09/2020 12:00:00 PM', 'scissors', 'paper'),
-- ('amiiy', '11/11/2020 12:00:00 PM', 'scissors', 'paper'),
-- ('amiiy', '11/09/2020 12:20:00 PM', 'rock', 'paper'),
-- ('amiiy', '11/09/2020 12:20:20 PM', 'rock', 'rock'),
-- ('alae', '11/09/2020 12:21:20 PM', 'rock', 'paper'),
-- ('alae', '11/09/2020 12:21:22 PM', 'scissors', 'paper'),
-- ('alae', '11/09/2020 12:21:25 PM', 'rock', 'scissors');

-- see all tables in a database

-- SELECT
--   *
-- FROM
--   TEST.INFORMATION_SCHEMA.TABLES
-- WHERE
--   TABLE_TYPE = 'BASE TABLE';
-- GO

SELECT * FROM Game;

-- CREATE VIEW Leaderboard AS 
-- SELECT P.userName AS Username, CONVERT (INT , ((CAST(W.winNum AS DECIMAL) / P.numPlayed)* 100) )
-- AS [Win Ratio], P.numPlayed AS [Turns Played]
-- FROM
-- ( 
--     SELECT userName, Count(*) AS winNum 
--     FROM   Game 
--     WHERE  ((playerchoice = 'paper' AND Cpuchoice = 'rock')
--     OR     (playerchoice = 'scissors' And Cpuchoice = 'paper')
--     OR     (playerchoice = 'rock' And Cpuchoice = 'scissors'))
--     GROUP BY userName 
-- ) W
-- INNER JOIN
-- (
--     SELECT userName, Count(*) AS numPlayed
--     FROM Game
--     GROUP BY userName
-- ) P

-- ON W.userName = P.userName;

SELECT * FROM Leaderboard;



