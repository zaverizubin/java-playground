namespace BuilderPatter
{
    abstract class  SandWhichBuilder
    {
        protected Sandwich Sandwhich;
        public void CreateNewSandwhich()
        {
            Sandwhich = new Sandwich();
        }

        public abstract void  PrepareBread();
        public abstract void  ApplyMeatAndCheese();
        public abstract void  ApplyVegetables();
        public abstract void AddCondiments();

        public Sandwich GetSandwhich()
        {
            return Sandwhich;
        }
    }
}
