namespace StrategyPattern.Calculators
{
    public interface IShippingCostStrategy
    {
        double CalculateOrder(Order order);

    }

    
}