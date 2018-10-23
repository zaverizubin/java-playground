using System;

namespace Factory_Pattern.Factory1.Autos
{
    class NullAuto : IAuto
    {
        public void TurnOn()
        {
            Console.WriteLine("This is not a valid car.");
        }

        public void TurnOff()
        {
            Console.WriteLine("This is not a valid car.");
        }
    }
    
}
