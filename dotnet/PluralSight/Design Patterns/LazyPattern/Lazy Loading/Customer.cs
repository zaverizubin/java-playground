using System;

namespace LazyPattern
{
    class Customer
    {
        public Customer()
        {
            Console.WriteLine("Initializing Customer");
        }

        public string CompanyName
        {
            get { return "Company Name"; }
        }

        public string Address
        {
            get { return "Company Address"; }
        }
    }
}
