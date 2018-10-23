﻿namespace Visitor
{
    class IncomeVisitor :IVisitor
    {
        public double Amount;

        public void Visit(RealEstate realEstate)
        {
            Amount += realEstate.MonthlyRent;
        }

        public void Visit(BankAccount bankAccount)
        {
            Amount += bankAccount.Amount * bankAccount.MonthlyInterest;
        }

        public void Visit(Loan loan)
        {
            Amount -= loan.MonthlyPayment;
        }
    }
}
