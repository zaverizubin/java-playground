﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1.Commands
{
    class NotFoundCommand:ICommand
    {
        public string Name { get; set; }

        public void Execute()
        {
            Console.WriteLine("Couldn't find command: " + Name);
        }
    }
}
