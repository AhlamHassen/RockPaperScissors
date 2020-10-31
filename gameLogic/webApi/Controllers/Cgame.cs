using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using gameClass;
using player;
using LeaderboardLine;

namespace webApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CgameController : ControllerBase
    {
        static List<LeaderbrdLine> Leaderboard = new List<LeaderbrdLine>(){
            new LeaderbrdLine("amiiy123", 52, 60),
            new LeaderbrdLine("asd123", 45, 87),
            new LeaderbrdLine("ram2000", 44, 82)
        };

        [JsonProperty("GamePlayed")]
        public Game GamePlayed { get; set; }

        public CgameController()
        {
            this.GamePlayed = new Game();
        }

        [HttpPost("PostSelection")]
        public Game determineWinner([FromBody] PlayerSelection p)
        {
            //if this p.username is already in a database then just play else insert them into the player table
            this.GamePlayed.getGameResultAgainstCPU(p);
            //insert this game into the game/turn table in the database
            return this.GamePlayed;
        }

        [HttpGet("Leaderboard")]
        public List<LeaderbrdLine> getLeaderboard(){
            return Leaderboard;
        }

    }
}