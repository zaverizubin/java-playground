using System.Collections.Generic;
using System.Linq;
using ConsoleApplication1.Commands;

namespace ConsoleApplication1
{
    class CommandParser
    {
        private readonly IEnumerable<ICommandFactory> _availableCommands;

        public CommandParser(IEnumerable<ICommandFactory> availableCommands)
        {
            _availableCommands = availableCommands;
        }

        internal ICommand ParseCommand(string[] args)
        {
            var requestedCommandName = args[0];
            var command = FindRequestedCommand(requestedCommandName);
            if (null == command)
            {
                return new NotFoundCommand {Name= requestedCommandName};
            }
            return command.MakeCommand(args);
        }

        ICommandFactory FindRequestedCommand(string commandName)
        {
            return _availableCommands.FirstOrDefault(cmd => cmd.CommandName.ToLowerInvariant() == commandName.ToLowerInvariant());
        }
    }
}
