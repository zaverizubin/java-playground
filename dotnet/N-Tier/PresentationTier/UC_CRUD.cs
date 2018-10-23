using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using DataEntityTier;
using PresentationTier.CustomerServiceReference;
using DataAccessTier.NorthwindDataSetTableAdapters;

namespace PresentationTier
{
    public partial class UC_CRUD : UserControl
    {
        private CustomerServiceClient _dataSvc;

        public UC_CRUD()
        {
            InitializeComponent();
            BtnLoadCustomers_Click(null, null);
        }

        private void BtnLoadCustomers_Click(object sender, EventArgs e)
        {
            northwindDataSet.Customers.Clear(); 
            var CustomersTableAdapter = new CustomersTableAdapter();
            northwindDataSet.Customers.Merge(CustomersTableAdapter.GetData());
        }
        
        private void BtnCreate_Click(object sender, EventArgs e)
        {
            NorthwindDataSet.CustomersRow newCustomersRow;
            newCustomersRow = northwindDataSet.Customers.NewCustomersRow();
            newCustomersRow.CustomerID = "CUS_1";
            newCustomersRow.CompanyName = "Google";
            newCustomersRow.ContactName = "Andersen";
            newCustomersRow.ContactTitle = "Mr.";
            newCustomersRow.Address = "Blah Blah";
            newCustomersRow.City = "Cupertino";
            newCustomersRow.Region = "California";
            newCustomersRow.PostalCode = "400026";
            newCustomersRow.Country = "USA";
            newCustomersRow.Phone = "022-23154245";
            newCustomersRow.Fax = "022-23154246";
            try
            {
                northwindDataSet.Customers.Rows.Add(newCustomersRow);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void BtnCreateInline_Click(object sender, EventArgs e)
        {
            try
            {
                var CustomersTableAdapter = new CustomersTableAdapter();
                CustomersTableAdapter.Insert("CUS_2", "Google_2", "Andersen_2", "Mr.", "Blah Blah", "Cupertino", "California", "400026", "USA", "022-23154245", "022-23154241");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }
        
        private void BtnFindAndEdit_Click(object sender, EventArgs e)
        {
            try
            {
                NorthwindDataSet.CustomersRow customersRow = northwindDataSet.Customers.FindByCustomerID("ALFKI");
                if (customersRow == null) return;
                customersRow.CompanyName = "Updated Company Name";
                customersRow.City = "Seattle"; ;
                northwindDataSet.Customers[4].CompanyName = "Updated Company Name1";
                northwindDataSet.Customers[4].City = "Seattle1";
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
           
        }

        private void BtnParameterLoading_Click(object sender, EventArgs e)
        {
            var CustomersTableAdapter = new CustomersTableAdapter();
            var customersDataTable = CustomersTableAdapter.GetDataBy("ALFKI");

            northwindDataSet.Customers.Clear();
            northwindDataSet.Customers.Merge(customersDataTable);
        }

        private void BtnSaveCustomers_Click(object sender, EventArgs e)
        {
            if (northwindDataSet.HasChanges())
            {
                var CustomersTableAdapter = new CustomersTableAdapter();
                CustomersTableAdapter.Update(northwindDataSet.Customers);
                BtnLoadCustomers_Click(null, null);
            }
        }

        private void BtnUpdateCustomer_Click(object sender, EventArgs e)
        {
            if (northwindDataSet.Customers.Rows.Count == 0) return;

            char append = '_';
            var datarow = northwindDataSet.Customers[0];
            
            var CustomersTableAdapter = new CustomersTableAdapter();
            CustomersTableAdapter.Update(datarow.CompanyName + append, datarow.ContactName + append, datarow.ContactTitle + append, datarow.Address + append, datarow.City + append,
                                    datarow.Region + append, datarow.PostalCode + append, datarow.Country + append, datarow.Phone + append, datarow.Fax + append,
                                    datarow.CustomerID, datarow.CompanyName, datarow.ContactName, datarow.ContactTitle, datarow.Address, datarow.City,
                                    datarow.Region, datarow.PostalCode, datarow.Country, datarow.Phone, datarow.Fax);
            BtnLoadCustomers_Click(null, null);
        }

        private void BtnClearCustomers_Click(object sender, EventArgs e)
        {
            northwindDataSet.Customers.Clear();
        }

        private void BtnDelete_Click(object sender, EventArgs e)
        {
            if (customersDataGridView.SelectedRows.Count == 0)
            {
                MessageBox.Show("You must select one or more rows");
            }
            foreach (DataGridViewRow datarow in customersDataGridView.SelectedRows)
            {
                northwindDataSet.Customers.Rows[datarow.Index].Delete(); 
            }
        }

        private void BtnHighlight_Click(object sender, EventArgs e)
        {
            if (northwindDataSet.HasChanges())
            {
                foreach (DataTable table in northwindDataSet.Tables)
                {
                    for (var i =0; i< table.Rows.Count;i++)
                    {
                        var row = table.Rows[i];
                        if (row.RowState == DataRowState.Added || row.RowState == DataRowState.Deleted || row.RowState == DataRowState.Modified)
                        {
                            customersDataGridView.Rows[i].DefaultCellStyle.BackColor = Color.Beige;

                        }
                    }
                }
            }
        }

        private void BtnShowAdded_Click(object sender, EventArgs e)
        {
            if (northwindDataSet.HasChanges())
            {
                var customersDataTable = northwindDataSet.Customers.GetChanges(DataRowState.Added);
                if(customersDataTable != null)
                {
                    northwindDataSet.Customers.Clear();
                    northwindDataSet.Customers.Merge(customersDataTable);
                }
               
            }
        }

        private void BtnShowModified_Click(object sender, EventArgs e)
        {
         
            if (northwindDataSet.HasChanges())
            {
                var customersDataTable = northwindDataSet.Customers.GetChanges(DataRowState.Modified);
                if (customersDataTable != null)
                {
                    northwindDataSet.Customers.Clear();
                    northwindDataSet.Customers.Merge(customersDataTable);
                }
            }
        }

        
    }
}
