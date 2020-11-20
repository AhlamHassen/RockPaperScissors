USE TEST;

-- To see all tables in a database
SELECT * FROM TEST.INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE';
GO

-- inserted data for reference by
INSERT INTO Selection (choice) VALUES
('rock'),
('paper'),
('scissors');


CREATE VIEW oldLeaderboard AS 
SELECT P.userName AS Username, CONVERT (INT , ((CAST(ISNULL(W.winNum, 0) as DECIMAL) / P.numPlayed)* 100) )
AS [Win Ratio], P.numPlayed AS [Turns Played]
FROM
( 
    SELECT userName, Count(*) AS winNum 
    FROM   [Round]
    WHERE  ((PlayerChoice = 'paper' AND CpuChoice = 'rock')
    OR     (PlayerChoice = 'scissors' And CpuChoice = 'paper')
    OR     (PlayerChoice = 'rock' And CpuChoice = 'scissors'))
    GROUP BY userName 
) W
RIGHT JOIN
(
    SELECT userName, Count(*) AS numPlayed
    FROM [Round]
    GROUP BY userName
) P
ON W.userName = P.userName;


-- CREATE VIEW Last5Games AS
SELECT userName, string_agg(GameResult, '') AS Last5
FROM   Game
GROUP BY userName;


CREATE VIEW Leaderboard AS
SELECT l.userName, l.[Win Ratio], l.[Turns Played], RIGHT (f.Last5, 5) As [Last 5 Games]
from oldLeaderboard l
Inner Join Last5Games f
on l.userName = f.userName;









