using Factory_Pattern.Factory2.Autos;

namespace Factory_Pattern.Factory2
{
    class BMWFactory : IAutoFactory
    {
        public IAuto CreateAutomobile()
        {
            var mini = new BMW("BMW");
            return mini;
        }
    }
}
