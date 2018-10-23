using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LazyPattern.Virtual_Proxy
{
    class OrderFactory
    {
        public Order CreateFromId(int id)
        {
            return new OrderProxy
                {
                    Id = id
                };

        }
    }
}
