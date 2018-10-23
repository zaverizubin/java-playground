﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PresentationTier.CustomerServiceReference {
    using System.Runtime.Serialization;
    using System;
    
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Runtime.Serialization", "4.0.0.0")]
    [System.Runtime.Serialization.DataContractAttribute(Name="CompositeType", Namespace="http://schemas.datacontract.org/2004/07/DataService")]
    [System.SerializableAttribute()]
    public partial class CompositeType : object, System.Runtime.Serialization.IExtensibleDataObject, System.ComponentModel.INotifyPropertyChanged {
        
        [System.NonSerializedAttribute()]
        private System.Runtime.Serialization.ExtensionDataObject extensionDataField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private bool BoolValueField;
        
        [System.Runtime.Serialization.OptionalFieldAttribute()]
        private string StringValueField;
        
        [global::System.ComponentModel.BrowsableAttribute(false)]
        public System.Runtime.Serialization.ExtensionDataObject ExtensionData {
            get {
                return this.extensionDataField;
            }
            set {
                this.extensionDataField = value;
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public bool BoolValue {
            get {
                return this.BoolValueField;
            }
            set {
                if ((this.BoolValueField.Equals(value) != true)) {
                    this.BoolValueField = value;
                    this.RaisePropertyChanged("BoolValue");
                }
            }
        }
        
        [System.Runtime.Serialization.DataMemberAttribute()]
        public string StringValue {
            get {
                return this.StringValueField;
            }
            set {
                if ((object.ReferenceEquals(this.StringValueField, value) != true)) {
                    this.StringValueField = value;
                    this.RaisePropertyChanged("StringValue");
                }
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="CustomerServiceReference.ICustomerService")]
    public interface ICustomerService {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/GetData", ReplyAction="http://tempuri.org/ICustomerService/GetDataResponse")]
        string GetData(int value);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/GetData", ReplyAction="http://tempuri.org/ICustomerService/GetDataResponse")]
        System.Threading.Tasks.Task<string> GetDataAsync(int value);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/GetDataUsingDataContract", ReplyAction="http://tempuri.org/ICustomerService/GetDataUsingDataContractResponse")]
        PresentationTier.CustomerServiceReference.CompositeType GetDataUsingDataContract(PresentationTier.CustomerServiceReference.CompositeType composite);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/GetDataUsingDataContract", ReplyAction="http://tempuri.org/ICustomerService/GetDataUsingDataContractResponse")]
        System.Threading.Tasks.Task<PresentationTier.CustomerServiceReference.CompositeType> GetDataUsingDataContractAsync(PresentationTier.CustomerServiceReference.CompositeType composite);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/GetCustomers", ReplyAction="http://tempuri.org/ICustomerService/GetCustomersResponse")]
        DataEntityTier.NorthwindDataSet.CustomersDataTable GetCustomers();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/GetCustomers", ReplyAction="http://tempuri.org/ICustomerService/GetCustomersResponse")]
        System.Threading.Tasks.Task<DataEntityTier.NorthwindDataSet.CustomersDataTable> GetCustomersAsync();
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/GetCustomersByID", ReplyAction="http://tempuri.org/ICustomerService/GetCustomersByIDResponse")]
        DataEntityTier.NorthwindDataSet.CustomersDataTable GetCustomersByID(string id);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/GetCustomersByID", ReplyAction="http://tempuri.org/ICustomerService/GetCustomersByIDResponse")]
        System.Threading.Tasks.Task<DataEntityTier.NorthwindDataSet.CustomersDataTable> GetCustomersByIDAsync(string id);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/SaveCustomers", ReplyAction="http://tempuri.org/ICustomerService/SaveCustomersResponse")]
        void SaveCustomers(DataEntityTier.NorthwindDataSet.CustomersDataTable customers);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/SaveCustomers", ReplyAction="http://tempuri.org/ICustomerService/SaveCustomersResponse")]
        System.Threading.Tasks.Task SaveCustomersAsync(DataEntityTier.NorthwindDataSet.CustomersDataTable customers);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/InsertCustomer", ReplyAction="http://tempuri.org/ICustomerService/InsertCustomerResponse")]
        void InsertCustomer(string customerID, string companyName, string contactName, string contactTitle, string address, string city, string region, string postalCode, string country, string phone, string fax);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/InsertCustomer", ReplyAction="http://tempuri.org/ICustomerService/InsertCustomerResponse")]
        System.Threading.Tasks.Task InsertCustomerAsync(string customerID, string companyName, string contactName, string contactTitle, string address, string city, string region, string postalCode, string country, string phone, string fax);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/UpdateCustomer", ReplyAction="http://tempuri.org/ICustomerService/UpdateCustomerResponse")]
        void UpdateCustomer(
                    string companyName, 
                    string contactName, 
                    string contactTitle, 
                    string address, 
                    string city, 
                    string region, 
                    string postalCode, 
                    string country, 
                    string phone, 
                    string fax, 
                    string origCustomerID, 
                    string origCompanyName, 
                    string origContactName, 
                    string origContactTitle, 
                    string origAddress, 
                    string origCity, 
                    string origRegion, 
                    string origPostalCode, 
                    string origCountry, 
                    string origPhone, 
                    string origFax);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/ICustomerService/UpdateCustomer", ReplyAction="http://tempuri.org/ICustomerService/UpdateCustomerResponse")]
        System.Threading.Tasks.Task UpdateCustomerAsync(
                    string companyName, 
                    string contactName, 
                    string contactTitle, 
                    string address, 
                    string city, 
                    string region, 
                    string postalCode, 
                    string country, 
                    string phone, 
                    string fax, 
                    string origCustomerID, 
                    string origCompanyName, 
                    string origContactName, 
                    string origContactTitle, 
                    string origAddress, 
                    string origCity, 
                    string origRegion, 
                    string origPostalCode, 
                    string origCountry, 
                    string origPhone, 
                    string origFax);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface ICustomerServiceChannel : PresentationTier.CustomerServiceReference.ICustomerService, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class CustomerServiceClient : System.ServiceModel.ClientBase<PresentationTier.CustomerServiceReference.ICustomerService>, PresentationTier.CustomerServiceReference.ICustomerService {
        
        public CustomerServiceClient() {
        }
        
        public CustomerServiceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public CustomerServiceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public CustomerServiceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public CustomerServiceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public string GetData(int value) {
            return base.Channel.GetData(value);
        }
        
        public System.Threading.Tasks.Task<string> GetDataAsync(int value) {
            return base.Channel.GetDataAsync(value);
        }
        
        public PresentationTier.CustomerServiceReference.CompositeType GetDataUsingDataContract(PresentationTier.CustomerServiceReference.CompositeType composite) {
            return base.Channel.GetDataUsingDataContract(composite);
        }
        
        public System.Threading.Tasks.Task<PresentationTier.CustomerServiceReference.CompositeType> GetDataUsingDataContractAsync(PresentationTier.CustomerServiceReference.CompositeType composite) {
            return base.Channel.GetDataUsingDataContractAsync(composite);
        }
        
        public DataEntityTier.NorthwindDataSet.CustomersDataTable GetCustomers() {
            return base.Channel.GetCustomers();
        }
        
        public System.Threading.Tasks.Task<DataEntityTier.NorthwindDataSet.CustomersDataTable> GetCustomersAsync() {
            return base.Channel.GetCustomersAsync();
        }
        
        public DataEntityTier.NorthwindDataSet.CustomersDataTable GetCustomersByID(string id) {
            return base.Channel.GetCustomersByID(id);
        }
        
        public System.Threading.Tasks.Task<DataEntityTier.NorthwindDataSet.CustomersDataTable> GetCustomersByIDAsync(string id) {
            return base.Channel.GetCustomersByIDAsync(id);
        }
        
        public void SaveCustomers(DataEntityTier.NorthwindDataSet.CustomersDataTable customers) {
            base.Channel.SaveCustomers(customers);
        }
        
        public System.Threading.Tasks.Task SaveCustomersAsync(DataEntityTier.NorthwindDataSet.CustomersDataTable customers) {
            return base.Channel.SaveCustomersAsync(customers);
        }
        
        public void InsertCustomer(string customerID, string companyName, string contactName, string contactTitle, string address, string city, string region, string postalCode, string country, string phone, string fax) {
            base.Channel.InsertCustomer(customerID, companyName, contactName, contactTitle, address, city, region, postalCode, country, phone, fax);
        }
        
        public System.Threading.Tasks.Task InsertCustomerAsync(string customerID, string companyName, string contactName, string contactTitle, string address, string city, string region, string postalCode, string country, string phone, string fax) {
            return base.Channel.InsertCustomerAsync(customerID, companyName, contactName, contactTitle, address, city, region, postalCode, country, phone, fax);
        }
        
        public void UpdateCustomer(
                    string companyName, 
                    string contactName, 
                    string contactTitle, 
                    string address, 
                    string city, 
                    string region, 
                    string postalCode, 
                    string country, 
                    string phone, 
                    string fax, 
                    string origCustomerID, 
                    string origCompanyName, 
                    string origContactName, 
                    string origContactTitle, 
                    string origAddress, 
                    string origCity, 
                    string origRegion, 
                    string origPostalCode, 
                    string origCountry, 
                    string origPhone, 
                    string origFax) {
            base.Channel.UpdateCustomer(companyName, contactName, contactTitle, address, city, region, postalCode, country, phone, fax, origCustomerID, origCompanyName, origContactName, origContactTitle, origAddress, origCity, origRegion, origPostalCode, origCountry, origPhone, origFax);
        }
        
        public System.Threading.Tasks.Task UpdateCustomerAsync(
                    string companyName, 
                    string contactName, 
                    string contactTitle, 
                    string address, 
                    string city, 
                    string region, 
                    string postalCode, 
                    string country, 
                    string phone, 
                    string fax, 
                    string origCustomerID, 
                    string origCompanyName, 
                    string origContactName, 
                    string origContactTitle, 
                    string origAddress, 
                    string origCity, 
                    string origRegion, 
                    string origPostalCode, 
                    string origCountry, 
                    string origPhone, 
                    string origFax) {
            return base.Channel.UpdateCustomerAsync(companyName, contactName, contactTitle, address, city, region, postalCode, country, phone, fax, origCustomerID, origCompanyName, origContactName, origContactTitle, origAddress, origCity, origRegion, origPostalCode, origCountry, origPhone, origFax);
        }
    }
}