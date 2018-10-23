using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Factory_Pattern.Factory2.Autos
{
    class BMW :IAuto
    {
        public BMW(String name)
        {
            Name = name;
        }

        public string Name
        {
            get;
            private set;
        }

        public void SetName(string name)
        {
            if (name == null) throw  new ArgumentNullException("name");
            Name = name;
        }

        public void TurnOn()
        {
            Console.WriteLine("The " + Name + "is up and running");
        }

        public void TurnOff()
        {
            Console.WriteLine("The " + Name + "is shutting down");
        }
    }
}
