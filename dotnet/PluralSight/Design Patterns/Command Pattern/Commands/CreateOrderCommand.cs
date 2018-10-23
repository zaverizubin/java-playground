using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1.Commands
{
    class CreateOrderCommand : ICommand, ICommandFactory
    {
        public int Quantity { get; set; }

        public void Execute()
        {
            Console.WriteLine("Database :created");
            Console.WriteLine("Log: Created order with quantity {0}", Quantity);
        }

        public string CommandName { get { return "CreateOrder"; } }

        public string Decription { get { return "Create Order"; } }

        public ICommand MakeCommand(string[] arguments)
        {
            return new CreateOrderCommand { Quantity = int.Parse(arguments[1]) };
        }
    }
}
