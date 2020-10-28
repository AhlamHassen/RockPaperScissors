using System;
using Newtonsoft.Json;

namespace player
{
    public class Player
    {
        [JsonProperty("PlayerChoice")]
        public string PlayerChoice { get; set; }

        [JsonProperty("UserName")]
        public string UserName { get; set; }

        public Player()
        {
            this.PlayerChoice = "";
            this.UserName = "";
        }

        public string getPlayerChoice()
        {
            return this.PlayerChoice;
        }
    }
}
