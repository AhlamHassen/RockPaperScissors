export interface Game{
    player1: Player;
    dateTimePlayed : Date;
    playerChoice : string;
    cpuChoice : string;
    gameResult : string;
}

export interface Player{
    userName : string;
}

export interface PlayerSelection{
    userName : string;
    playerChoice : string; 
}