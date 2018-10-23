using System;

namespace NullObjectPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            var autoRepository = new AutoRepository();

            var automobile = autoRepository.Find("MiniCooper");
            automobile.Start();
            automobile.Stop();

            automobile = autoRepository.Find("Cooper");
            automobile.Start();
            automobile.Stop();

            Console.ReadKey();

        }
    }
}
