using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuilderPatter
{
    class Program
    {
        static void Main(string[] args)
        {

            var sandwhichMaker1 = new SandwhichMaker(new ToastSandwhichBuilder());
            sandwhichMaker1.BuildSandwhich();
            var sandwhich1 = sandwhichMaker1.GetSandwhich();
            sandwhich1.Display();

            var sandwhichMaker2 = new SandwhichMaker(new ClubSandWhichBuilder());
            sandwhichMaker2.BuildSandwhich();
            var sandwhich2 = sandwhichMaker2.GetSandwhich();
            sandwhich2.Display();

            Console.ReadLine();

        }
    }
}
