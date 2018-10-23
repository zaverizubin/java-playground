
namespace StrategyPattern.Calculators
{
    class FedExShippingCost : IShippingCostStrategy
    {
        public double CalculateOrder(Order order)
        {
            return order.Quantity * 1.5d;
        }
    }
}
