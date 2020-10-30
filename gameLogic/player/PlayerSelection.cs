using System;
using Newtonsoft.Json;

namespace player
{
    public class PlayerSelection
    {
        [JsonProperty("PlayerChoice")]
        public string PlayerChoice { get; set; }

        [JsonProperty("UserName")]
        public string UserName { get; set; }

        public PlayerSelection()
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
