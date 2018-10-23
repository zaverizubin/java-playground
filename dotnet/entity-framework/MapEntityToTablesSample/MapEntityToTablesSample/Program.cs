using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MapEntityToTablesSample
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var context = new EntitySplittingEntities())
            {
                var person = new Person
                {
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john@example.com",
                    Phone = "555-555-5555"
                };

                context.People.Add(person);
                context.SaveChanges();

                foreach (var item in context.People)
                {
                    Console.WriteLine(item.FirstName);
                }
            }

            Console.ReadLine();
        }
    }
}
