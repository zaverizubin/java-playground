namespace Visitor
{
    interface IAsset
    {
        void Accept(IVisitor visitor);
    }
}
