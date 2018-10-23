using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TestModelFirst
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            // Create a new purchase.
            Purchases NewPurchase = new Purchases();
            NewPurchase.Amount = new Decimal(5.99);
            NewPurchase.PurchaseDate = DateTime.Now;
            // Create a new customer and add the purchase.
            Customers NewCustomer = new Customers();
            NewCustomer.CustomerName = "Josh Bailey";
            // Create the context.
            Rewards2ModelContainer context = new Rewards2ModelContainer();
            // Add the record and save it.
            context.Customers.Add(NewCustomer);
            context.Purchases.Add(NewPurchase);
            context.SaveChanges();
            // Display a success message.
            MessageBox.Show("Record Added");
        }

        private void btnAddPurchase_Click(object sender, EventArgs e)
        {
            // Create the form and display it.
            frmData AddData = new frmData();
            DialogResult Result = AddData.ShowDialog(this);
            // Check the dialog result.
            if (Result == DialogResult.Cancel)
                return;
            // Create the context.
            Rewards2ModelContainer context = new Rewards2ModelContainer();
            // Obtain the customer record.
            var ThisCustomer =
            (from cust in context.Customers
             select cust).First();
            // Create a new purchase.
            Purchases NewPurchase = new Purchases();
            NewPurchase.Amount =
            Convert.ToDecimal(AddData.txtAmount.Text);
            NewPurchase.CustomersId = ThisCustomer.Id;
            NewPurchase.PurchaseDate = AddData.dtpPurchaseDate.Value;
            // Add the purchase to the customer record.
            ThisCustomer.Purchases.Add(NewPurchase);
            context.SaveChanges();
            // Display a success message.
            MessageBox.Show("Record Added");
        }

        private void btnUpdatePurchase_Click(object sender, EventArgs e)
        {
            Rewards2ModelContainer context = new Rewards2ModelContainer();

            var ThisCustomer = (from cust in context.Customers
                                select cust).First();

            frmSelection RecSelect = new frmSelection();
            foreach (Purchases ThisPurchase in ThisCustomer.Purchases)
                RecSelect.lstPurchases.Items.Add(ThisPurchase.PurchaseDate);

            DialogResult Result = RecSelect.ShowDialog(this);
            if (Result == DialogResult.Cancel)
                return;

            // Obtain the desired purchase record.
            var UpdatePurchase =
            from purchase in ThisCustomer.Purchases
            where purchase.PurchaseDate == (DateTime)RecSelect.lstPurchases.SelectedItem
            select purchase;
            

            frmData ChangeData = new frmData();
            ChangeData.txtAmount.Text = UpdatePurchase.First().Amount.ToString();
            ChangeData.txtID.Text = UpdatePurchase.First().Id.ToString();
            ChangeData.dtpPurchaseDate.Value = UpdatePurchase.First().PurchaseDate;
            
            Result = ChangeData.ShowDialog(this);
            if (Result == DialogResult.Cancel)
                return;
            
            UpdatePurchase.First().Amount = Convert.ToDecimal(ChangeData.txtAmount.Text);
            UpdatePurchase.First().PurchaseDate = ChangeData.dtpPurchaseDate.Value;
            context.SaveChanges();

            // Display a success message.
            MessageBox.Show("Record Updated");
        }

        private void btnDeletePurchase_Click(object sender, EventArgs e)
        {
            // Create the context.
            Rewards2ModelContainer context = new Rewards2ModelContainer();
            // Obtain the customer record.
            var ThisCustomer =
            (from cust in context.Customers
             select cust).First();
            // Fill the selection form with data.
            frmSelection RecSelect = new frmSelection();
            foreach (Purchases ThisPurchase in ThisCustomer.Purchases)
                RecSelect.lstPurchases.Items.Add(ThisPurchase.PurchaseDate);
            // Obtain a record selection.
            DialogResult Result = RecSelect.ShowDialog(this);
            if (Result == DialogResult.Cancel)
                return;
            // Create a purchases object the matches the record to remove.
            Purchases RemoveThis =
            ThisCustomer.Purchases.ElementAt(RecSelect.lstPurchases.SelectedIndex);
            // Use the record selection to remove the record from the list.
            context.Purchases.Remove(RemoveThis);
            context.SaveChanges();
            // Display a success message.
            MessageBox.Show("Record Deleted");
        }
    }
}
