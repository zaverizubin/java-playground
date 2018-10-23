using System;

namespace TemplateMethodPattern
{
    public abstract class OrderShipment
    {
        public string ShippingAddress { get; set; }
        public string Label { get; set; }
        public void Ship()
        {
            VerifyShippingData();
            GetShippingLabelFromCarrier();
            PrintLabel();

        }

        private void VerifyShippingData()
        {
            Console.WriteLine("Verify Shipping Data");
        }

        protected abstract void GetShippingLabelFromCarrier();

        protected virtual void PrintLabel()
        {
            Console.WriteLine("Print Label");
        }

        

       
    }
}
