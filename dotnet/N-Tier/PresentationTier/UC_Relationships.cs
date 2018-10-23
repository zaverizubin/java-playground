using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using PresentationTier.OrderServiceReference;
using PresentationTier.CustomerServiceReference;

namespace PresentationTier
{
    public partial class UC_Relationships : UserControl
    {
        private CustomerServiceClient _dataSvcCustomers;
        private OrderServiceClient _dataSvcOrders;

        public UC_Relationships()
        {
            InitializeComponent();
            _dataSvcCustomers = new CustomerServiceClient();
            _dataSvcOrders = new OrderServiceClient();
        }
        

        private void BtnLoadCustomers_Click(object sender, EventArgs e)
        {
            northwindDataSet.Orders.Clear();
            northwindDataSet.Orders.Merge(_dataSvcCustomers.GetCustomers());
        }

        private void BtnLoadOrders_Click(object sender, EventArgs e)
        {
            northwindDataSet.Orders.Clear();
            northwindDataSet.Orders.Merge(_dataSvcOrders.GetOrders());
        }

       
    }
}
