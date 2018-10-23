using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Decorator_Pattern
{
    public class Ham:PizzaDecorator
    {
        public Ham(Pizza pizza)
            : base(pizza)
        {
            Description = "Ham";
        }

        public override string GetDescription()
        {
            return String.Format("{0},  {1}", _pizza.GetDescription(), Description);
        }

        public override double CalculateCost()
        {
            return _pizza.CalculateCost() + 2.00;
        }
    }
}
