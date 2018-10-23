using System;

namespace State_Pattern
{
    class Low:State
    {
         public override void Pull(CeilingFanPullChain ceilingFanPullChain)
         {
             ceilingFanPullChain.SetState(new Medium());
             Console.WriteLine("State:Low");
         }
    }
}
