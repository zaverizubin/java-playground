using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ServiceModel;
using System.Text;
using DataEntityTier;

namespace DataService
{
    [ServiceContract]
    public interface IOrderService
    {
        [OperationContract]
        NorthwindDataSet.OrdersDataTable GetOrders();

    }
}
