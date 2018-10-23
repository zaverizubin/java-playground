
namespace StrategyPattern.Calculators
{
    class UpsShippingCost : IShippingCostStrategy
    {
        public double CalculateOrder(Order order)
        {
            return order.Quantity * 5.00d;
        }
    }

    
}
