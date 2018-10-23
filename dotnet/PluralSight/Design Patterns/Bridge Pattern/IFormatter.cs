using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bridge_Pattern
{
    public interface IFormatter
    {
        string Format(string key, string value);
    }
}
