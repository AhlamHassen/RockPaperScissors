using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using gameClass;
using player;

namespace webApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CgameController : ControllerBase
    {
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
            return this.GamePlayed;
        }

    }
}