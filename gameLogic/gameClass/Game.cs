using System;
using Newtonsoft.Json;
using System.Data.SqlClient;
using CompClass;
using player;
using System.Collections.Generic;
using RoundClass;

namespace gameClass
{
    public class Game
    {
        [JsonProperty("Player")]
        public Player Player1 { get; set; }

        [JsonProperty("DateTime")]
        public DateTime DateTimePlayed { get; set; }

        [JsonProperty("GameRound")]
        public int GameRound { get; set; }

        [JsonProperty("PlayerSelections")]
        public List<string> PlayerSelections { get; set; }

        [JsonProperty("CpuSelections")]
        public List<string> CpuSelections { get; set; }

        [JsonProperty("GameResult")]
        public string GameResult { get; set; }


        public Game()
        {
            this.Player1 = null;
            this.DateTimePlayed = DateTime.Now;
            this.PlayerSelections = new List<string>();
            this.CpuSelections = new List<string>();
            this.GameResult = "";
        }

        public List<Round> getGameResultAgainstCPU(PlayerSelection player)
        {
            this.Player1 = new Player(player.UserName);
            this.DateTimePlayed = DateTime.Now;
            this.PlayerSelections = player.PlayerSelections;
            this.GameRound = player.GameRound;

            var round = 1;
            var pSelection = 0;
            var CpuChoice = "";

            var drawCount = 0;
            var playerWinCount = 0;
            var CpuWinCount = 0;
            List<Round> rounds = new List<Round>();

            while(round <= this.PlayerSelections.Count){
                CPU cp = new CPU();
                CpuChoice = cp.generateCpuChoice();
                this.CpuSelections.Add(CpuChoice);

                Round rnd = new Round();
                rnd.UserName = this.Player1.UserName;
                rnd.DateTimePlayed = DateTime.Now;
                rnd.RoundNumber = round;
                rnd.PlayerChoice = this.PlayerSelections[pSelection];
                rnd.CpuChoice = CpuChoice;

                if (rnd.PlayerChoice == CpuChoice)
                {
                    drawCount++;
                }
                else
                {
                    switch (rnd.PlayerChoice)
                    {
                        case "rock":
                            if (CpuChoice == "paper")
                            {
                                CpuWinCount++;
                            }
                            else
                            {
                                playerWinCount++;
                            }
                            break;

                        case "paper":
                            if (CpuChoice == "rock")
                            {
                                playerWinCount++;
                            }
                            else
                            {
                                CpuWinCount++;
                            }
                            break;

                        case "scissors":
                            if (CpuChoice == "paper")
                            {
                                playerWinCount++;
                            }
                            else
                            {
                                CpuWinCount++;
                            }

                            break;

                    }
                }

                round++;
                pSelection++;
                rounds.Add(rnd);
            }    

            if(playerWinCount == CpuWinCount){
                this.GameResult = "Draw";
            }
            else if(playerWinCount > CpuWinCount){
                this.GameResult = "Win";
            }
            else{
                this.GameResult = "Lose";
            }

            return rounds;
        }

        public void addGame(Game g){
            string connectionString = @"Data Source=rpsdp.ctvssf2oqpbl.us-east-1.rds.amazonaws.com;
            Initial Catalog=TEST;User ID=admin; Password=kereneritrea";
            SqlConnection con = new SqlConnection(connectionString);

            string queryString = "INSERT INTO Game (userName, DateTimePlayed, GameRound, GameResult)"; 
            queryString += "VALUES (@userName, @date, @gameRound, @gameResult)";

            var letter = "";
            switch (g.GameResult)
            {
                case "Win":
                    letter = "W";
                    break;

                case "Lose":
                    letter = "L";
                    break;

                case "Draw":
                    letter = "D";
                    break;
            }
            
            SqlCommand command = new SqlCommand(queryString, con);
            command.Parameters.AddWithValue("@userName", g.Player1.UserName);
            command.Parameters.AddWithValue("@date", g.DateTimePlayed);
            command.Parameters.AddWithValue("@gameRound", (int)g.GameRound);
            command.Parameters.AddWithValue("@gameResult", letter);

            con.Open();
            command.ExecuteNonQuery();
            con.Close();
        }

        
    }
}
