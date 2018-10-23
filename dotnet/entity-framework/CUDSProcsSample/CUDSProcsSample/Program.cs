using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CUDSProcsSample
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var context = new SchoolEntities())
            {
                var newInstructor = new Person
                {
                    FirstName = "Robyn",
                    LastName = "Martin",
                    HireDate = DateTime.Now,
                    Discriminator = "Instructor"
                };

        // Add the new object to the context.
                context.People.Add(newInstructor);

                Console.WriteLine("Added {0} {1} to the context.",
                    newInstructor.FirstName, newInstructor.LastName);

                Console.WriteLine("Before SaveChanges, the PersonID is: {0}",
                    newInstructor.PersonID);

                // SaveChanges will call the InsertPerson sproc.  
                // The PersonID property will be assigned the value 
                // returned by the sproc. 
                context.SaveChanges();

                Console.WriteLine("After SaveChanges, the PersonID is: {0}",
                    newInstructor.PersonID);

                // Modify the object and call SaveChanges.
                // This time, the UpdatePerson will be called.
                newInstructor.FirstName = "Rachel";
                context.SaveChanges();

                // Remove the object from the context and call SaveChanges.
                // The DeletePerson sproc will be called.
                context.People.Remove(newInstructor);
                context.SaveChanges();

                Person deletedInstructor = context.People.
                    Where(p => p.PersonID == newInstructor.PersonID).
                    FirstOrDefault();

                if (deletedInstructor == null)
                    Console.WriteLine("A person with PersonID {0} was deleted.",
                        newInstructor.PersonID);

                Console.ReadLine();
            }
        }
    }
}
