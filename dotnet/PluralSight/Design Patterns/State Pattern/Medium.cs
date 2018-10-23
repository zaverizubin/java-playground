using System;

namespace State_Pattern
{
    class Medium : State
    {
        public override void Pull(CeilingFanPullChain ceilingFanPullChain)
        {
            ceilingFanPullChain.SetState(new High());
            Console.WriteLine("State:Medium");
        }
    }
}
