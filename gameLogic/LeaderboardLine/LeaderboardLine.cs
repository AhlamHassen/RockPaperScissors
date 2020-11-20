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

        [JsonProperty("TurnsPlayed")]
        public string Last5Games { get; set; }

        public LeaderbrdLine(){
            this.UserName = "";
            this.WinRatio = 0;
            this.TurnsPlayed = 0;
            this.Last5Games = "";
        }

        public LeaderbrdLine(string username, int ratio, int turns, string last5){
            this.UserName = username;
            this.WinRatio = ratio;
            this.TurnsPlayed = turns;
            this.Last5Games = last5;
        }
    }
}
