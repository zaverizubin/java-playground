using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EFwithSProcsSample
{
    class Program
    {
        static void Main(string[] args)
        {
            using (SchoolEntities context = new SchoolEntities())
            {
                // Specify the Student ID.
                int studentId = 2;

                // Call GetStudentGrades and iterate through the returned collection.
                foreach (StudentGrade grade in context.GetStudentGrades(studentId))
                {
                    Console.WriteLine("StudentID: {0}\tSubject={1}", studentId, grade.Course.Title);
                    Console.WriteLine("Student grade: " + grade.Grade);
                }

                // Call GetDepartmentName. 
                // Declare the name variable that will contain the value returned by the output parameter.
                ObjectParameter name = new ObjectParameter("Name", typeof(String));
                context.GetDepartmentName(1, name);
                Console.WriteLine("The department name is {0}", name.Value);

            }
            Console.ReadLine();
        }
    }
}
