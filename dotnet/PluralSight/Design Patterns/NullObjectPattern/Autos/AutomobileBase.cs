using System;

namespace NullObjectPattern.Autos
{
    public class MiniCooper : AutomobileBase
    {

        public override Guid Id
        {
            get { return Guid.NewGuid(); }
        }

        public override string Name
        {
            get { return "MiniCooper"; }
        }

        public override void Start()
        {
           Console.WriteLine("MiniCooper Started");
        }

        public override void Stop()
        {
            Console.WriteLine("MiniCooper Stoped");
        }
     
    }
}
