using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LINQ
{
    class Concatenation
    {
        class Pet
        {
            public string Name { get; set; }
            public int Age { get; set; }
        }

        public void Concat()
        {
            Pet[] cats = { new Pet { Name="Barley", Age=8 },
                   new Pet { Name="Boots", Age=4 },
                   new Pet { Name="Whiskers", Age=1 } };

            Pet[] dogs = { new Pet { Name="Bounder", Age=3 },
                   new Pet { Name="Snoopy", Age=14 },
                   new Pet { Name="Fido", Age=9 } };

            IEnumerable<string> query = cats.Concat(dogs).Select(pet => pet.Name);

            foreach (var name  in query)
            {
                 Console.WriteLine(name);
            }


        }
    }
}
