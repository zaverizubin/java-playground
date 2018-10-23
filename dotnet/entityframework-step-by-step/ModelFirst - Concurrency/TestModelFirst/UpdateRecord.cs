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
    public partial class UpdateRecord : Form
    {
        // Provide tracking variables for each field.
        String OldName = "";
        DateTime OldPurchaseDate = new DateTime();
        Decimal OldAmount = new Decimal();

        public UpdateRecord()
        {
            InitializeComponent();
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            // Create the context.
            Rewards2ModelContainer context = new Rewards2ModelContainer();
            // Obtain the purchase records.
            var PurchaseData =
            from PD in context.Purchases
            select PD;
            // Perform the required updates.
            if (OldName != txtName.Text)
            {
                if (PurchaseData.First().Customer.CustomerName != OldName)
                {
                    if (MessageBox.Show(
                    "Name field value has changed to " +
                    PurchaseData.First().Customer.CustomerName +
                    " Make the change anyway?", "Updating Newer Data",
                    MessageBoxButtons.YesNo) == DialogResult.Yes)
                        context.Purchases.First().Customer.CustomerName =
                        txtName.Text;
                }
                else
                    context.Purchases.First().Customer.CustomerName = txtName.Text;
            }
            if (OldPurchaseDate.ToShortDateString() != txtPurchaseDate.Text)
            {
                if (!PurchaseData.First().PurchaseDate.Equals(OldPurchaseDate))
                {
                    if (MessageBox.Show(
                    "Purchase Date field value has changed to " +
                    PurchaseData.First().PurchaseDate +
                    " Make the change anyway?", "Updating Newer Data",
                    MessageBoxButtons.YesNo) == DialogResult.Yes)
                        context.Purchases.First().PurchaseDate =
                        Convert.ToDateTime(txtPurchaseDate.Text);
                }
                else
                    context.Purchases.First().PurchaseDate =
                    Convert.ToDateTime(txtPurchaseDate.Text);
            }
            if (OldAmount.ToString() != txtAmount.Text)
            {
                if (!PurchaseData.First().Amount.Equals(OldAmount))
                {
                    if (MessageBox.Show(
                    "Amount field value has changed to " +
                    PurchaseData.First().Amount +
                    " Make the change anyway?", "Updating Newer Data",
                    MessageBoxButtons.YesNo) == DialogResult.Yes)
                        context.Purchases.First().Amount =
                        Convert.ToDecimal(txtAmount.Text);
                }
                else
                    context.Purchases.First().Amount =
                    Convert.ToDecimal(txtAmount.Text);
            }
            context.SaveChanges();
            // Display the data on screen.
            DisplayData();
        }

        private void UpdateRecord_Load(object sender, EventArgs e)
        {
            // Create the context.
            Rewards2ModelContainer context = new Rewards2ModelContainer();
            // Obtain the purchase records.
            var PurchaseData =
            from PD in context.Purchases
            select PD;
            // Add the data from the first record to the form.
            txtName.Text = PurchaseData.First().Customer.CustomerName;
            txtPurchaseDate.Text = PurchaseData.First().PurchaseDate.ToShortDateString();
            txtAmount.Text = PurchaseData.First().Amount.ToString();
            // Save the old values.
            OldName = PurchaseData.First().Customer.CustomerName;
            OldPurchaseDate =
            PurchaseData.First().PurchaseDate;
            OldAmount = PurchaseData.First().Amount;
        }

        private void DisplayData()
        {
            // Create the context.
            Rewards2ModelContainer context = new Rewards2ModelContainer();
            // Obtain the purchase records.
            var PurchaseData =
            from PD in context.Purchases
            select PD;
            // Save the new values.
            OldName = PurchaseData.First().Customer.CustomerName;
            OldPurchaseDate = PurchaseData.First().PurchaseDate;
            OldAmount = PurchaseData.First().Amount;
            // Display the content of the first record.
            StringBuilder Output = new StringBuilder();
            Output.Append(PurchaseData.First().Customer.CustomerName +
            "\r\n" + PurchaseData.First().PurchaseDate +
            "\r\n" + PurchaseData.First().Amount);
            MessageBox.Show(Output.ToString());
        }
    }
}
