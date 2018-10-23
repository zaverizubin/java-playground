using System;

namespace TemplateMethodPattern
{
    class FedExShipping : OrderShipment
    {
        protected override void GetShippingLabelFromCarrier()
        {
            Console.WriteLine("FedEx:[{0}]", ShippingAddress);
        }
    }
}
