using System;
using System.Collections.Generic;
using System.Linq;


namespace LINQ
{
    class Element
    {
        void ElementAt()
        {
            string[] names = { "Hartono, Tommy", "Adams, Terry", "Andersen, Henriette Thaulow", "Hedlund, Magnus", "Ito, Shu" };
            var random = new Random(DateTime.Now.Millisecond);

            string name = names.ElementAt(random.Next(0, names.Length));

            Console.WriteLine("The name chosen at random is '{0}'.", name);
        }

        void ElementAtOrDefault()
        {
            string[] names = { "Hartono, Tommy", "Adams, Terry", "Andersen, Henriette Thaulow","Hedlund, Magnus", "Ito, Shu" };

            int index = 20;

            string name = names.ElementAtOrDefault(index);

            Console.WriteLine(
                "The name chosen at index {0} is '{1}'.",
                index,
                String.IsNullOrEmpty(name) ? "<no name at this index>" : name);

            /*
             This code produces the following output:

             The name chosen at index 20 is '<no name at this index>'.
            */
        }

        void First()
        {
            int[] numbers = { 9, 34, 65, 92, 87, 435, 3, 54, 83, 23, 87, 435, 67, 12, 19 };
            int first = numbers.First(number => number > 80);
            Console.WriteLine(first);
            /*
             This code produces the following output:
             92
            */
             first = numbers.First();
             Console.WriteLine(first);

            /*
             This code produces the following output:
 9
            */
        }
    
        void FirstOrDefault()
        {
            string[] names = { "Hartono, Tommy", "Adams, Terry", 
                     "Andersen, Henriette Thaulow", 
                     "Hedlund, Magnus", "Ito, Shu" };

            string firstLongName = names.FirstOrDefault(name => name.Length > 20);

            Console.WriteLine("The first long name is '{0}'.", firstLongName);

            string firstVeryLongName = names.FirstOrDefault(name => name.Length > 30);

            Console.WriteLine(
                "There is {0} name longer than 30 characters.",
                string.IsNullOrEmpty(firstVeryLongName) ? "not a" : "a");

            /*
             This code produces the following output:

             The first long name is 'Andersen, Henriette Thaulow'.
             There is not a name longer than 30 characters.
            */

            int[] numbers = { };
            int first = numbers.FirstOrDefault();
            Console.WriteLine(first);

            /*
             This code produces the following output:

             0
            */
        }
    }
}
