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
    }
}
