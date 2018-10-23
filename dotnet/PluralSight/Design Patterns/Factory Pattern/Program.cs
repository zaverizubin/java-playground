using System.Reflection;
using Factory_Pattern.Factory1;
using Factory_Pattern.Factory2;

namespace Factory_Pattern
{
    class Program
    {
        static void Main(string[] args)
        {
            /*Example 1
            string carname = args[0];
            var factory = new AutoFactory();
            Factory1.IAuto car = factory.CreateInstance(carname);
            car.TurnOn();
            car.TurnOff();
            */

            /*Example 2*/
            IAutoFactory autoFactory = LoadFactory();
            Factory2.IAuto car = autoFactory.CreateAutomobile();
            car.TurnOn();
            car.TurnOff();
            
        }

        static IAutoFactory LoadFactory()
        {
            string factoryName = Properties.Settings.Default.AutoFactory;
            return Assembly.GetExecutingAssembly().CreateInstance(factoryName) as IAutoFactory;
        }
    }
}
