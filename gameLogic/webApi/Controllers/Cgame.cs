using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Data.SqlClient;
using gameClass;
using player;
using LeaderboardLine;

namespace webApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CgameController : ControllerBase
    {
        List<LeaderbrdLine> Leaderboard = new List<LeaderbrdLine>();

        [JsonProperty("GamePlayed")]
        public Game GamePlayed { get; set; }

        [JsonProperty("Player")]
        public Player Player { get; set; }
        

        public CgameController()
        {
            this.GamePlayed = new Game();
            this.Player = new Player();
        }

        [HttpPost("PostSelection")]
        public Game determineWinner([FromBody] PlayerSelection p)
        {
            //if this user is already in the database then just play else insert them into the player table
            if(this.Player.doesExist(p) == null){
                this.Player.addPlayer(p);
            }

            //insert this game into the game table in the database
            this.GamePlayed.getGameResultAgainstCPU(p);
            this.GamePlayed.addGame(this.GamePlayed);

            return this.GamePlayed;
        }

        [HttpGet("Leaderboard")]
        public List<LeaderbrdLine> getLeaderboard(){
            string connectionString = @"Data Source=rpsdp.ctvssf2oqpbl.us-east-1.rds.amazonaws.com;
            Initial Catalog=TEST;User ID=admin; Password=kereneritrea";
            SqlConnection con = new SqlConnection(connectionString);
            
            string queryString = "SELECT * FROM Leaderboard ORDER BY [Win Ratio] DESC";

            SqlCommand command = new SqlCommand(queryString, con);
            con.Open();

            using(SqlDataReader reader = command.ExecuteReader()){
                 while(reader.Read()){

                    Leaderboard.Add(
                        new LeaderbrdLine(reader[0].ToString(), (int)reader[1], (int)reader[2])
                    );
                }
            }

            return Leaderboard;
        }

    }
}