using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using gameClass;
using player;
using userClass;

namespace webApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CgameController : ControllerBase
    {
        public List<User> Leaderboard = new List<User>();

        [JsonProperty("GamePlayed")]
        public Game GamePlayed { get; set; }

        public CgameController()
        {
            this.GamePlayed = new Game();
        }

        [HttpPost("PostSelection")]
        public Game determineWinner([FromBody] Player p)
        {
            this.GamePlayed.getGameResultAgainstCPU(p);
            // if (this.Leaderboard.Count > 0)
            // {
            //     foreach (User user in Leaderboard)
            //     {
            //         if (user.username == p.UserName)
            //         {
            //             user.gamesPlayed++;
            //             if (this.GamePlayed.GameResult == "Win")
            //             {
            //                 user.gamesWon++;
            //             }
            //         }
            //         else
            //         {
            //             var newUser = new userClass.User(p.UserName);
            //             newUser.gamesPlayed++;
            //             if (this.GamePlayed.GameResult == "Win")
            //             {
            //                 newUser.gamesWon++;
            //             }
            //             this.Leaderboard.Add(newUser);
            //         }
            //     }
            // }else{
            //     var newUser = new userClass.User(p.UserName);
            //     newUser.gamesPlayed++;
            //     if (this.GamePlayed.GameResult == "Win")
            //     {
            //         newUser.gamesWon++;
            //     }
            //     this.Leaderboard.Add(newUser);
            // }
            
            this.Leaderboard.Add(new userClass.User(p.UserName));

            return this.GamePlayed;
        }

        [HttpGet("Leaderboard")]
        public List<User> getLeaderboard()
        {
            return this.Leaderboard;
        }

    }
}