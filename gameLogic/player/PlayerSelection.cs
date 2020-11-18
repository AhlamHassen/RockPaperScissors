using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace player
{
    public class PlayerSelection
    {
        [JsonProperty("UserName")]
        public string UserName { get; set; }

        [JsonProperty("GameRound")]
        public int GameRound { get; set; }

        [JsonProperty("PlayerSelections")]
        public List<string> PlayerSelections { get; set; }
        

        public PlayerSelection()
        {   
            this.UserName = "";
            this.PlayerSelections = new List<string>();
            this.GameRound = 0; 
        }

        public List<string> getPlayerChoice()
        {
            return this.PlayerSelections;
        }
    }
}
