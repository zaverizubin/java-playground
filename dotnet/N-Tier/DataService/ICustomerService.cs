﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using DataEntityTier;

namespace DataService
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface ICustomerService
    {
        [OperationContract]
        string GetData(int value);

        [OperationContract]
        CompositeType GetDataUsingDataContract(CompositeType composite);

        // TODO: Add your service operations here

        [OperationContract]
        NorthwindDataSet.CustomersDataTable GetCustomers();

        [OperationContract]
        NorthwindDataSet.CustomersDataTable GetCustomersByID(string id);
        
        [OperationContract]
        void SaveCustomers(NorthwindDataSet.CustomersDataTable customers);

        [OperationContract]
        void InsertCustomer(string customerID, string companyName, string contactName, string contactTitle, string address, string city, string region, string postalCode, string country, string phone, string fax);

        [OperationContract]
        void UpdateCustomer(string companyName, string contactName, string contactTitle, string address, string city,
                            string region, string postalCode, string country, string phone, string fax,
                            string origCustomerID, string origCompanyName, string origContactName, string origContactTitle,
                            string origAddress, string origCity, string origRegion, string origPostalCode, string origCountry,
                            string origPhone, string origFax);


    }

    

    // Use a data contract as illustrated in the sample below to add composite types to service operations.
    // You can add XSD files into the project. After building the project, you can directly use the data types defined there, with the namespace "DataService.ContractType".
    [DataContract]
    public class CompositeType
    {
        bool boolValue = true;
        string stringValue = "Hello ";

        [DataMember]
        public bool BoolValue
        {
            get { return boolValue; }
            set { boolValue = value; }
        }

        [DataMember]
        public string StringValue
        {
            get { return stringValue; }
            set { stringValue = value; }
        }
    }
}
