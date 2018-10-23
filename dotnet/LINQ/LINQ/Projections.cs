using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LINQ
{
    class Projections
    {
        class Bouquet
        {
            public List<string> Flowers { get; set; }
        }

        void Select()
        {
            var words = new List<string>() { "an", "apple", "a", "day" };

            var query = from word in words
                        select word.Substring(0, 1);

            foreach (string s in query)
                Console.WriteLine(s);

            var phrases = new List<string>() { "an apple a day", "the quick brown fox" };

            query = from phrase in phrases
                        from word in phrase.Split(' ')
                        select word;
            foreach (string s in query)
                Console.WriteLine(s);  

        }

        void SelectMany()
        {
            var bouquets = new List<Bouquet>() {  
                new Bouquet { Flowers = new List<string> { "sunflower", "daisy", "daffodil", "larkspur" }},  
                new Bouquet{ Flowers = new List<string> { "tulip", "rose", "orchid" }},  
                new Bouquet{ Flowers = new List<string> { "gladiolis", "lily", "snapdragon", "aster", "protea" }},  
                new Bouquet{ Flowers = new List<string> { "larkspur", "lilac", "iris", "dahlia" }}  
            };

                        
            IEnumerable<List<string>> query1 = bouquets.Select(bq => bq.Flowers);
            IEnumerable<string> query2 = bouquets.SelectMany(bq => bq.Flowers);

            Console.WriteLine("Results by using Select():");
            // Note the extra foreach loop here.  
            foreach (var collection in query1)
                foreach (string item in collection)
                    Console.WriteLine(item);

            Console.WriteLine("\nResults by using SelectMany():");
            foreach (string item in query2)
                Console.WriteLine(item);  


        }
    }
}
