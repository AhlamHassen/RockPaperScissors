using System;
using Newtonsoft.Json;

namespace LeaderboardLine
{
    public class LeaderbrdLine
    {
        [JsonProperty("UserName")]
        public string UserName { get; set; }

        [JsonProperty("WinRatio")]
        public int WinRatio { get; set; }

        
        [JsonProperty("TurnsPlayed")]
        public int TurnsPlayed { get; set; }

        public LeaderbrdLine(){
            this.UserName = "";
            this.WinRatio = 0;
            this.TurnsPlayed = 0;
        }

        public LeaderbrdLine(string username, int ratio, int turns){
            this.UserName = username;
            this.WinRatio = ratio;
            this.TurnsPlayed = turns;
        }
    }
}
