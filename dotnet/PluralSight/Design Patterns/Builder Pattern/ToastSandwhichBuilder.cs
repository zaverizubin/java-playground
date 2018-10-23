using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuilderPatter
{
    class ToastSandwhichBuilder : SandWhichBuilder
    {
        

        public override void PrepareBread()
        {
            Sandwhich.BreadType = BreadType.Wheat;
        }

        public override void ApplyMeatAndCheese()
        {
            Sandwhich.CheeseType = CheeseType.Swiss;
            Sandwhich.MeatType = MeatType.Chicken;
        }

        public override void ApplyVegetables()
        {
            Sandwhich.Vegetables = new List<string> { "Tomato", "Onion" };
        }

        public override void AddCondiments()
        {
            Sandwhich.HasMayo = true;
            Sandwhich.HasMustard = false;
        }
    }
}
