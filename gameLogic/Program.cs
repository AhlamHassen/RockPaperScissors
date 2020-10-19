using System;
using gameLogic.modules;

namespace gameLogic
{
    class Program
    {
        static void Main(string[] args)
        {
            Player p1 = new Player();
            string p = p1.PlayerChoice = "rock";

            Game g1 = new Game();
            string result = g1.getGameResultAgainstCPU(p);
            Console.WriteLine(result);
            
        }
    }
}
