using System;

namespace NullObjectPattern.Autos
{
    public abstract class AutomobileBase
    {
        public abstract Guid Id { get; }
        public abstract string Name { get; }
        public abstract void Start();
        public abstract void Stop();

        static readonly NullAutomobile NullAutomobile = new NullAutomobile();

        public static NullAutomobile Null
        {
            get { return NullAutomobile; }
        }

        
    }
}
