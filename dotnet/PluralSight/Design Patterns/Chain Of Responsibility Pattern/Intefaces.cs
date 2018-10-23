using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChainOfResponsibility
{
    interface IExpenseReport
    {
        Decimal Total { get; }
    }

    interface IExpenseApprover
    {
        ApprovalResponse ApproveExpense(IExpenseReport expenseReport);
    }

    interface IExpenseHandler
    {
        ApprovalResponse Approve(IExpenseReport expenseReport);
        void RegisterNext(IExpenseHandler next);

    }
    

    public enum ApprovalResponse
    {
        Denied,
        Approved,
        BeyondApprovalLimit
    }

}
