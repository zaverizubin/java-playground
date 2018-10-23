using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuilderPatter
{
    class SandwhichMaker
    {
        private readonly SandWhichBuilder _builder;

        public SandwhichMaker(SandWhichBuilder builder)
        {
            _builder = builder;
        }

        public void BuildSandwhich()
        {
            _builder.CreateNewSandwhich();
            _builder.PrepareBread();
            _builder.ApplyMeatAndCheese();
            _builder.ApplyVegetables();
            _builder.AddCondiments();
        }

        public Sandwich GetSandwhich()
        {
            return _builder.GetSandwhich();
        }
    }
}
