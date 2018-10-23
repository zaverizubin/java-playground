using System;

namespace State_Pattern
{
    class High : State
    {
        public override void Pull(CeilingFanPullChain ceilingFanPullChain)
        {
            ceilingFanPullChain.SetState(new Off());
            Console.WriteLine("State:High");
        }
    }
}
