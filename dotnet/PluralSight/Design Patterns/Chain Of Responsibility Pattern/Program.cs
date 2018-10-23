using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChainOfResponsibility
{
    class Program
    {
        static void Main(string[] args)
        {
            var william = new ExpenseHandler(new Employee("William", Decimal.Zero));
            var mary = new ExpenseHandler(new Employee("Mary", new decimal(1000)));
            var victor = new ExpenseHandler(new Employee("Victor", new decimal(5000)));
            var paula = new ExpenseHandler(new Employee("Paula", new decimal(20000)));

            william.RegisterNext(mary);
            mary.RegisterNext(victor);
            victor.RegisterNext(paula);

            Decimal expenseReportAmount;
            string line = Console.ReadLine();
         
            if (Decimal.TryParse(line, out expenseReportAmount))
            {
                ApprovalResponse response = william.Approve(new ExpenseReport(expenseReportAmount));
                Console.WriteLine("The Request was {0}", response);
            }
            Console.ReadLine();

        }
    }
}
