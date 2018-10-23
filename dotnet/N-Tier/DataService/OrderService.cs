using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataEntityTier;
using DataAccessTier.NorthwindDataSetTableAdapters;

namespace DataService
{
    class OrderService: IOrderService
    {
        public NorthwindDataSet.OrdersDataTable GetOrders()
        {
            var OrdersTableAdapter = new OrdersTableAdapter();
            return OrdersTableAdapter.GetData();
        }

        
    }
}
