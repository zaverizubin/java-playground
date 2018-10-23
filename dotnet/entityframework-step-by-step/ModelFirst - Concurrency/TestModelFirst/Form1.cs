using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
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

        private void btnConcurrency_Click(object sender, EventArgs e)
        {
            // Create the User 1 dialog box and display it.
            UpdateRecord User1 = new UpdateRecord();
            User1.Text = "User 1 Update";
            User1.Show(this);
            // Create the User 2 dialog box and display it.
            UpdateRecord User2 = new UpdateRecord();
            User2.Text = "User 2 Update";
            User2.Show(this);
        }

        private void btnRowVersion_Click(object sender, EventArgs e)
        {
            Rewards2ModelContainer context1 = new Rewards2ModelContainer();
            Rewards2ModelContainer context2 = new Rewards2ModelContainer();
            // Get the record for User 1.
            var User1 = context1.Purchases.First();
            // Get the record for User 2.
            var User2 = context2.Purchases.First();
            // Make a change and save it for User 1.
            User1.Amount = Convert.ToDecimal(7.99);
            context1.SaveChanges();
            try
            {
                // Make a change and save it for User 2.
                User2.Amount = Convert.ToDecimal(10.99);
                context2.SaveChanges();
            }
            catch (DbUpdateConcurrencyException DUCE)
            {
                // Display a message box.
                MessageBox.Show("Initial Attempt Failed!");
                // Obtain the object context.
                var ObjContext = ((IObjectContextAdapter)context2).ObjectContext;
                // Obtain the entry that has failed.
                var Entry = DUCE.Entries.Single();
                // Refresh the object context so that you can perform an update.
                ObjContext.Refresh(RefreshMode.ClientWins, Entry.Entity);
                // Save the changes.
                context2.SaveChanges();
            }
            // Display a success message.
            MessageBox.Show("Update Succeeded!");
        }
    }
}
