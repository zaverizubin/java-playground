
namespace StrategyPattern.Calculators
{
    class UspsShippingCost : IShippingCostStrategy
    {
        public double CalculateOrder(Order order)
        {
            return order.Quantity * 3.5d;
        }
    }
}
