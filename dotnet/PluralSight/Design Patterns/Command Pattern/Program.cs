using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ConsoleApplication1.Commands;

namespace ConsoleApplication1
{
    class Program
    {

        static void Main(string[] args)
        {
            var availableCommands = GetAvailableCommands();
            PrintUsage(availableCommands);

            var commandString = Console.ReadLine();
            args = commandString.Split(new [] { ' ' });
           

            var parser = new CommandParser(availableCommands);
            var command = parser.ParseCommand(args);
            if(null != command)
            {
                command.Execute();
                Console.ReadLine();
            }
           
        }

        static IEnumerable<ICommandFactory>  GetAvailableCommands()
        {
            return new ICommandFactory[]
                {
                    new CreateOrderCommand(),
                    new UpdateQuantityCommand(),
                    new ShipOrderCommand()
                };
        }

        private static void PrintUsage(IEnumerable<ICommandFactory> availableCommands)
        {
            Console.WriteLine("Usage: Logging CommandName arguments");
            Console.WriteLine("Commands:");
            foreach (var command in availableCommands)
            {
                Console.WriteLine(" {0}", command.CommandName);
            }
        }

    }
}
