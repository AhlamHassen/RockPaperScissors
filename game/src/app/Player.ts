export interface Game{
    player1: Player;
    dateTimePlayed : Date;
    gameRound : number;
    playerSelections : string[];
    cpuSelections : string[];
    gameResult : string;
}

export interface Player{
    userName : string;
}

export interface PlayerSelection{
    userName : string;
    gameRound : number;
    playerSelections : string[]; 
}

export interface LeaderboardLine{
    userName : string;
    winRatio : number;
    turnsPlayed : number;
}
