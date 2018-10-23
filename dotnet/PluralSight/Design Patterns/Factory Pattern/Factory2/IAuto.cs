using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Factory_Pattern.Factory2
{
    interface IAuto
    {
        string Name { get; }
        void SetName(string name);
        void TurnOn();
        void TurnOff();
    }
}
