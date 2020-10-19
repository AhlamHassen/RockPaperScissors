using System;
using Newtonsoft.Json;

namespace gameLogic.modules
{
    public class CPU
    {
        [JsonProperty("CpuChoice")]
        public string CpuChoice {get; set;}

        public CPU(){
            this.CpuChoice = this.generateCpuChoice();
        }

        public string generateCpuChoice(){
            string[] gameChoices = new string [3]{"rock", "paper", "scissors"};
            Random rand = new Random();
            int genRand = rand.Next(0, 3);

            return gameChoices[genRand];
        }

        public string getCpuChoice(){
            return this.CpuChoice;
        }
    }
}