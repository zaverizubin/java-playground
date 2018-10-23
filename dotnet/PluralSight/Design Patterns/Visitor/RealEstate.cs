namespace Visitor
{
    class RealEstate : IAsset
    {
        public int EstimatedValue { get; set; }
        public double MonthlyRent { get; set; }
 
        public void Accept(IVisitor visitor)
        {
            visitor.Visit(this);
        }
    }
}
