using System;
using System.Collections.Generic;
using System.Linq;

namespace LINQ
{
    class Partitioning
    {
        void Skip()
        {
            int[] grades = { 59, 82, 70, 56, 92, 98, 85 };
            IEnumerable<int> lowerGrades = grades.OrderByDescending(g => g).Skip(3);

            foreach (var grade in lowerGrades)
            {
                Console.WriteLine(grade);
                
            }
        }

        void SkipWhile()
        {
            int[] grades = { 59, 82, 70, 56, 92, 98, 85 };

            IEnumerable<int> lowerGrades =
                grades
                .OrderByDescending(grade => grade)
                .SkipWhile(grade => grade >= 80);

            Console.WriteLine("All grades below 80:");
            foreach (int grade in lowerGrades)
            {
                Console.WriteLine(grade);
            }

            int[] amounts = { 5000, 2500, 9000, 8000, 6500, 4000, 1500, 5500 };

            IEnumerable<int> query =
                amounts.SkipWhile((amount, index) => amount > index * 1000);

            foreach (int amount in query)
            {
                Console.WriteLine(amount);
            }

        }

        void Take()
        {
            int[] grades = { 59, 82, 70, 56, 92, 98, 85 };

            IEnumerable<int> topThreeGrades =
                grades.OrderByDescending(grade => grade).Take(3);

            Console.WriteLine("The top three grades are:");
            foreach (int grade in topThreeGrades)
            {
                Console.WriteLine(grade);
            }
        }

        void TakeWhile()
        {
            string[] fruits = { "apple", "banana", "mango", "orange", 
                      "passionfruit", "grape" };

            IEnumerable<string> query =
                fruits.TakeWhile(fruit => String.Compare("orange", fruit, System.StringComparison.OrdinalIgnoreCase) != 0);

            foreach (string fruit in query)
            {
                Console.WriteLine(fruit);
            }
        }

    }
}
