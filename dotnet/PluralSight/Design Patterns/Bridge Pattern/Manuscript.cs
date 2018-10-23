namespace Bridge_Pattern
{
    public abstract class Manuscript
    {
        protected readonly IFormatter Formatter;

        protected Manuscript(IFormatter formatter)
        {
            Formatter = formatter;
        }

       

        public abstract void Print();
    }

    
}
