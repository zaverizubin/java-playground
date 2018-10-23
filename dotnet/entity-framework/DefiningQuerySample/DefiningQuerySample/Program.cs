using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DefiningQuerySample
{
    class Program
    {
        static void Main(string[] args)
        {
            using (var context = new SchoolEntities())
            {
                var report = context.GradeReports.FirstOrDefault();
                Console.WriteLine("{0} {1} got {2}",
                    report.FirstName, report.LastName, report.Grade);
            }
            Console.ReadLine();

        }
    }
}
