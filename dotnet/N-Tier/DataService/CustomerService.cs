using System;
using DataAccessTier.NorthwindDataSetTableAdapters;
using DataEntityTier;
using System.Data;

namespace DataService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service1" in both code and config file together.
    public class CustomerService : ICustomerService
    {
        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }

        public CompositeType GetDataUsingDataContract(CompositeType composite)
        {
            if (composite == null)
            {
                throw new ArgumentNullException("composite");
            }
            if (composite.BoolValue)
            {
                composite.StringValue += "Suffix";
            }
            return composite;
        }

        public NorthwindDataSet.CustomersDataTable GetCustomers()
        {
            var CustomersTableAdapter = new CustomersTableAdapter();
            return CustomersTableAdapter.GetData();
        }

        public NorthwindDataSet.CustomersDataTable GetCustomersByID(string id)
        {
            var CustomersTableAdapter = new CustomersTableAdapter();
            return CustomersTableAdapter.GetDataBy(id);
        }
        
        public void SaveCustomers(NorthwindDataSet.CustomersDataTable customers)
        {
            var CustomersTableAdapter = new CustomersTableAdapter();
            CustomersTableAdapter.Update(customers);
        }

        public void InsertCustomer(string customerID, string companyName, string contactName, string contactTitle, string address, string city, string region, string postalCode, string country, string phone, string fax)
        {
            var CustomersTableAdapter = new CustomersTableAdapter();
            CustomersTableAdapter.Insert(customerID, companyName, contactName, contactTitle, address, city, region, postalCode, country, phone, fax);
        }

        public void UpdateCustomer(string companyName, string contactName, string contactTitle, string address,
                                   string city, string region, string postalCode, string country, string phone, string fax,
                                   string origCustomerID, string origCompanyName, string origContactName, string origContactTitle,
                                   string origAddress, string origCity, string origRegion, string origPostalCode,
                                   string origCountry, string origPhone, string origFax)
        {
            var CustomersTableAdapter = new CustomersTableAdapter();
            CustomersTableAdapter.Update( companyName,  contactName,  contactTitle,  address,  city,  region,  postalCode,  country,  phone,  fax,
                                    origCustomerID,  origCompanyName,  origContactName,  origContactTitle,  origAddress,  origCity,  origRegion,  origPostalCode,  origCountry,  origPhone, origFax);
                
        }
    }
}
