using System;
using System.Collections.Generic;
using System.Linq;


namespace LINQ
{
    class Quantifier
    {
        class Pet
        {
            public string Name { get; set; }
            public int Age { get; set; }
            public bool Vaccinated { get; set; }
        }

        class Person
        {
            public string LastName { get; set; }
            public Pet[] Pets { get; set; }
        }

        public class Product
        {
            public string Name { get; set; }
            public int Code { get; set; }
        }

        private class ProductComparer : IEqualityComparer<Product>
        {
            public bool Equals(Product x, Product y)
            {
                if (ReferenceEquals(x,y)) return true;
                if (ReferenceEquals(x, null) || ReferenceEquals(y, null)) return false;
                return x.Name == y.Name && x.Code == y.Code;

            }

            public int GetHashCode(Product obj)
            {
                if (ReferenceEquals(obj, null)) return 0;
                int hashProductName = obj.Name == null ? 0 : obj.Name.GetHashCode();
                int hashProductCode = obj.Code.GetHashCode();
                return hashProductName ^ hashProductCode;
            }
        }

        void All()
        {
            Pet[] pets = { new Pet { Name="Barley", Age=10 },
                   new Pet { Name="Boots", Age=4 },
                   new Pet { Name="Whiskers", Age=6 } };

            bool allStartWithB = pets.All(pet => pet.Name.StartsWith("B"));

            Console.WriteLine("{0} pet names start with 'B'.",allStartWithB ? "All" : "Not all");

            var people = new List<Person>
                { new Person { LastName = "Haas",
                               Pets = new Pet[] { new Pet { Name="Barley", Age=10 },
                                                  new Pet { Name="Boots", Age=14 },
                                                  new Pet { Name="Whiskers", Age=6 }}},
                  new Person { LastName = "Fakhouri",
                               Pets = new Pet[] { new Pet { Name = "Snowball", Age = 1}}},
                  new Person { LastName = "Antebi",
                               Pets = new Pet[] { new Pet { Name = "Belle", Age = 8} }},
                  new Person { LastName = "Philips",
                               Pets = new Pet[] { new Pet { Name = "Sweetie", Age = 2},
                                                  new Pet { Name = "Rover", Age = 13}} }
                };
            IEnumerable<string> names = people.Where(person => person.Pets.All(pet => pet.Age > 5)).Select(person => person.LastName);
            foreach (string name in names)
            {
                Console.WriteLine(name);
            }

        }

        void Any()
        {
            var people = new List<Person>
                { new Person { LastName = "Haas",
                               Pets = new Pet[] { new Pet { Name="Barley", Age=10 },
                                                  new Pet { Name="Boots", Age=14 },
                                                  new Pet { Name="Whiskers", Age=6 }}},
                  new Person { LastName = "Fakhouri",
                               Pets = new Pet[] { new Pet { Name = "Snowball", Age = 1}}},
                  new Person { LastName = "Antebi",
                               Pets = new Pet[] { }},
                  new Person { LastName = "Philips",
                               Pets = new Pet[] { new Pet { Name = "Sweetie", Age = 2},
                                                  new Pet { Name = "Rover", Age = 13}} }
                };

            // Determine which people have a non-empty Pet array.
            IEnumerable<string> names = people.Where(person => person.Pets.Any()).Select(person => person.LastName);

            foreach (string name in names)
            {
                Console.WriteLine(name);
            }

            Pet[] pets = { new Pet { Name="Barley", Age=8, Vaccinated=true },
                  new Pet { Name="Boots", Age=4, Vaccinated=false },
                  new Pet { Name="Whiskers", Age=1, Vaccinated=false } };

                    // Determine whether any pets over age 1 are also unvaccinated.
                    bool unvaccinated =
                        pets.Any(p => p.Age > 1 && p.Vaccinated == false);

                    Console.WriteLine(
                        "There {0} unvaccinated animals over age one.",
                        unvaccinated ? "are" : "are not any");

                }

        void Contains()
        {
            Product[] fruits = { new Product { Name = "apple", Code = 9 }, 
                       new Product { Name = "orange", Code = 4 }, 
                       new Product { Name = "lemon", Code = 12 } };

            Product apple = new Product { Name = "apple", Code = 9 };
            Product kiwi = new Product { Name = "kiwi", Code = 8 };

            bool hasApple = fruits.Contains(apple, new ProductComparer());
            bool hasKiwi = fruits.Contains(kiwi, new ProductComparer());

            Console.WriteLine("Apple? " + hasApple);
            Console.WriteLine("Kiwi? " + hasKiwi);

        }
    }
}
