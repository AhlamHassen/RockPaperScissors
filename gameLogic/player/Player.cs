using System;
using Newtonsoft.Json;

namespace player
{
    public class Player
    {
        [JsonProperty("PlayerChoice")]
        public string PlayerChoice { get; set; }

        public Player(){
            this.PlayerChoice = "";
        }

        public string getPlayerChoice(){
            return this.PlayerChoice;
        }
    }
}
