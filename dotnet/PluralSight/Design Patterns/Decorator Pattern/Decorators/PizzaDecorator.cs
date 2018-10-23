using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Decorator_Pattern
{
    public class PizzaDecorator:Pizza
    {
        
        protected readonly Pizza _pizza;

        public PizzaDecorator(Pizza pizza)
        {
            _pizza = pizza;
        }

        public override string GetDescription()
        {
            return _pizza.GetDescription();
        }

        public override double CalculateCost()
        {
            return _pizza.CalculateCost();
        }
    }
}
