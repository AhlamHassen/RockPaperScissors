using System;
using Newtonsoft.Json;

namespace player
{
    public class Player
    {
        [JsonProperty("UserName")]
        public string UserName { get; set; }

        public Player(string username){
            this.UserName = username;
        }
    }
}