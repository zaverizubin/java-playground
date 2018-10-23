using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuilderPatter
{
    class ClubSandWhichBuilder : SandWhichBuilder
    {
        
        public override void PrepareBread()
        {
            Sandwhich.BreadType = BreadType.Garlic;
        }

        public override void ApplyMeatAndCheese()
        {
            Sandwhich.CheeseType = CheeseType.Mozerella;
            Sandwhich.MeatType = MeatType.Turkey;
        }

        public override void ApplyVegetables()
        {
            Sandwhich.Vegetables = new List<string> {"Tomato", "Onion"};
        }

        public override void AddCondiments()
        {
            Sandwhich.HasMayo = false;
            Sandwhich.HasMustard = true;
        }
    }
}
