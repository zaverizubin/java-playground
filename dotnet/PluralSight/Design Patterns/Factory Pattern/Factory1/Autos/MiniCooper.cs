using System;

namespace Factory_Pattern.Factory1.Autos
{
    class MiniCooper:IAuto
    {
        public void TurnOn()
        {
            Console.WriteLine("MiniCooper turned On");
        }

        public void TurnOff()
        {
            Console.WriteLine("MiniCooper turned Off");
        }
    }
}
