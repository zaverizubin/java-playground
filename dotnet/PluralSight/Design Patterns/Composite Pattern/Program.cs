using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Composite
{
    class Program
    {
        static void Main(string[] args)
        {
            var jake = new Person(){Name= "jake"};
            var emily = new Person() { Name = "emily" };
            var sophia = new Person() { Name = "sophia" };
            var brian = new Person() { Name = "brian" };
            var dadBob = new Person() { Name = "dadBob" };
            var sonBob = new Person() { Name = "sonBob" };
            
            var bobs = new Group() { Members = { sonBob, dadBob } };
            var developers = new Group() { Members = { jake, emily, bobs } };
            var parties = new Group() { Members = {developers, sophia, brian} };

            parties.Gold = 1023;
            parties.Stats();

            Console.ReadLine();

        }
    }
}
