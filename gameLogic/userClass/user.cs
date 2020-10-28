using System;
using Newtonsoft.Json;

namespace userClass
{
    public class User
    {
        [JsonProperty("username")]
        public string username { get; set;}

        [JsonProperty("gamesPlayed")]
        public int gamesPlayed { get; set;}

        [JsonProperty("gamesWon")]
        public int gamesWon { get; set;}

        public User(string username){
            this.username = username;
            this.gamesPlayed = 0;
            this.gamesWon = 0;
        }

    }
}
