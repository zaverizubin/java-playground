using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StrategyPattern.Calculators;

namespace StrategyPattern
{
    class ShippingCostCalculatorService
    {
        private readonly IShippingCostStrategy _shippingCostStrategy;

        public ShippingCostCalculatorService(IShippingCostStrategy shippingCostStrategy)
        {
            _shippingCostStrategy = shippingCostStrategy;
        }

        public double CalculateShippingCost(Order order)
        {
            return _shippingCostStrategy.CalculateOrder(order);
        }
    }
}
