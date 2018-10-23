using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EnumEFDesigner
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var context = new EnumTestModelContainer())
            {
                context.Departments.Add(new Department { Name = DepartmentNames.English });

                context.SaveChanges();

                var department = (from d in context.Departments
                                  where d.Name == DepartmentNames.English
                                  select d).FirstOrDefault();

                Console.WriteLine(
                    "DepartmentID: {0} and Name: {1}",
                    department.DepartmentID,
                    department.Name);
            }

            Console.ReadLine();
        }
    }
}
