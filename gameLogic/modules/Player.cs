using Newtonsoft.Json;

namespace gameLogic.modules
{
    public class Player
    {
        [JsonProperty("PlayerChoice")]
        public string PlayerChoice { get; set; }

        public Player(){
            this.PlayerChoice = "";
        }
    }
}