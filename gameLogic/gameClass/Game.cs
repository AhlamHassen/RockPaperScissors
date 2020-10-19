using System;
using Newtonsoft.Json;
using CompClass;

namespace gameClass
{
    public class Game
    {
        [JsonProperty("GameResult")]
        public string GameResult { get; set; }

        public Game(string gameResult)
        {
            this.GameResult = gameResult;

        }

        public Game()
        {
            this.GameResult = "";
        }

        public string getGameResultAgainstCPU(string playerChoice)
        {
            string pChoice = playerChoice;
            CPU cp = new CPU();
            string cpChoice = cp.generateCpuChoice();

            if (pChoice == cpChoice)
            {
                return "Draw";
            }
            else
            {
                switch (pChoice)
                {
                    case "rock":
                        if (cpChoice == "paper")
                        {
                            this.GameResult = "Loose";
                        }
                        else
                        {
                            this.GameResult = "Win";
                        }
                        break;

                    case "paper":
                        if (cpChoice == "rock")
                        {
                            this.GameResult = "Win";
                        }
                        else
                        {
                            this.GameResult = "Loose";
                        }
                        break;

                    case "scissors":
                        if (cpChoice == "paper")
                        {
                            this.GameResult = "Win";
                        }
                        else
                        {
                            this.GameResult = "Loose";
                        }

                        break;


                }
            }

            return this.GameResult;
        }
    }
}
