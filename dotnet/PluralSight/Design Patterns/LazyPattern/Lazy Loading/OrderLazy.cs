using System;

namespace LazyPattern
{
    class OrderLazy
    {
        private readonly Lazy<Customer> _customerInitializer;
            
        public Customer Customer
        {
            get { return _customerInitializer.Value; }
        }

        public OrderLazy()
        {
            _customerInitializer = new Lazy<Customer>(() => new Customer());
        }

        public string PrintLabel()
        {
            string result = Customer.CompanyName;
            return result;
        }
    }
}
