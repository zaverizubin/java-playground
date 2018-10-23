using System;

namespace State_Pattern
{
    class Program
    {
        static void Main(string[] args)
        {
            var chain = new CeilingFanPullChain();
            while (true) {
                Console.WriteLine("Press ENTER to change state");
                Console.ReadKey();
                chain.Pull();
            }

        }
    }
}
