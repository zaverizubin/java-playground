using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChainOfResponsibility
{
    class EndOfChainExpenseHandler : IExpenseHandler
    {
        private static readonly EndOfChainExpenseHandler _instance = new EndOfChainExpenseHandler();

        private EndOfChainExpenseHandler()
        {
            
        }
        
        public static EndOfChainExpenseHandler Instance
        {
            get { return _instance; }
        }
        
        public ApprovalResponse Approve(IExpenseReport expenseReport)
        {
            return ApprovalResponse.Denied;
        }

        public void RegisterNext(IExpenseHandler next)
        {
            throw new InvalidOperationException("End of chain handler must be the end of the chain!");
        }
    }
}
