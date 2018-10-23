using System;

namespace TemplateMethodPattern
{
    class UpsShipping:OrderShipment
    {
        protected override void GetShippingLabelFromCarrier()
        {
            Console.WriteLine("UPS:[{0}]", ShippingAddress);
        }
    }
}
