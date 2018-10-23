using System;

namespace Factory_Pattern.Factory1.Autos
{
    class Bmw:IAuto
    {
        public void TurnOn()
        {
            Console.WriteLine("BMW turned On");
        }

        public void TurnOff()
        {
            Console.WriteLine("BMW turned Off");
        }
    }
}
