namespace Visitor
{
    class Loan:IAsset
    {
        public int Owed { get; set; }
        public double MonthlyPayment { get; set; }

        public void Accept(IVisitor visitor)
        {
            visitor.Visit(this);
        }
    }
}
