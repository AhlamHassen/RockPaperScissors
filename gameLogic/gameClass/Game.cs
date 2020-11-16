﻿using System;
using Newtonsoft.Json;
using System.Data.SqlClient;
using CompClass;
using player;

namespace gameClass
{
    public class Game
    {
        [JsonProperty("Player")]
        public Player Player1 { get; set; }

        [JsonProperty("DateTime")]
        public DateTime DateTimePlayed { get; set; }

        [JsonProperty("PlayerChoice")]
        public string PlayerChoice { get; set; }

        [JsonProperty("CpuChoice")]
        public string CpuChoice { get; set; }

        [JsonProperty("GameResult")]
        public string GameResult { get; set; }


        public Game()
        {
            this.GameResult = "";
            this.CpuChoice = "";
            this.PlayerChoice = "";
            this.Player1 = null;
            this.DateTimePlayed = DateTime.Now;
        }

        public void getGameResultAgainstCPU(PlayerSelection player)
        {
            this.Player1 = new Player(player.UserName);
            this.DateTimePlayed = DateTime.Now;
            this.PlayerChoice = player.PlayerChoice;
            CPU cp = new CPU();
            this.CpuChoice = cp.generateCpuChoice();
            

            if (this.PlayerChoice == this.CpuChoice)
            {
                this.GameResult = "Draw";
            }
            else
            {
                switch (this.PlayerChoice)
                {
                    case "rock":
                        if (this.CpuChoice == "paper")
                        {
                            this.GameResult = "Loose";
                        }
                        else
                        {
                            this.GameResult = "Win";
                        }
                        break;

                    case "paper":
                        if (this.CpuChoice == "rock")
                        {
                            this.GameResult = "Win";
                        }
                        else
                        {
                            this.GameResult = "Loose";
                        }
                        break;

                    case "scissors":
                        if (this.CpuChoice == "paper")
                        {
                            this.GameResult = "Win";
                        }
                        else
                        {
                            this.GameResult = "Loose";
                        }

                        break;

                }
            }

        }

        public void addGame(Game g){
            string connectionString = @"Data Source=rpsdp.ctvssf2oqpbl.us-east-1.rds.amazonaws.com;
            Initial Catalog=TEST;User ID=admin; Password=kereneritrea";
            SqlConnection con = new SqlConnection(connectionString);

            string queryString = "INSERT INTO Game (userName, DateTimePlayed, Playerchoice, Cpuchoice)"; 
            queryString += "VALUES (@userName, @date, @playerChoice, @cpuChoice)";
            
            SqlCommand command = new SqlCommand(queryString, con);
            command.Parameters.AddWithValue("@userName", g.Player1.UserName);
            command.Parameters.AddWithValue("@date", g.DateTimePlayed);
            command.Parameters.AddWithValue("@playerChoice", g.PlayerChoice);
            command.Parameters.AddWithValue("@cpuChoice", g.CpuChoice);

            con.Open();
            command.ExecuteNonQuery();
        }
    }
}
