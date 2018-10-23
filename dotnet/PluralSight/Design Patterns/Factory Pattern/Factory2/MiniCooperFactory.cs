using Factory_Pattern.Factory2.Autos;

namespace Factory_Pattern.Factory2
{
    class MiniCooperFactory :IAutoFactory
    {
        public IAuto CreateAutomobile()
        {
            var mini = new MiniCooper();
            mini.SetName("MIni Cooper S");
            return mini;
        }
    }
}
