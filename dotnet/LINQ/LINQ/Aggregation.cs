using System;
using System.Collections.Generic;
using System.Linq;

namespace LINQ
{
    class Aggregation
    {
        class Pet
        {
            public string Name { get; set; }
            public int Age { get; set; }
            public bool Vaccinated { get; set; }
        }

        class Package
        {
            public string Company { get; set; }
            public double Weight { get; set; }
        }

        public void Aggregate()
        {
            string[] fruits = { "apple", "mango", "orange", "passionfruit", "grape" };

            // Determine whether any string in the array is longer than "banana".
            string longestName = fruits.Aggregate("banana",
                                (longest, next) =>
                                    next.Length > longest.Length ? next : longest,
                // Return the final result as an upper case string.
                                fruit => fruit.ToUpper());

            Console.WriteLine("The fruit with the longest name is {0}.",longestName);

            int[] ints = { 4, 8, 8, 3, 9, 0, 7, 8, 2 };

            // Count the even numbers in the array, using a seed value of 0.
            int numEven = ints.Aggregate(0, (total, next) => next % 2 == 0 ? total + 1 : total);

            Console.WriteLine("The number of even integers is: {0}", numEven);

        }

        public void Average()
        {
            string[] fruits = { "apple", "banana", "mango", "orange", "passionfruit", "grape" };

            double average = fruits.Average(s => s.Length);

            Console.WriteLine("The average string length is {0}.", average);
        }

        public void Count()
        {
            Pet[] pets = { new Pet { Name="Barley", Vaccinated=true },
                   new Pet { Name="Boots", Vaccinated=false },
                   new Pet { Name="Whiskers", Vaccinated=false } };

            int numberUnvaccinated = pets.Count(p => p.Vaccinated == false);
            Console.WriteLine("There are {0} unvaccinated animals.", numberUnvaccinated);
        }

        public void Max()
        {
            Pet[] pets = { new Pet { Name="Barley", Age=8 },
                   new Pet { Name="Boots", Age=4 },
                   new Pet { Name="Whiskers", Age=1 } };

            int max = pets.Max(pet => pet.Age + pet.Name.Length);

            Console.WriteLine(
                "The maximum pet age plus name length is {0}.",
                max);
        }

        public void Min()
        {
            Pet[] pets = { new Pet { Name="Barley", Age=8 },
                   new Pet { Name="Boots", Age=4 },
                   new Pet { Name="Whiskers", Age=1 } };

            int min = pets.Min(pet => pet.Age);

            Console.WriteLine("The youngest animal is age {0}.", min);
        }

        public void Sum()
        {
            var packages = new List<Package> 
            { new Package { Company = "Coho Vineyard", Weight = 25.2 },
              new Package { Company = "Lucerne Publishing", Weight = 18.7 },
              new Package { Company = "Wingtip Toys", Weight = 6.0 },
              new Package { Company = "Adventure Works", Weight = 33.8 } };

            double totalWeight = packages.Sum(pkg => pkg.Weight);

            Console.WriteLine("The total weight of the packages is: {0}", totalWeight);
        }

    }
}
