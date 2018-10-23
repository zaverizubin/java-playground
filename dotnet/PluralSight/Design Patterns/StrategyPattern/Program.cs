
using System;
using System.Text.RegularExpressions;
using StrategyPattern.Calculators;

namespace StrategyPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            IShippingCostStrategy fedExShipping = new FedExShippingCost();
            IShippingCostStrategy upsShipping = new UpsShippingCost();
            IShippingCostStrategy uspsShipping = new UspsShippingCost();

            var order = new Order(10);

            var calculatorService = new ShippingCostCalculatorService(fedExShipping);
            Console.WriteLine("FedEx Shippping Cost:{0}", calculatorService.CalculateShippingCost(order));

            calculatorService = new ShippingCostCalculatorService(upsShipping);
            Console.WriteLine("UPS Shippping Cost:{0}", calculatorService.CalculateShippingCost(order));

            calculatorService = new ShippingCostCalculatorService(uspsShipping);
            Console.WriteLine("USPS Shippping Cost:{0}", calculatorService.CalculateShippingCost(order));

            Console.ReadKey();
        }
    }
}
