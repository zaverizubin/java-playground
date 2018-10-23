using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TemplateMethodPattern
{
    class Program
    {
        static void Main(string[] args)
        {
            OrderShipment orderShipment = new FedExShipping { ShippingAddress = "www.google.com" };
            orderShipment.Ship();

            orderShipment = new UpsShipping { ShippingAddress = "www.google.com" };
            orderShipment.Ship();

            Console.ReadKey();
        }
    }
}
