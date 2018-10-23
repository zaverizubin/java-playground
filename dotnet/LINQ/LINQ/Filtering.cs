using System;
using System.Collections.Generic;
using System.Linq;

namespace LINQ
{
    class Filtering
    {
        void Where()
        {
            string[] words = { "the", "quick", "brown", "fox", "jumps" };

            IEnumerable<string> query = from word in words
                                        where word.Length == 3
                                        select word;

            foreach (string str in query)
                Console.WriteLine(str);


            query = words.Where((word, index) => word.Length == 3 && index <= word.Length);

            foreach (string str in query)
                Console.WriteLine(str);
        }


        void OfType()
        {
            var fruits = new System.Collections.ArrayList(4);
            fruits.Add("Mango");
            fruits.Add("Orange");
            fruits.Add("Apple");
            fruits.Add(3.0);
            fruits.Add("Banana");

            IEnumerable<string> query = fruits.OfType<string>().Where(x => x.Contains("n"));
            foreach (string str in query)
                Console.WriteLine(str);
        }

    }
}
