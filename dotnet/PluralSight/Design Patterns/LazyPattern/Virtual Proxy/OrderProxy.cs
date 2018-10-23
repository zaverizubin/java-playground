using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LazyPattern.Virtual_Proxy
{
    class OrderProxy : Order
    {

        public override Customer Customer { 
            get{
                if(base.Customer == null)
                {
                    base.Customer = new Customer();
                }
                return base.Customer;
            } 
            set { base.Customer = value; } 

        }

        public override bool Equals(object obj)
        {
            var other = obj as Order;
            if (other == null) return false;
            return other.Id == Id;
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

    }
}
