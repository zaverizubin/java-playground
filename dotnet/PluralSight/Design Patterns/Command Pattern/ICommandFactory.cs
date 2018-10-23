using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    interface ICommandFactory
    {
        string CommandName { get;  }
        string Decription { get;}

        ICommand MakeCommand(string[] arguments);
    }
}
