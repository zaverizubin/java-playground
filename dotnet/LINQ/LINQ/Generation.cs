using System;
using System.Collections.Generic;
using System.Linq;


namespace LINQ
{
    class Generation
    {
        class Pet
        {
            public string Name { get; set; }
            public int Age { get; set; }
        }


        void DefaultIfEmpty()
        {
            var numbers = new List<int>();

            foreach (int number in numbers.DefaultIfEmpty())
            {
                Console.WriteLine(number);
            }

            /*
             This code produces the following output:
             0
            */

            var pets2 = new List<Pet>();
            var defaultPet = new Pet { Name = "Default Pet", Age = 0 };
            foreach (Pet pet in pets2.DefaultIfEmpty(defaultPet))
            {
                Console.WriteLine("\nName: {0}", pet.Name);
            }
            /*
             This code produces the following output:

             Name: Default Pet
            */

        }

        void Repeat()
        {
            IEnumerable<string> strings = Enumerable.Repeat("I like programming.", 15);

            foreach (String str in strings)
            {
                Console.WriteLine(str);
            }
        }

        void Range()
        {
            IEnumerable<int> squares = Enumerable.Range(1, 10).Select(x => x * x);

            foreach (int num in squares)
            {
                Console.WriteLine(num);
            }

        }
    }
}
