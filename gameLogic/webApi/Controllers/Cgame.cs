using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using gameClass;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
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

        [HttpPost]
        public Game determineWinner([FromBody] Player p)
        {
            this.GamePlayed.getGameResultAgainstCPU(p);
            return this.GamePlayed;
        }

    }
}