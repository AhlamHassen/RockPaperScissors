using System;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace RoundClass
{
    public class Round
    {
        [JsonProperty("UserName")]
        public string UserName { get; set; }

        [JsonProperty("DateTime")]
        public DateTime DateTimePlayed { get; set; }

        [JsonProperty("RoundNumber")]
        public int RoundNumber { get; set; }

        [JsonProperty("PlayerChoice")]
        public string PlayerChoice { get; set; }

        [JsonProperty("CpuChoice")]
        public string CpuChoice { get; set; }

        
        public Round(){
            this.UserName = "";
            this.DateTimePlayed = DateTime.Now;
            this.RoundNumber = 0;
            this.PlayerChoice = "";
            this.CpuChoice = "";
        }

        public void addRound(List<Round> rounds){
            string connectionString = @"Data Source=rpsdp.ctvssf2oqpbl.us-east-1.rds.amazonaws.com;
            Initial Catalog=TEST;User ID=admin; Password=kereneritrea";
            SqlConnection con = new SqlConnection(connectionString);

            foreach(Round r in rounds){
                string queryString = "INSERT INTO [Round] (userName, DateTimePlayed, RoundNumber, PlayerChoice, CpuChoice)";
                queryString += "VALUES (@userName, @date, @round, @playerChoice, @cpuChoice)";

                SqlCommand command = new SqlCommand(queryString, con);
                command.Parameters.AddWithValue("@userName", r.UserName);
                command.Parameters.AddWithValue("@date", r.DateTimePlayed);
                command.Parameters.AddWithValue("@round", (int)r.RoundNumber);
                command.Parameters.AddWithValue("@playerChoice", r.PlayerChoice);
                command.Parameters.AddWithValue("@cpuChoice", r.CpuChoice);

                con.Open();
                command.ExecuteNonQuery();
                con.Close();

            }

        }
    }
}
