using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1.Commands
{
    class ShipOrderCommand : ICommand, ICommandFactory
    {
        public int Quantity { get; set; }

        public void Execute()
        {
            Console.WriteLine("Database :Order");
            Console.WriteLine("Log: Order with quantity {0} shipped", Quantity);
        }


        public string CommandName { get { return "ShipOrder"; } }

        public string Decription { get { return "Ship Order"; } }

        public ICommand MakeCommand(string[] arguments)
        {
            return new ShipOrderCommand { Quantity = int.Parse(arguments[1]) };
        }
    }
}
