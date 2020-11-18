using System;
using Newtonsoft.Json;

namespace RoundClass
{
    public class Round
    {
        [JsonProperty("UserName")]
        public string UserName { get; set; }

        [JsonProperty("DateTime")]
        public DateTime DateTimePlayed { get; set; }

        [JsonProperty("RoundNumber")]
        public int RoundNumber { get; set; }

        [JsonProperty("PlayerChoice")]
        public string PlayerChoice { get; set; }

        [JsonProperty("CpuChoice")]
        public string CpuChoice { get; set; }

        
        public Round(){
            this.UserName = "";
            this.DateTimePlayed = DateTime.Now;
            this.RoundNumber = 0;
            this.PlayerChoice = "";
            this.CpuChoice = "";
        }
    }
}
