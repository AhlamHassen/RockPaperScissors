using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Data.SqlClient;
using gameClass;
using player;
using LeaderboardLine;
using Microsoft.Extensions.Configuration;

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

        SqlConnectionStringBuilder stringBuilder = new SqlConnectionStringBuilder();
        IConfiguration  configuration;
        string connectionString = "";
        
        public CgameController(IConfiguration iconfig)
        {
            this.GamePlayed = new Game();
            this.Player = new Player();

            this.configuration = iconfig;
            //use the configuration to retrieve connection string from appsetting.js
            this.connectionString = this.configuration.GetSection("ConnectionString").Value;

            //using the string builder to build string connction
            // this.stringBuilder.DataSource = this.configuration.GetSection("DbConnectionString").GetSection("url").Value;
            // this.stringBuilder.InitialCatalog = this.configuration.GetSection("DbConnectionString").GetSection("db").Value;
            // this.stringBuilder.UserID = this.configuration.GetSection("DbConnectionString").GetSection("user").Value;
            // this.stringBuilder.Password = this.configuration.GetSection("DbConnectionString").GetSection("password").Value;

            // this.connectionString = this.stringBuilder.ConnectionString;
        }

        [HttpPost("PostSelection")]
        public Game determineWinner([FromBody] PlayerSelection p)
        {
            //if this user is already in the database then just play else insert them into the player table
            // if(this.Player.doesExist(p) == null){
            //     this.Player.addPlayer(p);
            // }

            //insert this game into the game table in the database
            this.GamePlayed.getGameResultAgainstCPU(p);
            // this.GamePlayed.addGame(this.GamePlayed);

            return this.GamePlayed;
        }

        [HttpGet("Leaderboard")]
        public List<LeaderbrdLine> getLeaderboard(){
            SqlConnection con = new SqlConnection(this.connectionString);
            
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