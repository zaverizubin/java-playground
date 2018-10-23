using System;

namespace NullObjectPattern.Autos
{
    public class NullAutomobile : AutomobileBase
    {
        public override Guid Id
        {
            get { return Guid.Empty; }
        }

        public override string Name
        {
            get { return string.Empty; }
        }

        public override void Start()
        {
            Console.WriteLine("No automobile available to start!");
        }

        public override void Stop()
        {
            Console.WriteLine("No automobile available to stop!");
        }
    }
}
