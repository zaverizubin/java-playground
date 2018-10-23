using NullObjectPattern.Autos;

namespace NullObjectPattern
{
    class AutoRepository
    {
        public AutomobileBase Find(string carName)
        {
            if (carName.ToLowerInvariant().Contains("mini"))
            {
                return new MiniCooper();
            }
            return AutomobileBase.Null;
        }
    }
}
