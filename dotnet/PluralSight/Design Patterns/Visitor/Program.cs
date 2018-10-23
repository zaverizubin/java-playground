using System;

namespace Visitor
{
    class Program
    {
        static void Main(string[] args)
        {
            var person = new Person();
            person.Assets.Add(new BankAccount {Amount = 1000, MonthlyInterest = 0.01});
            person.Assets.Add(new BankAccount { Amount = 2000, MonthlyInterest = 0.02 });
            person.Assets.Add(new RealEstate { EstimatedValue = 1000, MonthlyRent = 0.01 });
            person.Assets.Add(new Loan { Owed = 1000, MonthlyPayment = 0.01 });

            var netWorthVisitor = new NetWorthVisitor();
            var incomeVisitor = new IncomeVisitor();

            person.Accept(netWorthVisitor);
            person.Accept(incomeVisitor);

            Console.WriteLine(netWorthVisitor.Total);
            Console.WriteLine(incomeVisitor.Amount);
            Console.ReadKey();
        }
    }

    
}
