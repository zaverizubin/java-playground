using System;

namespace State_Pattern
{
    class Off : State
    {
        public override void Pull(CeilingFanPullChain ceilingFanPullChain)
        {
            ceilingFanPullChain.SetState(new Low());
            Console.WriteLine("State:Off");
        }
    }
}
