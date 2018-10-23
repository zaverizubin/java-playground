using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1.Commands
{
    class UpdateQuantityCommand : ICommand, ICommandFactory
    {
        public int NewQuantity { get; set; }

        public void Execute()
        {
            const int oldQuantity = 5;
            Console.WriteLine("Database :updated");
            Console.WriteLine("Log: Updated order quantity from {0} to {1}", oldQuantity, NewQuantity);
        }

        public string CommandName { get { return "UpdateQuantity"; }}

        public string Decription { get { return "Update Quantity number"; } }

        public ICommand MakeCommand(string[] arguments)
        {
            return new UpdateQuantityCommand { NewQuantity = int.Parse(arguments[1]) };
        }

       
    }
}
