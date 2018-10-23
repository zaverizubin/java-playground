using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TableSplittingSample
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var context = new SchoolEntities())
            {
                Person person = new Person()
                {
                    FirstName = "Kimberly",
                    LastName = "Morgan",
                    Discriminator = "Instructor",
                };

                person.HireInfo = new HireInfo()
                {
                    HireDate = DateTime.Now
                };

                // Add the new person to the context.
                context.People.Add(person);

                // Insert a row into the Person table.  
                context.SaveChanges();

                // Execute a query against the Person table.
                // The query returns columns that map to the Person entity.
                var existingPerson = context.People.FirstOrDefault();

                // Execute a query against the Person table.
                // The query returns columns that map to the Instructor entity.
                var hireInfo = existingPerson.HireInfo;

                Console.WriteLine("{0} was hired on {1}",
                    existingPerson.LastName, hireInfo.HireDate);

                Console.ReadLine();
            }
        }
    }
}
